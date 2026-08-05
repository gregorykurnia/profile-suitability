import { notFound } from "next/navigation";
import { getReportByCandidateId } from "@/lib/reportMock";
import ReportHeader from "@/components/report/ReportHeader";
import OverallSuitabilitySection from "@/components/report/OverallSuitabilitySection";
import CompetencyBreakdownSection from "@/components/report/CompetencyBreakdownSection";
import AIInsightsSection from "@/components/report/AIInsightsSection";
import CompetencyDetailSection from "@/components/report/CompetencyDetailSection";
import DownloadPdfButton from "@/components/report/DownloadPdfButton";
import { BackToCandidatesLink, ReportFooter } from "@/components/report/ReportPageChrome";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ candidateId: string }>;
}) {
  const { candidateId } = await params;
  const report = getReportByCandidateId(candidateId);

  if (!report) {
    notFound();
  }

  const fileName = `DEUS_Report_${report.candidateName.replace(/\s+/g, "_")}_${report.positionApplied.replace(
    /\s+/g,
    "_"
  )}_${report.reportGeneratedDate}.pdf`;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-[860px] mx-auto flex items-center justify-between mb-4">
        <BackToCandidatesLink />
        <DownloadPdfButton targetId="report-content" fileName={fileName} />
      </div>

      <div id="report-content" className="max-w-[860px] mx-auto space-y-6">
        <ReportHeader report={report} />
        <OverallSuitabilitySection report={report} />
        <CompetencyBreakdownSection competencies={report.competencies} />
        <AIInsightsSection report={report} />
        <CompetencyDetailSection competencies={report.competencies} />

        <ReportFooter />
      </div>
    </div>
  );
}
