import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GapChart from "@/components/candidate/GapChart";
import { InShort, Risks, StrengthsShortfalls } from "@/components/candidate/InsightText";
import QueueBar from "@/components/candidate/QueueBar";
import KeepOffline from "@/components/candidate/KeepOffline";
import ReportActions from "@/components/candidate/ReportActions";
import VerdictBand from "@/components/candidate/VerdictBand";
import ReportDocument from "@/components/document/ReportDocument";
import { boardQueryString, boardSequence, DEFAULT_QUERY, parseBoardQuery, queryContext } from "@/lib/boardQuery";
import { getReportByCandidateId, mockReports, reportRoles as ROLES } from "@/lib/reportMock";
import { reportFileName } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/report/[candidateId]">): Promise<Metadata> {
  const report = getReportByCandidateId((await params).candidateId);
  return {
    title: report
      ? `${report.candidateName}, ${report.positionApplied} – PT Example hiring assessments`
      : undefined,
  };
}

export default async function ReportPage({ params, searchParams }: PageProps<"/report/[candidateId]">) {
  const { candidateId } = await params;
  const report = getReportByCandidateId(candidateId);
  if (!report) notFound();

  // The board's narrowing and order come along in the URL. A link that doesn't fit them steps through everyone.
  let query = parseBoardQuery(await searchParams, ROLES);
  let sequence = boardSequence(mockReports, query);
  if (!sequence.some((r) => r.candidateId === report.candidateId)) {
    query = DEFAULT_QUERY;
    sequence = boardSequence(mockReports, query);
  }
  const index = sequence.findIndex((r) => r.candidateId === report.candidateId);
  const qs = boardQueryString(query);
  const neighbour = (i: number) =>
    sequence[i] ? { name: sequence[i].candidateName, href: `/report/${sequence[i].candidateId}${qs}` } : null;
  const context = queryContext(query, ROLES);
  const insights = report.insights;

  return (
    <>
      <KeepOffline reference={report.candidateId} />
      <QueueBar
        backHref={`/${qs}`}
        narrowing={context.narrowing}
        order={context.order}
        position={index + 1}
        total={sequence.length}
        prev={neighbour(index - 1)}
        next={neighbour(index + 1)}
      />

      <VerdictBand
        key={`verdict-${report.candidateId}`}
        name={report.candidateName}
        reference={report.candidateId}
        role={report.positionApplied}
        clientCompany={report.clientCompany}
        hrContact={report.hrContact}
        assessed={report.assessmentDate}
        produced={report.reportGeneratedDate}
        score={report.suitabilityScore}
        percentile={report.normativePercentile}
        normGroup={report.normGroupDescription}
        roleAverage={report.roleBenchmarkScore}
      />

      <div className="mx-auto grid max-w-(--max) items-start gap-6 px-(--gutter) pt-7 pb-2 min-[760px]:gap-8 min-[760px]:pt-10 min-[1180px]:grid-cols-[minmax(0,1fr)_340px] min-[1180px]:gap-14">
        {insights && <InShort summary={insights.executiveSummary} />}
        <ReportActions
          candidateName={report.candidateName}
          reference={report.candidateId}
          fileName={reportFileName(report)}
          previewHref={`/report/${report.candidateId}/preview${qs}`}
        />
      </div>

      <div className="mx-auto grid max-w-(--max) items-start gap-10 px-(--gutter) pt-8 pb-6 min-[760px]:gap-8 min-[760px]:pt-10 min-[1180px]:grid-cols-[minmax(0,1fr)_340px] min-[1180px]:gap-14">
        <GapChart competencies={report.competencies} role={report.positionApplied} />
        {insights && <StrengthsShortfalls strengths={insights.keyStrengths} shortfalls={insights.developmentAreas} />}
      </div>

      {insights && <Risks risks={insights.roleFitRisks} />}

      <footer className="mx-auto max-w-(--max) px-(--gutter) pb-14 text-(length:--t-xs) text-ink-3">
        <p>Confidential, for internal HR use only. Insight written from simulated demo data.</p>
      </footer>

      {/* The A4 pages, off screen: what Save PDF copies and Ctrl+P prints. */}
      <ReportDocument key={`document-${report.candidateId}`} report={report} mode="offscreen" />
    </>
  );
}
