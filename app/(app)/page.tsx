import type { Metadata } from "next";
import Board from "@/components/board/Board";
import { parseBoardQuery } from "@/lib/boardQuery";
import { mockReports, reportRoles } from "@/lib/reportMock";

export const metadata: Metadata = { title: "Candidates – PT Example hiring assessments" };

// Only what the board shows goes to the browser, not each report's competencies and insight text.
const candidates = mockReports.map(({ candidateId, candidateName, positionApplied, suitabilityScore, assessmentDate }) => ({
  candidateId,
  candidateName,
  positionApplied,
  suitabilityScore,
  assessmentDate,
}));

export default async function BoardPage({ searchParams }: PageProps<"/">) {
  return <Board candidates={candidates} roles={reportRoles} initialQuery={parseBoardQuery(await searchParams, reportRoles)} />;
}
