"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

export default function DownloadPdfButton({
  targetId,
  fileName,
}: {
  targetId: string;
  fileName: string;
}) {
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      const target = document.getElementById(targetId);
      if (!target) return;

      const canvas = await html2canvas(target, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#F8F9FB",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "px", format: "a4", orientation: "portrait" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(fileName);
    } catch (error) {
      console.error("Failed to export PDF", error);
      alert("Something went wrong while generating the PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="no-print inline-flex items-center gap-2 rounded-lg text-white text-sm font-semibold px-4 py-2.5 shadow-md shadow-red/20 hover:shadow-lg hover:shadow-red-light/25 transition-all disabled:opacity-60"
      style={{ background: "linear-gradient(135deg, #b8121e, #e3061c)" }}
    >
      {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
      {exporting ? "Exporting…" : "Download PDF"}
    </button>
  );
}
