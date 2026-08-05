import { Competency, SuitabilityLabel, SuitabilityReport } from "./types";

interface CompetencyDef {
  id: string;
  name: string;
  definition: string;
  benchmarkScore: number;
  lowDescriptor: string;
  midDescriptor: string;
  highDescriptor: string;
}

const competencyDefs: CompetencyDef[] = [
  {
    id: "achievement-drive",
    name: "Achievement Drive",
    definition:
      "The tendency to set ambitious goals, persist through obstacles, and hold oneself to high standards of performance.",
    benchmarkScore: 73,
    lowDescriptor: "Satisfied with meeting minimum expectations; limited drive to exceed targets.",
    midDescriptor: "Works steadily toward goals and meets targets with reasonable consistency.",
    highDescriptor: "Actively seeks stretch goals and sustains effort even when facing significant obstacles.",
  },
  {
    id: "interpersonal-effectiveness",
    name: "Interpersonal Effectiveness",
    definition:
      "The ability to build rapport, read social cues, and maintain productive working relationships across stakeholders.",
    benchmarkScore: 76,
    lowDescriptor: "Struggles to build rapport; relationships are often transactional or strained.",
    midDescriptor: "Builds cooperative working relationships and generally reads social situations well.",
    highDescriptor: "Builds trust quickly across diverse stakeholders and navigates complex social dynamics with ease.",
  },
  {
    id: "analytical-thinking",
    name: "Analytical Thinking",
    definition:
      "The capacity to break down complex problems, identify patterns in data, and draw sound, logical conclusions.",
    benchmarkScore: 72,
    lowDescriptor: "Relies on intuition over data; may overlook important patterns or inconsistencies.",
    midDescriptor: "Breaks down moderately complex problems and generally reaches sound conclusions.",
    highDescriptor: "Rapidly dissects complex, ambiguous problems and consistently identifies non-obvious patterns.",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    definition:
      "The ability to adjust approach and remain effective when facing change, ambiguity, or new demands.",
    benchmarkScore: 71,
    lowDescriptor: "Prefers stability and structure; becomes less effective under rapid change.",
    midDescriptor: "Adjusts to change with some support and maintains reasonable effectiveness.",
    highDescriptor: "Thrives amid ambiguity and rapidly recalibrates approach as conditions shift.",
  },
  {
    id: "leadership-presence",
    name: "Leadership Presence",
    definition:
      "The ability to inspire confidence, project authority, and influence others toward a shared direction.",
    benchmarkScore: 74,
    lowDescriptor: "Rarely takes charge; struggles to project confidence or influence group direction.",
    midDescriptor: "Comfortable leading familiar teams but less assertive in unfamiliar or high-pressure settings.",
    highDescriptor: "Naturally commands the room and consistently inspires confidence across all stakeholder levels.",
  },
  {
    id: "communication-clarity",
    name: "Communication Clarity",
    definition:
      "The ability to convey ideas clearly, concisely, and persuasively across written and verbal channels.",
    benchmarkScore: 75,
    lowDescriptor: "Messages are often unclear or require significant follow-up to be understood.",
    midDescriptor: "Communicates clearly in routine situations with generally well-structured messaging.",
    highDescriptor: "Consistently persuasive and precise, adapting message and tone fluently to any audience.",
  },
];

function statusFor(score: number, benchmark: number): Competency["status"] {
  if (score >= benchmark + 3) return "Above";
  if (score <= benchmark - 3) return "Below";
  return "Meets";
}

function withName(name: string, sentence: string): string {
  return `${name} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
}

function buildCompetencies(candidateFirstName: string, scores: number[]): Competency[] {
  return competencyDefs.map((def, i) => {
    const score = scores[i];
    const status = statusFor(score, def.benchmarkScore);
    const percentile = Math.max(1, Math.min(99, Math.round(score * 1.05 - 15)));
    const descriptor =
      status === "Above" ? def.highDescriptor : status === "Below" ? def.lowDescriptor : def.midDescriptor;
    return {
      id: def.id,
      name: def.name,
      definition: def.definition,
      score,
      percentile,
      benchmarkScore: def.benchmarkScore,
      status,
      behavioralDescriptor: withName(candidateFirstName, descriptor),
      lowDescriptor: def.lowDescriptor,
      midDescriptor: def.midDescriptor,
      highDescriptor: def.highDescriptor,
    };
  });
}

function labelFor(score: number): SuitabilityLabel {
  if (score >= 85) return "Highly Suitable";
  if (score >= 65) return "Suitable";
  if (score >= 45) return "Needs Development";
  return "Not Recommended";
}

interface CandidateSeed {
  candidateName: string;
  candidateId: string;
  positionApplied: string;
  assessmentDate: string;
  clientCompany: string;
  hrContact?: string;
  roleBenchmarkScore: number;
  normGroupDescription: string;
  competencyScores: number[];
}

const seeds: CandidateSeed[] = [
  {
    candidateName: "Budi Santoso",
    candidateId: "DEUS-2026-08421",
    positionApplied: "Area Sales Manager",
    assessmentDate: "2026-07-28",
    clientCompany: "PT Telkom Indonesia",
    hrContact: "Siti Rahayu, HR Business Partner",
    roleBenchmarkScore: 70,
    normGroupDescription: "Indonesian working adults, managerial level, n=1,240",
    competencyScores: [82, 71, 65, 78, 60, 74],
  },
  {
    candidateName: "Dewi Anggraini",
    candidateId: "DEUS-2026-08422",
    positionApplied: "Area Sales Manager",
    assessmentDate: "2026-07-29",
    clientCompany: "PT Telkom Indonesia",
    hrContact: "Siti Rahayu, HR Business Partner",
    roleBenchmarkScore: 70,
    normGroupDescription: "Indonesian working adults, managerial level, n=1,240",
    competencyScores: [91, 85, 84, 88, 90, 86],
  },
  {
    candidateName: "Rizky Pratama",
    candidateId: "DEUS-2026-08423",
    positionApplied: "Ops Supervisor",
    assessmentDate: "2026-07-30",
    clientCompany: "PT Dayamitra Telekomunikasi",
    hrContact: "Ahmad Fauzi, HR Business Partner",
    roleBenchmarkScore: 68,
    normGroupDescription: "Indonesian working adults, supervisory level, n=860",
    competencyScores: [55, 60, 48, 52, 45, 58],
  },
  {
    candidateName: "Nadia Wulandari",
    candidateId: "DEUS-2026-08424",
    positionApplied: "Finance Analyst",
    assessmentDate: "2026-07-30",
    clientCompany: "PT Telkomsel",
    hrContact: "Hendra Wijaya, Talent Acquisition Lead",
    roleBenchmarkScore: 74,
    normGroupDescription: "Indonesian working adults, professional/analyst level, n=980",
    competencyScores: [85, 78, 90, 76, 72, 83],
  },
  {
    candidateName: "Andi Firmansyah",
    candidateId: "DEUS-2026-08425",
    positionApplied: "Ops Supervisor",
    assessmentDate: "2026-07-31",
    clientCompany: "PT Telkom Indonesia",
    hrContact: "Siti Rahayu, HR Business Partner",
    roleBenchmarkScore: 68,
    normGroupDescription: "Indonesian working adults, supervisory level, n=860",
    competencyScores: [35, 42, 38, 40, 33, 45],
  },
  {
    candidateName: "Sri Wahyuni",
    candidateId: "DEUS-2026-08426",
    positionApplied: "Area Sales Manager",
    assessmentDate: "2026-08-01",
    clientCompany: "PT Telkomsel",
    hrContact: "Hendra Wijaya, Talent Acquisition Lead",
    roleBenchmarkScore: 70,
    normGroupDescription: "Indonesian working adults, managerial level, n=1,240",
    competencyScores: [70, 68, 65, 72, 66, 71],
  },
  {
    candidateName: "Fajar Nugroho",
    candidateId: "DEUS-2026-08427",
    positionApplied: "Finance Analyst",
    assessmentDate: "2026-08-02",
    clientCompany: "PT Telkomsel",
    hrContact: "Hendra Wijaya, Talent Acquisition Lead",
    roleBenchmarkScore: 74,
    normGroupDescription: "Indonesian working adults, professional/analyst level, n=980",
    competencyScores: [58, 65, 62, 60, 55, 66],
  },
  {
    candidateName: "Putri Handayani",
    candidateId: "DEUS-2026-08428",
    positionApplied: "Ops Supervisor",
    assessmentDate: "2026-08-04",
    clientCompany: "PT Telkom Indonesia",
    hrContact: "Siti Rahayu, HR Business Partner",
    roleBenchmarkScore: 68,
    normGroupDescription: "Indonesian working adults, supervisory level, n=860",
    competencyScores: [80, 74, 76, 79, 73, 78],
  },
  {
    candidateName: "Yusuf Hakim",
    candidateId: "DEUS-2026-08429",
    positionApplied: "Area Sales Manager",
    assessmentDate: "2026-08-05",
    clientCompany: "PT Dayamitra Telekomunikasi",
    hrContact: "Ahmad Fauzi, HR Business Partner",
    roleBenchmarkScore: 70,
    normGroupDescription: "Indonesian working adults, managerial level, n=1,240",
    competencyScores: [66, 62, 58, 64, 57, 63],
  },
  {
    candidateName: "Maya Kusuma",
    candidateId: "DEUS-2026-08430",
    positionApplied: "Finance Analyst",
    assessmentDate: "2026-08-05",
    clientCompany: "PT Telkom Indonesia",
    hrContact: "Siti Rahayu, HR Business Partner",
    roleBenchmarkScore: 74,
    normGroupDescription: "Indonesian working adults, professional/analyst level, n=980",
    competencyScores: [88, 82, 87, 84, 79, 85],
  },
];

function buildReport(seed: CandidateSeed): SuitabilityReport {
  const competencies = buildCompetencies(seed.candidateName.split(" ")[0], seed.competencyScores);
  const suitabilityScore = Math.round(
    competencies.reduce((sum, c) => sum + c.score, 0) / competencies.length
  );
  const normativePercentile = Math.max(
    1,
    Math.min(99, Math.round(competencies.reduce((sum, c) => sum + c.percentile, 0) / competencies.length))
  );

  return {
    candidateName: seed.candidateName,
    candidateId: seed.candidateId,
    positionApplied: seed.positionApplied,
    assessmentDate: seed.assessmentDate,
    reportGeneratedDate: "2026-08-05",
    clientCompany: seed.clientCompany,
    hrContact: seed.hrContact,
    suitabilityScore,
    suitabilityLabel: labelFor(suitabilityScore),
    normativePercentile,
    normGroupDescription: seed.normGroupDescription,
    roleBenchmarkScore: seed.roleBenchmarkScore,
    competencies,
  };
}

export const mockReports: SuitabilityReport[] = seeds.map(buildReport);

export const mockReport: SuitabilityReport = mockReports[0];

export function getReportByCandidateId(candidateId: string): SuitabilityReport | undefined {
  return mockReports.find((r) => r.candidateId === candidateId);
}
