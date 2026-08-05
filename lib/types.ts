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

export interface RoleFitRisk {
  risk: string;
  mitigation: string;
}

export interface AIInsights {
  roleFitRisks: RoleFitRisk[];
  successPlan90Day: string[];
  interviewProbes: string[];
  developmentFocus: string[];
}

export const aiInsightsSchema = z.object({
  roleFitRisks: z
    .array(
      z.object({
        risk: z.string().describe("a specific risk this role may pose, grounded in a named competency and its score/status"),
        mitigation: z.string().describe("a concrete, actionable mitigation for that risk"),
      })
    )
    .describe("2-4 role fit risks derived from below-benchmark or borderline competencies, each paired with a mitigation"),
  successPlan90Day: z
    .array(z.string())
    .describe("3-5 sequenced milestones/checkpoints for the candidate's first 90 days in this role, tailored to their competency profile"),
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
