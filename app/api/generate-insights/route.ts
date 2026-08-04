import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { AIInsights, Competency } from "@/lib/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are a senior organizational psychologist writing a professional psychometric suitability report for a B2B HR client in Indonesia.
Write in clear, professional English. Be specific and evidence-based — reference actual competency scores and names.
Avoid generic filler. Output must be in JSON format only, no preamble.`;

interface RequestBody {
  candidateName: string;
  positionApplied: string;
  competencies: Competency[];
  suitabilityScore: number;
  normativePercentile: number;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RequestBody;
  const { candidateName, positionApplied, competencies, suitabilityScore, normativePercentile } =
    body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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
${competencyLines}

Produce a JSON object with exactly this shape:
{
  "executiveSummary": "2-3 sentence overall read on this candidate's suitability",
  "keyStrengths": ["one bullet per top-scoring competency, name the competency and reference its score"],
  "developmentAreas": ["one bullet per low-scoring competency, name the competency and reference its score"],
  "interviewProbes": ["3-5 suggested interview questions targeting development areas or ambiguous results"],
  "developmentFocus": ["bullet list of onboarding/development recommendations"]
}

Return ONLY the JSON object, no other text.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from model");
    }

    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from model response");
    }

    const insights = JSON.parse(jsonMatch[0]) as AIInsights;
    return NextResponse.json(insights);
  } catch (err) {
    console.error("generate-insights error", err);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
