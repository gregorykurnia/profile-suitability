"use client";

import Link from "next/link";
import { PDF_FAILED, useSavePdf } from "@/components/document/useSavePdf";
import { LinkIcon, SaveIcon } from "@/components/shell/icons";
import { showToast } from "@/components/shell/Toasts";

// Save PDF (idle, saving, failed), Copy link and the PDF preview (S1, S3, S4). The PDF is made on the device from
// the report's A4 pages, so all of it works offline.
export default function ReportActions({
  candidateName,
  reference,
  fileName,
  previewHref,
}: {
  candidateName: string;
  reference: string;
  fileName: string;
  previewHref: string;
}) {
  const { state, save } = useSavePdf(fileName);

  // The bare report address, so it opens directly for a colleague with no saved filters.
  async function copyLink() {
    const url = `${location.origin}/report/${encodeURIComponent(reference)}`;
    const done = () => showToast(`Link copied. It opens ${candidateName}'s report directly.`);
    try {
      await navigator.clipboard.writeText(url);
      done();
    } catch {
      const field = document.createElement("textarea");
      field.value = url;
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      if (copied) done();
      else showToast("Couldn't copy the link. Copy it from the address bar instead.");
    }
  }

  return (
    <div className="flex flex-col gap-1.5 min-[760px]:max-w-[420px] min-[1180px]:max-w-none">
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={save}
          aria-disabled={state === "saving" || undefined}
          aria-busy={state === "saving" || undefined}
          className="btn btn-primary flex-1"
        >
          {state === "saving" ? <span aria-hidden="true" className="spin" /> : <SaveIcon />}
          {state === "saving" ? "Saving PDF…" : state === "failed" ? "Try again" : "Save PDF"}
        </button>
        <button type="button" onClick={copyLink} className="btn flex-1">
          <LinkIcon />
          Copy link
        </button>
      </div>
      {state === "saving" && <p className="mt-1 text-(length:--t-sm) text-ink-2">This takes a few seconds.</p>}
      {state === "failed" && <p className="mt-1 text-(length:--t-sm) font-semibold text-danger-text">{PDF_FAILED}</p>}
      <Link href={previewHref} className="text-btn self-start">
        Preview the PDF
      </Link>
      <p className="text-(length:--t-xs) text-ink-3">Confidential, for internal HR use only</p>
    </div>
  );
}
