import { anthropic } from "@ai-sdk/anthropic";
import { streamObject } from "ai";
import { NextRequest } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { AIInsights, aiInsightsSchema, Competency } from "@/lib/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are a senior organizational psychologist writing a professional psychometric suitability report for a B2B HR client in Indonesia.
Write in clear, professional English. Be specific and evidence-based — reference actual competency scores and names.
Avoid generic filler.`;

interface RequestBody {
  candidateId: string;
  candidateName: string;
  positionApplied: string;
  competencies: Competency[];
  suitabilityScore: number;
  normativePercentile: number;
  regenerate?: boolean;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RequestBody;
  const {
    candidateId,
    candidateName,
    positionApplied,
    competencies,
    suitabilityScore,
    normativePercentile,
    regenerate,
  } = body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const insightsRef = getDb().collection("reportInsights").doc(candidateId);

  if (!regenerate) {
    const cached = await insightsRef.get();
    if (cached.exists) {
      const parsed = aiInsightsSchema.safeParse(cached.data());
      if (parsed.success) {
        return Response.json(parsed.data as AIInsights);
      }
    }
  }

  const competencyLines = competencies
    .map(
      (c) =>
        `- ${c.name}: score ${c.score}/100 (percentile ${c.percentile}, benchmark ${c.benchmarkScore}, status ${c.status})`
    )
    .join("\n");

  const userPrompt = `Candidate: ${candidateName}
Position applied for: ${positionApplied}
Overall suitability score: ${suitabilityScore}/100
Normative percentile: ${normativePercentile}

Competency results:
${competencyLines}`;

  const result = streamObject({
    model: anthropic("claude-sonnet-4-6"),
    schema: aiInsightsSchema,
    system: SYSTEM_PROMPT,
    prompt: userPrompt,
    onFinish: async ({ object }) => {
      if (object) await insightsRef.set(object);
    },
  });

  return result.toTextStreamResponse();
}
