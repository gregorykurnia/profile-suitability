"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BackIcon, SaveIcon } from "@/components/shell/icons";
import { showToast } from "@/components/shell/Toasts";
import { rememberPreview } from "@/lib/boardMemory";
import { PDF_FAILED, useSavePdf } from "./useSavePdf";

// The preview's own bar: back to the report, the file's name, Save PDF.
export default function PreviewBar({
  reference,
  backHref,
  fileName,
}: {
  reference: string;
  backHref: string;
  fileName: string;
}) {
  const { state, save } = useSavePdf(fileName);

  useEffect(() => rememberPreview(reference), [reference]);
  useEffect(() => {
    if (state === "failed") showToast(PDF_FAILED);
  }, [state]);

  return (
    <div className="on-dark sticky top-0 z-10 flex min-h-[60px] items-center gap-3 bg-ink py-2 pr-(--gutter) pl-[calc(var(--gutter)-6px)] text-white min-[760px]:gap-5">
      <Link
        href={backHref}
        className="inline-flex min-h-(--tap) flex-none items-center gap-1 text-sm font-[650] hover:underline hover:underline-offset-4"
      >
        <BackIcon className="size-[18px] flex-none" />
        Back to the report
      </Link>
      <p className="hidden min-w-0 truncate text-(length:--t-sm) text-[#DCE3EC] min-[760px]:block">
        <bdi>{fileName}</bdi>.pdf
      </p>
      <button
        type="button"
        onClick={save}
        aria-disabled={state === "saving" || undefined}
        aria-busy={state === "saving" || undefined}
        className="btn ml-auto flex-none border-white bg-white text-ink hover:bg-shade"
      >
        {state === "saving" ? <span aria-hidden="true" className="spin" /> : <SaveIcon />}
        {state === "saving" ? "Saving PDF…" : state === "failed" ? "Try again" : "Save PDF"}
      </button>
    </div>
  );
}
