import type {
  BenchmarkStatus,
  Competency,
  SuitabilityLabel,
  SuitabilityReport,
} from "./types";
import {
  assertDemoInsightCoverage,
  getDemoInsightsForReport,
} from "./demoInsights";
import { getRoleDefinition, roleRegistry, type RoleName } from "./roles";
import { buildRoleReferenceData, type RoleReferenceData } from "./roles/reference";
import type { RoleDefinition } from "./roles/types";

const REPORT_GENERATED_DATE = "2026-10-12";

export interface DemoCandidate {
  candidateName: string;
  candidateId: string;
  role: RoleName;
  scores: Record<string, number>;
  assessmentDate: string;
  clientCompany: string;
  hrContact?: string;
}

// Authored scores preserve the original demo profiles independently of other candidates.
export const demoCandidates: DemoCandidate[] = [
  {
    candidateName: "Agus Wibowo",
    candidateId: "DEUS-2026-09611",
    role: "Project Manager",
    scores: {
      "planning-scheduling": 78,
      "stakeholder-management": 52,
      "team-leadership-delegation": 62,
      "risk-issue-management": 58,
      "delivery-ownership": 80,
      "leading-through-change-pressure": 50,
    },
    assessmentDate: "2026-09-28",
    clientCompany: "PT Example",
    hrContact: "Mega Puspita, HR Business Partner",
  },
  {
    candidateName: "Rina Marlina",
    candidateId: "DEUS-2026-09612",
    role: "Sales Executive",
    scores: {
      "prospecting-pipeline-building": 90,
      "consultative-selling-negotiation": 93,
      "client-relationship-management": 88,
      "target-ownership-drive": 94,
      "market-competitor-insight": 86,
      "bouncing-back-from-setbacks": 89,
    },
    assessmentDate: "2026-09-29",
    clientCompany: "PT Example",
    hrContact: "Mega Puspita, HR Business Partner",
  },
  {
    candidateName: "Dimas Saputra",
    candidateId: "DEUS-2026-09613",
    role: "Software Engineer",
    scores: {
      "technical-problem-solving": 86,
      "code-quality-ownership": 78,
      "continuous-learning": 82,
      "collaborative-delivery": 70,
      "adapting-changing-requirements": 66,
      "planning-estimation": 68,
    },
    assessmentDate: "2026-09-30",
    clientCompany: "PT Example",
    hrContact: "Bambang Setiawan, Talent Acquisition Lead",
  },
  {
    candidateName: "Intan Permatasari",
    candidateId: "DEUS-2026-09614",
    role: "Finance Officer",
    scores: {
      "accuracy-attention-to-detail": 84,
      "compliance-control-discipline": 88,
      "analytical-reporting": 70,
      "deadline-close-management": 78,
      "reconciliation-problem-investigation": 74,
      "business-partnering": 66,
    },
    assessmentDate: "2026-09-30",
    clientCompany: "PT Example",
    hrContact: "Ratna Sari, Area HR Manager",
  },
  {
    candidateName: "Hendra Gunawan",
    candidateId: "DEUS-2026-09615",
    role: "Customer Service Officer",
    scores: {
      "customer-care-ownership": 94,
      "clear-empathetic-communication": 96,
      "accurate-case-handling": 90,
      "complaint-resolution-escalation": 93,
      "product-process-knowledge": 88,
      "composure-under-customer-pressure": 75,
    },
    assessmentDate: "2026-10-01",
    clientCompany: "PT Example",
    hrContact: "Mega Puspita, HR Business Partner",
  },
  {
    candidateName: "Ayu Lestari",
    candidateId: "DEUS-2026-09616",
    role: "Customer Service Officer",
    scores: {
      "customer-care-ownership": 76,
      "clear-empathetic-communication": 72,
      "accurate-case-handling": 88,
      "complaint-resolution-escalation": 66,
      "product-process-knowledge": 80,
      "composure-under-customer-pressure": 70,
    },
    assessmentDate: "2026-10-02",
    clientCompany: "PT Example",
    hrContact: "Ratna Sari, Area HR Manager",
  },
  {
    candidateName: "Bayu Ramadhan",
    candidateId: "DEUS-2026-09617",
    role: "Sales Executive",
    scores: {
      "prospecting-pipeline-building": 82,
      "consultative-selling-negotiation": 62,
      "client-relationship-management": 74,
      "target-ownership-drive": 84,
      "market-competitor-insight": 60,
      "bouncing-back-from-setbacks": 78,
    },
    assessmentDate: "2026-10-05",
    clientCompany: "PT Example",
    hrContact: "Bambang Setiawan, Talent Acquisition Lead",
  },
  {
    candidateName: "Citra Ayuningtyas",
    candidateId: "DEUS-2026-09618",
    role: "Management Trainee",
    scores: {
      "learning-agility": 94,
      "initiative-ownership": 90,
      "analytical-thinking": 92,
      "commercial-awareness": 84,
      "influence-collaboration": 86,
      "leadership-potential": 74,
    },
    assessmentDate: "2026-10-06",
    clientCompany: "PT Example",
    hrContact: "Mega Puspita, HR Business Partner",
  },
  {
    candidateName: "Eko Prasetyo",
    candidateId: "DEUS-2026-09619",
    role: "Project Manager",
    scores: {
      "planning-scheduling": 66,
      "stakeholder-management": 84,
      "team-leadership-delegation": 88,
      "risk-issue-management": 72,
      "delivery-ownership": 70,
      "leading-through-change-pressure": 86,
    },
    assessmentDate: "2026-10-08",
    clientCompany: "PT Example",
    hrContact: "Bambang Setiawan, Talent Acquisition Lead",
  },
  {
    candidateName: "Fitri Rahmawati",
    candidateId: "DEUS-2026-09620",
    role: "Management Trainee",
    scores: {
      "learning-agility": 80,
      "initiative-ownership": 76,
      "analytical-thinking": 66,
      "commercial-awareness": 64,
      "influence-collaboration": 88,
      "leadership-potential": 86,
    },
    assessmentDate: "2026-10-09",
    clientCompany: "PT Example",
    hrContact: "Ratna Sari, Area HR Manager",
  },
  {
    candidateName: "Gilang Pratama",
    candidateId: "DEUS-2026-09621",
    role: "Customer Service Officer",
    scores: {
      "customer-care-ownership": 68,
      "clear-empathetic-communication": 82,
      "accurate-case-handling": 52,
      "complaint-resolution-escalation": 58,
      "product-process-knowledge": 54,
      "composure-under-customer-pressure": 64,
    },
    assessmentDate: "2026-09-24",
    clientCompany: "PT Example",
    hrContact: "Ratna Sari, Area HR Manager",
  },
  {
    candidateName: "Nadia Kusuma",
    candidateId: "DEUS-2026-09622",
    role: "Sales Executive",
    scores: {
      "prospecting-pipeline-building": 34,
      "consultative-selling-negotiation": 40,
      "client-relationship-management": 56,
      "target-ownership-drive": 38,
      "market-competitor-insight": 44,
      "bouncing-back-from-setbacks": 36,
    },
    assessmentDate: "2026-10-07",
    clientCompany: "PT Example",
    hrContact: "Bambang Setiawan, Talent Acquisition Lead",
  },
  {
    candidateName: "Reza Firmansyah",
    candidateId: "DEUS-2026-09623",
    role: "Finance Officer",
    scores: {
      "accuracy-attention-to-detail": 52,
      "compliance-control-discipline": 50,
      "analytical-reporting": 70,
      "deadline-close-management": 48,
      "reconciliation-problem-investigation": 78,
      "business-partnering": 62,
    },
    assessmentDate: "2026-09-25",
    clientCompany: "PT Example",
    hrContact: "Bambang Setiawan, Talent Acquisition Lead",
  },
  {
    candidateName: "Sari Wulandari",
    candidateId: "DEUS-2026-09624",
    role: "Software Engineer",
    scores: {
      "technical-problem-solving": 46,
      "code-quality-ownership": 54,
      "continuous-learning": 69,
      "collaborative-delivery": 85,
      "adapting-changing-requirements": 73,
      "planning-estimation": 50,
    },
    assessmentDate: "2026-10-03",
    clientCompany: "PT Example",
    hrContact: "Mega Puspita, HR Business Partner",
  },
  {
    candidateName: "Yoga Aditya",
    candidateId: "DEUS-2026-09625",
    role: "Management Trainee",
    scores: {
      "learning-agility": 38,
      "initiative-ownership": 30,
      "analytical-thinking": 44,
      "commercial-awareness": 36,
      "influence-collaboration": 76,
      "leadership-potential": 32,
    },
    assessmentDate: "2026-09-26",
    clientCompany: "PT Example",
    hrContact: "Ratna Sari, Area HR Manager",
  },
];

assertDemoInsightCoverage(demoCandidates.map((candidate) => candidate.candidateId));

export const demoRoleAssignments: Record<string, RoleName> = Object.fromEntries(
  demoCandidates.map((candidate) => [candidate.candidateId, candidate.role])
);

const roleReferenceData = Object.fromEntries(
  Object.entries(roleRegistry).map(([name, role]) => [name, buildRoleReferenceData(name, role)])
) as Record<RoleName, RoleReferenceData>;

function assertAuthoredScores(candidate: DemoCandidate, role: RoleDefinition): void {
  if (
    Object.keys(candidate.scores).length !== role.competencies.length ||
    role.competencies.some(({ id }) =>
      !Object.hasOwn(candidate.scores, id) ||
      !Number.isFinite(candidate.scores[id]) ||
      candidate.scores[id] < 0 ||
      candidate.scores[id] > 100
    )
  ) {
    throw new Error(`Authored scores must cover exactly the role competencies with finite values from 0 to 100 for ${candidate.candidateId}.`);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// "Meeting" means within 3 points of the benchmark either way.
function statusFor(score: number, benchmark: number): BenchmarkStatus {
  if (score - benchmark > 3) return "Above";
  if (score - benchmark < -3) return "Below";
  return "Meets";
}

function percentileFor(value: number, referenceScores: number[]): number {
  let below = 0;
  let equal = 0;

  for (const referenceScore of referenceScores) {
    if (referenceScore < value) below += 1;
    if (referenceScore === value) equal += 1;
  }

  return clamp(
    Math.round((100 * (below + 0.5 * equal)) / referenceScores.length),
    1,
    99
  );
}

function renderPracticalInterpretation(template: string, firstName: string): string {
  return template.replace(/\{firstName\}/g, firstName);
}

function buildCompetencies(
  role: RoleName,
  candidateFirstName: string,
  scores: Record<string, number>,
  referenceData: RoleReferenceData
): Competency[] {
  return getRoleDefinition(role).competencies.map((definition) => {
    const score = scores[definition.id];
    const benchmarkScore = referenceData.competencyBenchmarks[definition.id];
    const status = statusFor(score, benchmarkScore);

    return {
      id: definition.id,
      name: definition.name,
      definition: definition.definition,
      sourceCompetencies: [...definition.sourceCompetencies],
      score,
      percentile: percentileFor(score, referenceData.scoresByCompetency[definition.id]),
      benchmarkScore,
      status,
      behavioralDescriptor: renderPracticalInterpretation(
        definition.practicalInterpretations[status],
        candidateFirstName
      ),
      lowDescriptor: definition.lowDescriptor,
      midDescriptor: definition.midDescriptor,
      highDescriptor: definition.highDescriptor,
    };
  });
}

function labelFor(score: number): SuitabilityLabel {
  if (score >= 85) return "Highly Recommended";
  if (score >= 65) return "Recommended";
  if (score >= 45) return "Considered";
  return "Not Recommended";
}

export function buildReport(candidate: DemoCandidate): SuitabilityReport {
  const roleDefinition = getRoleDefinition(candidate.role);
  assertAuthoredScores(candidate, roleDefinition);
  const role = candidate.role;
  const referenceData = roleReferenceData[role];
  const scores = candidate.scores;
  const competencies = buildCompetencies(
    role,
    candidate.candidateName.split(" ")[0],
    scores,
    referenceData
  );
  const suitabilityScore = Math.round(
    competencies.reduce((sum, competency) => sum + competency.score, 0) /
      competencies.length
  );

  const report: SuitabilityReport = {
    candidateName: candidate.candidateName,
    candidateId: candidate.candidateId,
    positionApplied: role,
    assessmentDate: candidate.assessmentDate,
    reportGeneratedDate: REPORT_GENERATED_DATE,
    clientCompany: candidate.clientCompany,
    hrContact: candidate.hrContact,
    suitabilityScore,
    suitabilityLabel: labelFor(suitabilityScore),
    normativePercentile: percentileFor(suitabilityScore, referenceData.overallScores),
    normGroupDescription: roleDefinition.normGroupDescription,
    // Compatibility field: this is the shared role norm average, not the mean of targets.
    roleBenchmarkScore: referenceData.normAverage,
    competencies,
  };

  report.insights = getDemoInsightsForReport(report, roleDefinition.seed);
  return report;
}

export const mockReports: SuitabilityReport[] = demoCandidates.map(buildReport);

export const reportRoles: string[] = [...new Set(mockReports.map((report) => report.positionApplied))];

export const mockReport: SuitabilityReport = mockReports[0];

export function getReportByCandidateId(candidateId: string): SuitabilityReport | undefined {
  return mockReports.find((report) => report.candidateId === candidateId);
}
