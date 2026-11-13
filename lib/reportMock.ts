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
    role: "Shift Manager",
    scores: {
      "shift-leadership-crew-deployment": 71,
      "crew-coaching-development": 71,
      "guest-experience-service-recovery": 54,
      "operational-standards-compliance": 70,
      "shift-performance-cost-control": 52,
      "composure-decision-making": 65,
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
    role: "Service Crew",
    scores: {
      "guest-welcome-service-ownership": 49,
      "menu-knowledge-suggestive-selling": 35,
      "order-accuracy-payment-handling": 65,
      "guest-recovery-escalation": 59,
      "front-kitchen-coordination": 38,
      "composure-peak-hours": 51,
    },
    assessmentDate: "2026-09-30",
    clientCompany: "PT Example",
    hrContact: "Bambang Setiawan, Talent Acquisition Lead",
  },
  {
    candidateName: "Intan Permatasari",
    candidateId: "DEUS-2026-09614",
    role: "Shift Manager",
    scores: {
      "shift-leadership-crew-deployment": 71,
      "crew-coaching-development": 86,
      "guest-experience-service-recovery": 76,
      "operational-standards-compliance": 91,
      "shift-performance-cost-control": 71,
      "composure-decision-making": 89,
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
    role: "Pizza Cook",
    scores: {
      "recipe-build-standards": 66,
      "food-safety-hygiene-discipline": 67,
      "make-line-speed-rush-handling": 67,
      "prep-planning-stock-rotation": 81,
      "product-quality-checks": 71,
      "kitchen-teamwork-station-support": 66,
    },
    assessmentDate: "2026-10-06",
    clientCompany: "PT Example",
    hrContact: "Mega Puspita, HR Business Partner",
  },
  {
    candidateName: "Eko Prasetyo",
    candidateId: "DEUS-2026-09619",
    role: "Pizza Cook",
    scores: {
      "recipe-build-standards": 82,
      "food-safety-hygiene-discipline": 86,
      "make-line-speed-rush-handling": 95,
      "prep-planning-stock-rotation": 69,
      "product-quality-checks": 77,
      "kitchen-teamwork-station-support": 95,
    },
    assessmentDate: "2026-10-08",
    clientCompany: "PT Example",
    hrContact: "Bambang Setiawan, Talent Acquisition Lead",
  },
  {
    candidateName: "Fitri Rahmawati",
    candidateId: "DEUS-2026-09620",
    role: "Pizza Cook",
    scores: {
      "recipe-build-standards": 77,
      "food-safety-hygiene-discipline": 81,
      "make-line-speed-rush-handling": 80,
      "prep-planning-stock-rotation": 64,
      "product-quality-checks": 77,
      "kitchen-teamwork-station-support": 76,
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
