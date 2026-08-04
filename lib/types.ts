export type SuitabilityLabel =
  | "Highly Suitable"
  | "Suitable"
  | "Needs Development"
  | "Not Recommended";

export type BenchmarkStatus = "Above" | "Meets" | "Below";

export interface Competency {
  id: string;
  name: string;
  definition: string;
  score: number;
  percentile: number;
  benchmarkScore: number;
  status: BenchmarkStatus;
  behavioralDescriptor: string;
  lowDescriptor: string;
  midDescriptor: string;
  highDescriptor: string;
}

export interface AIInsights {
  executiveSummary: string;
  keyStrengths: string[];
  developmentAreas: string[];
  interviewProbes: string[];
  developmentFocus: string[];
}

export interface SuitabilityReport {
  candidateName: string;
  candidateId: string;
  positionApplied: string;
  assessmentDate: string;
  reportGeneratedDate: string;
  clientCompany: string;
  clientLogo?: string;
  hrContact?: string;

  suitabilityScore: number;
  suitabilityLabel: SuitabilityLabel;
  normativePercentile: number;
  normGroupDescription: string;
  roleBenchmarkScore: number;

  competencies: Competency[];

  insights?: AIInsights;
}
