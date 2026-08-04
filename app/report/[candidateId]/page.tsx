import { mockReport } from "@/lib/reportMock";
import ReportHeader from "@/components/report/ReportHeader";
import OverallSuitabilitySection from "@/components/report/OverallSuitabilitySection";
import CompetencyBreakdownSection from "@/components/report/CompetencyBreakdownSection";
import AIInsightsSection from "@/components/report/AIInsightsSection";
import CompetencyDetailSection from "@/components/report/CompetencyDetailSection";
import DownloadPdfButton from "@/components/report/DownloadPdfButton";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ candidateId: string }>;
}) {
  await params;
  const report = mockReport;

  const fileName = `DEUS_Report_${report.candidateName.replace(/\s+/g, "_")}_${report.positionApplied.replace(
    /\s+/g,
    "_"
  )}_${report.reportGeneratedDate}.pdf`;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-[860px] mx-auto flex justify-end mb-4">
        <DownloadPdfButton targetId="report-content" fileName={fileName} />
      </div>

      <div id="report-content" className="max-w-[860px] mx-auto space-y-6">
        <ReportHeader report={report} />
        <OverallSuitabilitySection report={report} />
        <CompetencyBreakdownSection competencies={report.competencies} />
        <AIInsightsSection report={report} />
        <CompetencyDetailSection competencies={report.competencies} />

        <footer className="text-center text-xs text-muted pt-6 pb-2">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-teal" />©{" "}
            {new Date().getFullYear()} DEUS Human Capital Services. Confidential — for internal
            HR use only.
          </span>
        </footer>
      </div>
    </div>
  );
}
