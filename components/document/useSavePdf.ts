"use client";

import { useRef, useState } from "react";
import { announce, showToast } from "@/components/shell/Toasts";
import { writePdf } from "./writePdf";

export const PDF_FAILED = "The PDF didn't save. Check there's space on this device, then try again.";
const READY_WAIT_MS = 15_000;

// Save PDF: idle, saving (can't be started twice), failed. Used by the report's actions and the preview.
export function useSavePdf(fileName: string) {
  const [state, setState] = useState<"idle" | "saving" | "failed">("idle");
  const busy = useRef(false);

  async function save() {
    if (busy.current) return;
    busy.current = true;
    setState("saving");
    announce("Saving PDF. This takes a few seconds.");
    try {
      await writePdf(await documentPages(), `${fileName}.pdf`);
      setState("idle");
      showToast(`Saved “${fileName}.pdf”`);
    } catch (error) {
      console.error("PDF failed", error);
      setState("failed");
      announce(PDF_FAILED);
    } finally {
      busy.current = false;
    }
  }

  return { state, save };
}

// The laid-out A4 pages, once ReportDocument has measured them.
function documentPages(): Promise<HTMLElement> {
  const started = performance.now();
  return new Promise((resolve, reject) => {
    (function look() {
      const root = document.querySelector<HTMLElement>('[data-a4="ready"]');
      if (root) resolve(root);
      else if (performance.now() - started > READY_WAIT_MS) reject(new Error("The pages weren't ready"));
      else window.setTimeout(look, 100);
    })();
  });
}
