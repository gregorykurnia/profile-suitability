import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PreviewBar from "@/components/document/PreviewBar";
import ReportDocument from "@/components/document/ReportDocument";
import OfflineBar from "@/components/shell/OfflineBar";
import { boardQueryString, parseBoardQuery } from "@/lib/boardQuery";
import { getReportByCandidateId, reportRoles } from "@/lib/reportMock";
import { reportFileName } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/report/[candidateId]/preview">): Promise<Metadata> {
  const report = getReportByCandidateId((await params).candidateId);
  return {
    title: report
      ? `PDF preview: ${report.candidateName} – PT Example hiring assessments`
      : undefined,
  };
}

// The PDF's pages on screen (S1, S2, decisions Q3), with Save PDF and the way back to the report.
export default async function PreviewPage({ params, searchParams }: PageProps<"/report/[candidateId]/preview">) {
  const report = getReportByCandidateId((await params).candidateId);
  if (!report) notFound();
  const qs = boardQueryString(parseBoardQuery(await searchParams, reportRoles));

  return (
    <>
      <PreviewBar
        reference={report.candidateId}
        backHref={`/report/${report.candidateId}${qs}`}
        fileName={reportFileName(report)}
      />
      <OfflineBar />
      <main id="content" aria-label="PDF preview" className="flex-1 bg-canvas px-4 pt-8 pb-16">
        <h1 className="sr">PDF preview: {report.candidateName}</h1>
        <ReportDocument key={report.candidateId} report={report} mode="onscreen" />
      </main>
    </>
  );
}
