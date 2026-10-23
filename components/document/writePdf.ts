import type { jsPDF as JsPdf } from "jspdf";

// Save PDF (S1, S5, decisions Q2): copies the A4 pages the browser has laid out (ReportDocument) into a PDF,
// on the device, so it works offline. Text goes in as real text, line by line where the browser broke it, in
// the same static fonts the pages use (a4.css); boxes, rules, bars and the mark go in as shapes and an image.
// It handles what the document uses and nothing more: solid colours, solid borders, rounded corners, images.

const FACES = [
  [400, 100],
  [600, 100],
  [700, 100],
  [750, 112],
  [800, 80],
  [850, 68],
] as const;
const FAMILY = "Archivo Doc";
const MM_PER_PX = 25.4 / 96;
// The faces' ascender over ascender + descender (878 and 210 per 1000): where the baseline sits in a text box.
const BASELINE = 878 / 1088;
const STRETCH_WORDS: Record<string, number> = {
  "ultra-condensed": 50,
  "extra-condensed": 62.5,
  condensed: 75,
  "semi-condensed": 87.5,
  normal: 100,
  "semi-expanded": 112.5,
  expanded: 125,
  "extra-expanded": 150,
  "ultra-expanded": 200,
};

type Rgb = [number, number, number];
type Box = { x: number; y: number; w: number; h: number };
type Pen = { pdf: JsPdf; page: DOMRect; mmPerPx: number; images: Map<string, string>; floor: number };

// Waits for every face the document uses, so the pages are measured in the fonts the PDF will use. A face that
// fails to load (offline, not cached) still lets the pages lay out in the fallback font; saving then fails visibly.
export async function loadDocumentFonts(): Promise<void> {
  const faces: FontFace[] = [];
  document.fonts.forEach((face) => {
    if (face.family.replace(/["']/g, "") === FAMILY) faces.push(face);
  });
  await Promise.allSettled(faces.map((face) => face.load()));
}

export async function writePdf(root: HTMLElement, fileName: string): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
  pdf.setProperties({ title: fileName.replace(/\.pdf$/, ""), subject: "Hiring assessment report" });
  pdf.setLanguage("en-GB");

  const [fonts, images] = await Promise.all([
    Promise.all(FACES.map(([w, s]) => fetchBase64(`/fonts/archivo-doc-${w}-${s}.ttf`))),
    loadImages(root),
  ]);
  FACES.forEach(([w, s], i) => {
    const file = `archivo-doc-${w}-${s}.ttf`;
    pdf.addFileToVFS(file, fonts[i]);
    pdf.addFont(file, faceName(w, s), "normal");
  });

  root.querySelectorAll<HTMLElement>(".doc-pg").forEach((page, i) => {
    if (i > 0) pdf.addPage("a4", "portrait");
    const rect = page.getBoundingClientRect();
    // Client pixels to millimetres: also undoes the preview's scaling on narrow screens.
    drawElement(page, { pdf, page: rect, mmPerPx: 210 / rect.width, images, floor: Infinity });
  });

  pdf.save(fileName);
}

function drawElement(el: Element, pen: Pen) {
  const style = getComputedStyle(el);
  if (style.display === "none") return;
  const box = toMm(el.getBoundingClientRect(), pen);
  if (box.y >= pen.floor) return;

  paintBox(style, box, pen);
  if (el instanceof HTMLImageElement) {
    const data = pen.images.get(el.currentSrc || el.src);
    if (data) pen.pdf.addImage(data, data.startsWith("data:image/png") ? "PNG" : "JPEG", box.x, box.y, box.w, box.h);
    return;
  }

  // The page body hides what overflows it; so does the PDF.
  const floor = pen.floor;
  if (el.classList.contains("doc-body")) pen.floor = box.y + box.h;
  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) drawText(node as Text, style, pen);
    else if (node.nodeType === Node.ELEMENT_NODE) drawElement(node as Element, pen);
  });
  pen.floor = floor;
}

function paintBox(style: CSSStyleDeclaration, box: Box, pen: Pen) {
  if (box.w <= 0 || box.h <= 0) return;
  const background = rgb(style.backgroundColor);
  const radius = length(style.borderTopLeftRadius, box.w);
  const sides = (["Top", "Right", "Bottom", "Left"] as const).map((side) => ({
    width: parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) * MM_PER_PX || 0,
    colour: rgb(style.getPropertyValue(`border-${side.toLowerCase()}-color`)),
  }));
  const [top, right, bottom, left] = sides;

  // A ring: one rounded shape in the border colour, the background inside it.
  const ring = sides.every((s) => s.width === top.width && s.colour?.join() === top.colour?.join());
  if (ring && top.width > 0 && top.colour && radius > 0) {
    fill(pen, box, radius, top.colour);
    const w = top.width;
    if (background) fill(pen, { x: box.x + w, y: box.y + w, w: box.w - 2 * w, h: box.h - 2 * w }, radius - w, background);
    return;
  }

  if (background) fill(pen, box, radius, background);
  if (top.width && top.colour) fill(pen, { x: box.x, y: box.y, w: box.w, h: top.width }, 0, top.colour);
  if (right.width && right.colour) fill(pen, { x: box.x + box.w - right.width, y: box.y, w: right.width, h: box.h }, 0, right.colour);
  if (bottom.width && bottom.colour) fill(pen, { x: box.x, y: box.y + box.h - bottom.width, w: box.w, h: bottom.width }, 0, bottom.colour);
  if (left.width && left.colour) fill(pen, { x: box.x, y: box.y, w: left.width, h: box.h }, 0, left.colour);
}

function fill(pen: Pen, box: Box, radius: number, colour: Rgb) {
  if (box.w <= 0 || box.h <= 0) return;
  pen.pdf.setFillColor(...colour);
  const r = Math.min(Math.max(radius, 0), box.w / 2, box.h / 2);
  if (r > 0.01) pen.pdf.roundedRect(box.x, box.y, box.w, box.h, r, r, "F");
  else pen.pdf.rect(box.x, box.y, box.w, box.h, "F");
}

// One text node, cut into the lines the browser made: each character's box says which line it sits on.
function drawText(node: Text, style: CSSStyleDeclaration, pen: Pen) {
  const text = node.data;
  if (!text.trim()) return;
  const colour = rgb(style.color) ?? [0, 0, 0];
  const spacing = style.letterSpacing === "normal" ? 0 : parseFloat(style.letterSpacing) * MM_PER_PX || 0;
  pen.pdf.setFont(faceFor(style), "normal");
  pen.pdf.setFontSize(parseFloat(style.fontSize) * 0.75); // px to pt
  pen.pdf.setTextColor(...colour);

  const range = document.createRange();
  let line: { start: number; end: number; x: number; y: number; h: number } | null = null;
  const flush = () => {
    if (!line) return;
    const baseline = line.y + line.h * BASELINE;
    if (baseline < pen.floor) {
      const words = text.slice(line.start, line.end).replace(/\s+/g, " ");
      pen.pdf.text(words, line.x, baseline, spacing ? { charSpace: spacing } : undefined);
    }
    line = null;
  };

  for (let i = 0; i < text.length; ) {
    const size = (text.codePointAt(i) ?? 0) > 0xffff ? 2 : 1;
    if (/\s/.test(text[i])) {
      i += size;
      continue;
    }
    range.setStart(node, i);
    range.setEnd(node, i + size);
    const rect = range.getClientRects()[0];
    if (rect) {
      const b = toMm(rect, pen);
      if (line && Math.abs(b.y - line.y) < b.h / 2) line.end = i + size;
      else {
        flush();
        line = { start: i, end: i + size, x: b.x, y: b.y, h: b.h };
      }
    }
    i += size;
  }
  flush();
}

function faceName(weight: number, stretch: number) {
  return `doc-${weight}-${stretch}`;
}

// The face the browser picked: the nearest width, then the nearest weight (a4.css only asks for exact ones).
function faceFor(style: CSSStyleDeclaration): string {
  const weight = parseFloat(style.fontWeight) || 400;
  const stretch = STRETCH_WORDS[style.fontStretch] ?? (parseFloat(style.fontStretch) || 100);
  const nearest = (values: number[], target: number) =>
    values.reduce((best, v) => (Math.abs(v - target) < Math.abs(best - target) ? v : best));
  const width = nearest([...new Set(FACES.map(([, s]) => s))], stretch);
  const heavy = nearest(FACES.filter(([, s]) => s === width).map(([w]) => w), weight);
  return faceName(heavy, width);
}

function toMm(rect: DOMRect, pen: Pen): Box {
  return {
    x: (rect.left - pen.page.left) * pen.mmPerPx,
    y: (rect.top - pen.page.top) * pen.mmPerPx,
    w: rect.width * pen.mmPerPx,
    h: rect.height * pen.mmPerPx,
  };
}

// A computed length in millimetres; percentages are of the box's width.
function length(value: string, width: number): number {
  const n = parseFloat(value) || 0;
  return value.endsWith("%") ? (n / 100) * width : n * MM_PER_PX;
}

// rgb() / rgba() to a solid colour; translucent colours are mixed with the white page.
function rgb(value: string): Rgb | null {
  const parts = value.match(/[\d.]+/g)?.map(Number);
  if (!parts || parts.length < 3) return null;
  const alpha = parts[3] ?? 1;
  if (alpha === 0) return null;
  return [parts[0], parts[1], parts[2]].map((c) => Math.round(c * alpha + 255 * (1 - alpha))) as Rgb;
}

async function fetchBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

async function loadImages(root: HTMLElement): Promise<Map<string, string>> {
  const images = new Map<string, string>();
  await Promise.all(
    Array.from(root.querySelectorAll("img")).map(async (img) => {
      const src = img.currentSrc || img.src;
      if (images.has(src)) return;
      const blob = await (await fetch(src)).blob();
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
      });
      images.set(src, data);
    }),
  );
  return images;
}
