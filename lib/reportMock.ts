import { SuitabilityReport } from "./types";

export const mockReport: SuitabilityReport = {
  candidateName: "Budi Santoso",
  candidateId: "DEUS-2026-08421",
  positionApplied: "Area Sales Manager",
  assessmentDate: "2026-07-28",
  reportGeneratedDate: "2026-08-04",
  clientCompany: "PT Maju Bersama",
  hrContact: "Siti Rahayu, HR Business Partner",

  suitabilityScore: 74,
  suitabilityLabel: "Suitable",
  normativePercentile: 68,
  normGroupDescription: "Indonesian working adults, managerial level, n=1,240",
  roleBenchmarkScore: 75,

  competencies: [
    {
      id: "achievement-drive",
      name: "Achievement Drive",
      definition:
        "The tendency to set ambitious goals, persist through obstacles, and hold oneself to high standards of performance.",
      score: 82,
      percentile: 79,
      benchmarkScore: 75,
      status: "Above",
      behavioralDescriptor:
        "Budi consistently sets stretch targets for himself and shows strong persistence when faced with setbacks, a pattern well above what is typically required for this role.",
      lowDescriptor: "Satisfied with meeting minimum expectations; limited drive to exceed targets.",
      midDescriptor: "Works steadily toward goals and meets targets with reasonable consistency.",
      highDescriptor: "Actively seeks stretch goals and sustains effort even when facing significant obstacles.",
    },
    {
      id: "interpersonal-effectiveness",
      name: "Interpersonal Effectiveness",
      definition:
        "The ability to build rapport, read social cues, and maintain productive working relationships across stakeholders.",
      score: 71,
      percentile: 61,
      benchmarkScore: 75,
      status: "Below",
      behavioralDescriptor:
        "Budi builds workable relationships with peers and clients, though he may occasionally miss subtler social cues in higher-stakes stakeholder interactions.",
      lowDescriptor: "Struggles to build rapport; relationships are often transactional or strained.",
      midDescriptor: "Builds cooperative working relationships and generally reads social situations well.",
      highDescriptor: "Builds trust quickly across diverse stakeholders and navigates complex social dynamics with ease.",
    },
    {
      id: "analytical-thinking",
      name: "Analytical Thinking",
      definition:
        "The capacity to break down complex problems, identify patterns in data, and draw sound, logical conclusions.",
      score: 65,
      percentile: 48,
      benchmarkScore: 75,
      status: "Below",
      behavioralDescriptor:
        "Budi can work through straightforward problems methodically, but may need more time or support when handling highly complex or ambiguous data.",
      lowDescriptor: "Relies on intuition over data; may overlook important patterns or inconsistencies.",
      midDescriptor: "Breaks down moderately complex problems and generally reaches sound conclusions.",
      highDescriptor: "Rapidly dissects complex, ambiguous problems and consistently identifies non-obvious patterns.",
    },
    {
      id: "adaptability",
      name: "Adaptability",
      definition:
        "The ability to adjust approach and remain effective when facing change, ambiguity, or new demands.",
      score: 78,
      percentile: 71,
      benchmarkScore: 75,
      status: "Above",
      behavioralDescriptor:
        "Budi adjusts well to shifting priorities and market conditions, showing resilience that slightly exceeds what this role typically demands.",
      lowDescriptor: "Prefers stability and structure; becomes less effective under rapid change.",
      midDescriptor: "Adjusts to change with some support and maintains reasonable effectiveness.",
      highDescriptor: "Thrives amid ambiguity and rapidly recalibrates approach as conditions shift.",
    },
    {
      id: "leadership-presence",
      name: "Leadership Presence",
      definition:
        "The ability to inspire confidence, project authority, and influence others toward a shared direction.",
      score: 60,
      percentile: 39,
      benchmarkScore: 75,
      status: "Below",
      behavioralDescriptor:
        "Budi's leadership presence is still developing; he may need additional coaching to project the authority and influence expected of an Area Sales Manager.",
      lowDescriptor: "Rarely takes charge; struggles to project confidence or influence group direction.",
      midDescriptor: "Comfortable leading familiar teams but less assertive in unfamiliar or high-pressure settings.",
      highDescriptor: "Naturally commands the room and consistently inspires confidence across all stakeholder levels.",
    },
    {
      id: "communication-clarity",
      name: "Communication Clarity",
      definition:
        "The ability to convey ideas clearly, concisely, and persuasively across written and verbal channels.",
      score: 74,
      percentile: 65,
      benchmarkScore: 75,
      status: "Meets",
      behavioralDescriptor:
        "Budi communicates clearly in most settings and is close to the benchmark expected for this position, with room to sharpen persuasive messaging in high-stakes contexts.",
      lowDescriptor: "Messages are often unclear or require significant follow-up to be understood.",
      midDescriptor: "Communicates clearly in routine situations with generally well-structured messaging.",
      highDescriptor: "Consistently persuasive and precise, adapting message and tone fluently to any audience.",
    },
  ],
};
