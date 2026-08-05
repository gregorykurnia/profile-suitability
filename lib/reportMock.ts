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

const areaSalesManagerCompetencyDefs: CompetencyDef[] = [
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

const opsSupervisorCompetencyDefs: CompetencyDef[] = [
  {
    id: "operational-discipline",
    name: "Operational Discipline",
    definition:
      "The tendency to follow standard operating procedures, maintain consistent execution quality, and hold the team accountable to defined processes.",
    benchmarkScore: 74,
    lowDescriptor: "Deviates from procedures under pressure; execution quality varies from shift to shift.",
    midDescriptor: "Follows established procedures reliably and keeps routine operations running smoothly.",
    highDescriptor: "Enforces process discipline consistently and proactively closes gaps before they cause disruption.",
  },
  {
    id: "team-coordination",
    name: "Team Coordination",
    definition:
      "The ability to organize, direct, and align frontline teams to deliver coordinated output across shifts and tasks.",
    benchmarkScore: 72,
    lowDescriptor: "Struggles to align team members; handoffs between shifts or tasks are often unclear.",
    midDescriptor: "Coordinates day-to-day team activity effectively with generally smooth handoffs.",
    highDescriptor: "Seamlessly orchestrates multiple teams and workstreams, anticipating coordination gaps in advance.",
  },
  {
    id: "problem-solving-under-pressure",
    name: "Problem Solving Under Pressure",
    definition:
      "The capacity to diagnose operational issues quickly and apply practical fixes while maintaining composure under time pressure.",
    benchmarkScore: 70,
    lowDescriptor: "Becomes reactive under pressure; troubleshooting is slow or trial-and-error driven.",
    midDescriptor: "Diagnoses common operational issues effectively and resolves them within reasonable time.",
    highDescriptor: "Rapidly isolates root causes even in novel situations and stays composed under sustained pressure.",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    definition:
      "The ability to adjust approach and remain effective when facing shifting priorities, schedules, or field conditions.",
    benchmarkScore: 69,
    lowDescriptor: "Prefers fixed routines; effectiveness drops when schedules or conditions change unexpectedly.",
    midDescriptor: "Adjusts to changing conditions with some support and maintains reasonable effectiveness.",
    highDescriptor: "Recalibrates plans quickly amid shifting field conditions without losing operational momentum.",
  },
  {
    id: "safety-compliance-orientation",
    name: "Safety & Compliance Orientation",
    definition:
      "The tendency to prioritize safety protocols and regulatory compliance in day-to-day operational decisions.",
    benchmarkScore: 75,
    lowDescriptor: "Compliance and safety steps are sometimes skipped or treated as secondary to speed.",
    midDescriptor: "Follows safety and compliance requirements consistently in routine situations.",
    highDescriptor: "Champions safety and compliance proactively and models it visibly for the team.",
  },
  {
    id: "communication-clarity",
    name: "Communication Clarity",
    definition:
      "The ability to give clear, actionable instructions to field teams and escalate issues concisely to management.",
    benchmarkScore: 71,
    lowDescriptor: "Instructions are often ambiguous, leading to rework or confusion on the ground.",
    midDescriptor: "Communicates instructions and updates clearly in routine operational situations.",
    highDescriptor: "Delivers precise, actionable direction under pressure and escalates issues with exactly the right detail.",
  },
];

const financeAnalystCompetencyDefs: CompetencyDef[] = [
  {
    id: "analytical-rigor",
    name: "Analytical Rigor",
    definition:
      "The capacity to structure financial data, apply sound methodology, and draw well-supported conclusions from complex information.",
    benchmarkScore: 76,
    lowDescriptor: "Analysis is often superficial or skips steps needed to validate conclusions.",
    midDescriptor: "Structures financial analysis soundly and reaches reasonable, defensible conclusions.",
    highDescriptor: "Applies rigorous, multi-angle analysis and consistently surfaces insights others miss.",
  },
  {
    id: "attention-to-detail",
    name: "Attention to Detail",
    definition:
      "The tendency to work with precision, catch errors, and ensure accuracy across financial data and reporting.",
    benchmarkScore: 78,
    lowDescriptor: "Errors and inconsistencies in figures or reports are missed without external review.",
    midDescriptor: "Produces accurate work in routine tasks with only occasional oversight needed.",
    highDescriptor: "Catches subtle errors consistently and maintains near-flawless accuracy under deadline pressure.",
  },
  {
    id: "financial-acumen",
    name: "Financial Acumen",
    definition:
      "The depth of understanding of financial principles, statements, and business drivers needed to interpret results meaningfully.",
    benchmarkScore: 74,
    lowDescriptor: "Grasps basic financial concepts but struggles to connect figures to business drivers.",
    midDescriptor: "Understands core financial principles and applies them appropriately to routine analysis.",
    highDescriptor: "Translates financial data into clear business implications and anticipates downstream impact.",
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    definition:
      "The ability to identify the root cause of financial discrepancies or business problems and propose sound solutions.",
    benchmarkScore: 71,
    lowDescriptor: "Tends to address symptoms rather than root causes of financial issues.",
    midDescriptor: "Identifies root causes of common issues and proposes workable solutions.",
    highDescriptor: "Diagnoses complex, ambiguous financial problems quickly and proposes solutions others overlook.",
  },
  {
    id: "integrity-compliance-orientation",
    name: "Integrity & Compliance Orientation",
    definition:
      "The tendency to uphold accuracy, transparency, and adherence to financial controls and regulatory standards.",
    benchmarkScore: 79,
    lowDescriptor: "May take shortcuts on controls or documentation under time pressure.",
    midDescriptor: "Adheres to financial controls and compliance requirements consistently.",
    highDescriptor: "Proactively strengthens controls and flags compliance risks before they become issues.",
  },
  {
    id: "communication-clarity",
    name: "Communication Clarity",
    definition:
      "The ability to translate financial findings into clear, concise reporting and recommendations for non-finance stakeholders.",
    benchmarkScore: 73,
    lowDescriptor: "Reports are heavy on figures but light on clear takeaways for non-finance audiences.",
    midDescriptor: "Communicates financial findings clearly in routine reporting situations.",
    highDescriptor: "Distills complex financial findings into crisp, decision-ready narratives for any audience.",
  },
];

const competencyDefsByPosition: Record<string, CompetencyDef[]> = {
  "Area Sales Manager": areaSalesManagerCompetencyDefs,
  "Ops Supervisor": opsSupervisorCompetencyDefs,
  "Finance Analyst": financeAnalystCompetencyDefs,
};

function competencyDefsFor(positionApplied: string): CompetencyDef[] {
  return competencyDefsByPosition[positionApplied] ?? areaSalesManagerCompetencyDefs;
}

function statusFor(score: number, benchmark: number): Competency["status"] {
  if (score >= benchmark + 3) return "Above";
  if (score <= benchmark - 3) return "Below";
  return "Meets";
}

function withName(name: string, sentence: string): string {
  return `${name} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
}

function buildCompetencies(positionApplied: string, candidateFirstName: string, scores: number[]): Competency[] {
  return competencyDefsFor(positionApplied).map((def, i) => {
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
  const competencies = buildCompetencies(
    seed.positionApplied,
    seed.candidateName.split(" ")[0],
    seed.competencyScores
  );
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
