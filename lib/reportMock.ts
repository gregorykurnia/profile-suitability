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
  {
    id: "negotiation-skill",
    name: "Negotiation Skill",
    definition:
      "The ability to secure favorable terms while preserving the relationship, balancing assertiveness with flexibility.",
    benchmarkScore: 72,
    lowDescriptor: "Concedes ground quickly or pushes too hard, straining client relationships.",
    midDescriptor: "Negotiates routine deals effectively while keeping the relationship intact.",
    highDescriptor: "Consistently secures favorable terms on complex deals while strengthening the relationship.",
  },
  {
    id: "customer-orientation",
    name: "Customer Orientation",
    definition:
      "The tendency to prioritize customer needs and translate them into responsive, tailored solutions.",
    benchmarkScore: 77,
    lowDescriptor: "Applies a one-size-fits-all approach; misses cues about specific customer needs.",
    midDescriptor: "Identifies customer needs accurately and responds appropriately in routine accounts.",
    highDescriptor: "Anticipates customer needs proactively and tailors solutions that deepen loyalty.",
  },
  {
    id: "business-acumen",
    name: "Business Acumen",
    definition:
      "The depth of understanding of market dynamics, competitors, and business drivers relevant to the territory.",
    benchmarkScore: 70,
    lowDescriptor: "Has limited awareness of market and competitor dynamics beyond immediate accounts.",
    midDescriptor: "Understands core market dynamics and applies them to routine territory decisions.",
    highDescriptor: "Reads market shifts early and repositions territory strategy ahead of competitors.",
  },
  {
    id: "resilience",
    name: "Resilience",
    definition:
      "The capacity to sustain motivation and performance in the face of rejection, setbacks, or missed targets.",
    benchmarkScore: 69,
    lowDescriptor: "Motivation drops noticeably after rejection or a missed target.",
    midDescriptor: "Recovers from setbacks within a reasonable time and keeps performance steady.",
    highDescriptor: "Bounces back from setbacks almost immediately and uses them to sharpen approach.",
  },
  {
    id: "planning-and-organizing",
    name: "Planning & Organizing",
    definition:
      "The ability to structure territory coverage, prioritize accounts, and manage time against competing demands.",
    benchmarkScore: 73,
    lowDescriptor: "Territory coverage is reactive; priorities shift without a clear plan.",
    midDescriptor: "Plans routine account coverage effectively and manages time reasonably well.",
    highDescriptor: "Structures territory and time with precision, consistently prioritizing highest-impact accounts.",
  },
  {
    id: "decision-making",
    name: "Decision Making",
    definition:
      "The ability to weigh available information and commit to timely, sound decisions in the field.",
    benchmarkScore: 71,
    lowDescriptor: "Delays decisions waiting for more information, even when timing matters.",
    midDescriptor: "Makes timely decisions on routine matters with generally sound judgment.",
    highDescriptor: "Commits to well-reasoned decisions quickly, even with incomplete information.",
  },
  {
    id: "coaching-and-team-development",
    name: "Coaching & Team Development",
    definition:
      "The ability to develop the capability of junior sales staff through feedback, modeling, and delegation.",
    benchmarkScore: 68,
    lowDescriptor: "Rarely invests time in developing others; feedback is infrequent or vague.",
    midDescriptor: "Provides useful feedback and support to junior staff on a regular basis.",
    highDescriptor: "Actively grows team capability through consistent coaching and well-judged delegation.",
  },
  {
    id: "integrity-and-ethics",
    name: "Integrity & Ethics",
    definition:
      "The tendency to act honestly and transparently in deal-making, reporting, and client commitments.",
    benchmarkScore: 80,
    lowDescriptor: "May shade commitments or reporting to close a deal or hit a target.",
    midDescriptor: "Acts honestly and transparently in routine deal-making and reporting.",
    highDescriptor: "Consistently upholds transparency and honesty even when it costs a deal or a target.",
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
  {
    id: "attention-to-detail",
    name: "Attention to Detail",
    definition:
      "The tendency to catch discrepancies in output, logs, or materials before they cause downstream issues.",
    benchmarkScore: 73,
    lowDescriptor: "Discrepancies in output or logs are often missed until they cause a problem.",
    midDescriptor: "Catches most discrepancies during routine checks with only occasional oversight.",
    highDescriptor: "Consistently catches subtle discrepancies before they can escalate into larger issues.",
  },
  {
    id: "resource-management",
    name: "Resource Management",
    definition:
      "The ability to allocate manpower, materials, and equipment efficiently across shifts and tasks.",
    benchmarkScore: 70,
    lowDescriptor: "Resource allocation is often uneven, leading to bottlenecks or idle capacity.",
    midDescriptor: "Allocates manpower and materials reasonably well across routine shifts.",
    highDescriptor: "Optimizes resource allocation proactively, minimizing bottlenecks and waste.",
  },
  {
    id: "conflict-resolution",
    name: "Conflict Resolution",
    definition:
      "The ability to address interpersonal friction or disputes within the team before they affect output.",
    benchmarkScore: 69,
    lowDescriptor: "Avoids or escalates conflict rather than resolving it directly.",
    midDescriptor: "Addresses routine team conflicts directly and restores working relationships.",
    highDescriptor: "Resolves conflict early and skillfully, often preventing disputes from affecting output.",
  },
  {
    id: "initiative",
    name: "Initiative",
    definition:
      "The tendency to identify and act on improvement opportunities without being directed to do so.",
    benchmarkScore: 68,
    lowDescriptor: "Waits for direction rather than acting on visible improvement opportunities.",
    midDescriptor: "Acts on clear improvement opportunities without needing much prompting.",
    highDescriptor: "Proactively identifies and pursues improvements well beyond what is asked.",
  },
  {
    id: "quality-orientation",
    name: "Quality Orientation",
    definition:
      "The tendency to hold output to a consistent quality standard regardless of time pressure.",
    benchmarkScore: 74,
    lowDescriptor: "Quality standards slip noticeably when under time pressure.",
    midDescriptor: "Maintains quality standards in routine operations with reasonable consistency.",
    highDescriptor: "Holds output to a high, consistent quality standard even under significant time pressure.",
  },
  {
    id: "technical-process-knowledge",
    name: "Technical & Process Knowledge",
    definition:
      "The depth of understanding of equipment, systems, and standard operating procedures relevant to the site.",
    benchmarkScore: 72,
    lowDescriptor: "Has gaps in process or equipment knowledge that require frequent support.",
    midDescriptor: "Applies process and equipment knowledge correctly in routine situations.",
    highDescriptor: "Applies deep process and equipment knowledge to resolve non-routine issues independently.",
  },
  {
    id: "stress-tolerance",
    name: "Stress Tolerance",
    definition:
      "The capacity to maintain composure and sound judgment during high-pressure or high-volume periods.",
    benchmarkScore: 67,
    lowDescriptor: "Composure and judgment noticeably decline during high-pressure periods.",
    midDescriptor: "Maintains composure through routine pressure with generally sound judgment.",
    highDescriptor: "Stays composed and clear-headed even during sustained high-pressure periods.",
  },
  {
    id: "accountability",
    name: "Accountability",
    definition:
      "The tendency to take ownership of outcomes, including shortfalls, and follow through on commitments.",
    benchmarkScore: 76,
    lowDescriptor: "Deflects responsibility for shortfalls or leaves commitments unfinished.",
    midDescriptor: "Takes ownership of routine outcomes and generally follows through on commitments.",
    highDescriptor: "Consistently owns outcomes, including setbacks, and follows through without prompting.",
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
  {
    id: "time-management",
    name: "Time Management",
    definition:
      "The ability to prioritize deliverables and meet reporting deadlines across concurrent workstreams.",
    benchmarkScore: 72,
    lowDescriptor: "Deadlines slip when multiple deliverables compete for attention.",
    midDescriptor: "Manages routine deadlines reliably across a normal workload.",
    highDescriptor: "Prioritizes concurrent deliverables skillfully and consistently beats deadlines.",
  },
  {
    id: "stakeholder-management",
    name: "Stakeholder Management",
    definition:
      "The ability to manage expectations and build trust with business partners who rely on financial output.",
    benchmarkScore: 70,
    lowDescriptor: "Stakeholder expectations are often misaligned with what is actually delivered.",
    midDescriptor: "Manages routine stakeholder expectations and keeps relationships productive.",
    highDescriptor: "Builds strong trust with stakeholders and proactively manages expectations on complex asks.",
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment",
    definition:
      "The ability to identify and quantify financial or operational risk embedded in a decision or forecast.",
    benchmarkScore: 75,
    lowDescriptor: "Overlooks meaningful risk factors when evaluating decisions or forecasts.",
    midDescriptor: "Identifies common risk factors and incorporates them into routine analysis.",
    highDescriptor: "Surfaces non-obvious risk factors early and quantifies their impact with precision.",
  },
  {
    id: "systems-proficiency",
    name: "Systems Proficiency",
    definition:
      "The ability to work efficiently within financial systems, spreadsheets, and reporting tools.",
    benchmarkScore: 69,
    lowDescriptor: "Relies on manual workarounds; slow to adopt available systems and tools.",
    midDescriptor: "Uses standard financial systems and tools efficiently for routine tasks.",
    highDescriptor: "Leverages systems and tools fluently, building efficiencies others don't think to use.",
  },
  {
    id: "business-acumen",
    name: "Business Acumen",
    definition:
      "The depth of understanding of how the broader business operates and where financial results connect to it.",
    benchmarkScore: 71,
    lowDescriptor: "Sees financial results in isolation from the operating business.",
    midDescriptor: "Connects financial results to core business drivers in routine analysis.",
    highDescriptor: "Consistently ties financial results to business strategy and anticipates operational impact.",
  },
  {
    id: "collaboration",
    name: "Collaboration",
    definition:
      "The tendency to work productively with cross-functional teams on shared financial deliverables.",
    benchmarkScore: 73,
    lowDescriptor: "Tends to work in isolation, creating friction on cross-functional deliverables.",
    midDescriptor: "Collaborates effectively with cross-functional partners on routine deliverables.",
    highDescriptor: "Actively strengthens cross-functional collaboration, often becoming the go-to connector.",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    definition:
      "The ability to adjust analytical approach when priorities, tools, or reporting requirements shift.",
    benchmarkScore: 68,
    lowDescriptor: "Struggles to adjust when reporting requirements or priorities shift unexpectedly.",
    midDescriptor: "Adjusts to shifting priorities or requirements with some support.",
    highDescriptor: "Adapts quickly to shifting requirements without losing analytical rigor.",
  },
  {
    id: "initiative",
    name: "Initiative",
    definition:
      "The tendency to surface insights or improvements proactively rather than only responding to requests.",
    benchmarkScore: 70,
    lowDescriptor: "Delivers only what is explicitly requested, rarely surfacing extra insight.",
    midDescriptor: "Occasionally surfaces useful insights beyond what was explicitly requested.",
    highDescriptor: "Proactively surfaces insights and improvements well beyond the original request.",
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
    clientCompany: "PT Adhimix Precast",
    hrContact: "Siti Rahayu, HR Business Partner",
    roleBenchmarkScore: 70,
    normGroupDescription: "Indonesian working adults, managerial level, n=1,240",
    competencyScores: [82, 71, 65, 78, 60, 74, 69, 76, 73, 58, 80, 66, 72, 84],
  },
  {
    candidateName: "Dewi Anggraini",
    candidateId: "DEUS-2026-08422",
    positionApplied: "Area Sales Manager",
    assessmentDate: "2026-07-29",
    clientCompany: "PT Adhimix Precast",
    hrContact: "Siti Rahayu, HR Business Partner",
    roleBenchmarkScore: 70,
    normGroupDescription: "Indonesian working adults, managerial level, n=1,240",
    competencyScores: [91, 85, 84, 88, 90, 86, 87, 92, 84, 81, 89, 85, 79, 93],
  },
  {
    candidateName: "Rizky Pratama",
    candidateId: "DEUS-2026-08423",
    positionApplied: "Ops Supervisor",
    assessmentDate: "2026-07-30",
    clientCompany: "PT Adhimix Precast",
    hrContact: "Ahmad Fauzi, HR Business Partner",
    roleBenchmarkScore: 68,
    normGroupDescription: "Indonesian working adults, supervisory level, n=860",
    competencyScores: [55, 60, 48, 52, 45, 58, 50, 47, 53, 44, 58, 49, 42, 56],
  },
  {
    candidateName: "Nadia Wulandari",
    candidateId: "DEUS-2026-08424",
    positionApplied: "Finance Analyst",
    assessmentDate: "2026-07-30",
    clientCompany: "PT Adhimix Precast",
    hrContact: "Hendra Wijaya, Talent Acquisition Lead",
    roleBenchmarkScore: 74,
    normGroupDescription: "Indonesian working adults, professional/analyst level, n=980",
    competencyScores: [85, 78, 90, 76, 72, 83, 80, 84, 77, 73, 86, 81, 74, 88],
  },
  {
    candidateName: "Andi Firmansyah",
    candidateId: "DEUS-2026-08425",
    positionApplied: "Ops Supervisor",
    assessmentDate: "2026-07-31",
    clientCompany: "PT Adhimix Precast",
    hrContact: "Siti Rahayu, HR Business Partner",
    roleBenchmarkScore: 68,
    normGroupDescription: "Indonesian working adults, supervisory level, n=860",
    competencyScores: [35, 42, 38, 40, 33, 45, 37, 30, 41, 36, 44, 32, 39, 43],
  },
  {
    candidateName: "Sri Wahyuni",
    candidateId: "DEUS-2026-08426",
    positionApplied: "Area Sales Manager",
    assessmentDate: "2026-08-01",
    clientCompany: "PT Adhimix Precast",
    hrContact: "Hendra Wijaya, Talent Acquisition Lead",
    roleBenchmarkScore: 70,
    normGroupDescription: "Indonesian working adults, managerial level, n=1,240",
    competencyScores: [72, 75, 72, 73, 69, 74, 70, 70, 75, 68, 73, 70, 70, 79],
  },
  {
    candidateName: "Fajar Nugroho",
    candidateId: "DEUS-2026-08427",
    positionApplied: "Finance Analyst",
    assessmentDate: "2026-08-02",
    clientCompany: "PT Adhimix Precast",
    hrContact: "Hendra Wijaya, Talent Acquisition Lead",
    roleBenchmarkScore: 74,
    normGroupDescription: "Indonesian working adults, professional/analyst level, n=980",
    competencyScores: [58, 65, 62, 60, 55, 66, 61, 57, 63, 59, 64, 56, 60, 62],
  },
  {
    candidateName: "Putri Handayani",
    candidateId: "DEUS-2026-08428",
    positionApplied: "Ops Supervisor",
    assessmentDate: "2026-08-04",
    clientCompany: "PT Adhimix Precast",
    hrContact: "Siti Rahayu, HR Business Partner",
    roleBenchmarkScore: 68,
    normGroupDescription: "Indonesian working adults, supervisory level, n=860",
    competencyScores: [80, 74, 76, 79, 73, 78, 77, 81, 75, 79, 72, 80, 76, 78],
  },
  {
    candidateName: "Yusuf Hakim",
    candidateId: "DEUS-2026-08429",
    positionApplied: "Area Sales Manager",
    assessmentDate: "2026-08-05",
    clientCompany: "PT Adhimix Precast",
    hrContact: "Ahmad Fauzi, HR Business Partner",
    roleBenchmarkScore: 70,
    normGroupDescription: "Indonesian working adults, managerial level, n=1,240",
    competencyScores: [66, 62, 58, 64, 57, 63, 60, 65, 59, 61, 63, 58, 62, 64],
  },
  {
    candidateName: "Maya Kusuma",
    candidateId: "DEUS-2026-08430",
    positionApplied: "Finance Analyst",
    assessmentDate: "2026-08-05",
    clientCompany: "PT Adhimix Precast",
    hrContact: "Siti Rahayu, HR Business Partner",
    roleBenchmarkScore: 74,
    normGroupDescription: "Indonesian working adults, professional/analyst level, n=980",
    competencyScores: [88, 82, 87, 84, 79, 85, 86, 83, 89, 81, 84, 87, 80, 85],
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
