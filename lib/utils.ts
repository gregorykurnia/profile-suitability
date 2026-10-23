// "st", "nd", "rd" or "th" for 1st, 22nd, 13th…
export function ordinalSuffix(n: number): string {
  const t = n % 100;
  if (t >= 11 && t <= 13) return "th";
  return { 1: "st", 2: "nd", 3: "rd" }[n % 10] ?? "th";
}

// +8, −6 (a real minus sign), 0.
export function signed(n: number): string {
  if (n > 0) return `+${n}`;
  if (n < 0) return `−${Math.abs(n)}`;
  return "0";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ISO date to "14 Oct 2026" (design.md, Copy and tone).
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

// The first name, or the first two words for longer names, for the previous / next buttons.
export function shortName(name: string): string {
  const parts = name.split(" ");
  return parts.length > 2 ? parts.slice(0, 2).join(" ") : parts[0];
}

// "Rizky Aditya Pratama - Shift Manager - 15 Oct 2026": candidate, role, report date (design.md §5), without ".pdf".
export function reportFileName(report: { candidateName: string; positionApplied: string; reportGeneratedDate: string }): string {
  return `${report.candidateName} - ${report.positionApplied} - ${formatDate(report.reportGeneratedDate)}`;
}
