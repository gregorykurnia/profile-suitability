import { z } from "zod";

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

export const aiInsightsSchema = z.object({
  executiveSummary: z
    .string()
    .describe("2-3 sentence overall read on this candidate's suitability"),
  keyStrengths: z
    .array(z.string())
    .describe("one bullet per top-scoring competency, name the competency and reference its score"),
  developmentAreas: z
    .array(z.string())
    .describe("one bullet per low-scoring competency, name the competency and reference its score"),
  interviewProbes: z
    .array(z.string())
    .describe("3-5 suggested interview questions targeting development areas or ambiguous results"),
  developmentFocus: z
    .array(z.string())
    .describe("bullet list of onboarding/development recommendations"),
});

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
