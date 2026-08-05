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
  executiveSummary: string;
  keyStrengths: string[];
  developmentAreas: string[];
  roleFitRisks: RoleFitRisk[];
  successPlan90Day: string[];
}

export const aiInsightsSchema = z.object({
  executiveSummary: z
    .string()
    .describe("2-3 sentence overall read on this candidate's suitability"),
  keyStrengths: z
    .array(z.string())
    .describe(
      "plain behavioral statements describing what the candidate does well, one per top-scoring competency. Do not mention competency names, scores, percentiles, or benchmark status — just the observation itself. Must have the same number of bullets as developmentAreas."
    ),
  developmentAreas: z
    .array(z.string())
    .describe(
      "plain behavioral statements describing where the candidate falls short, one per low-scoring competency. Do not mention competency names, scores, percentiles, or benchmark status — just the observation itself. Must have the same number of bullets as keyStrengths."
    ),
  roleFitRisks: z
    .array(
      z.object({
        risk: z.string().describe("a specific risk this role may pose, stated as a plain behavioral observation — do not mention competency names, scores, percentiles, or benchmark status"),
        mitigation: z.string().describe("a concrete, actionable mitigation for that risk"),
      })
    )
    .describe("2-4 role fit risks derived from below-benchmark or borderline competencies, each paired with a mitigation"),
  successPlan90Day: z
    .array(z.string())
    .describe("3-5 sequenced milestones/checkpoints for the candidate's first 90 days in this role, tailored to their competency profile"),
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
