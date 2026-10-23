import type { BenchmarkStatus, SuitabilityLabel } from "./types";

// The four suitability levels, best fit first (decisions P1). The score sets the level.
export type Level = 1 | 2 | 3 | 4;

export const LEVELS: { level: Level; name: SuitabilityLabel; range: string; from: number }[] = [
  { level: 4, name: "Highly Recommended", range: "85 and over", from: 85 },
  { level: 3, name: "Recommended", range: "65 to 84", from: 65 },
  { level: 2, name: "Considered", range: "45 to 64", from: 45 },
  { level: 1, name: "Not Recommended", range: "Under 45", from: 0 },
];

export function levelOf(score: number): Level {
  return (LEVELS.find((l) => score >= l.from) ?? LEVELS[3]).level;
}

export function levelName(level: Level): SuitabilityLabel {
  return LEVELS.find((l) => l.level === level)!.name;
}

// Competency behaviour bands (decisions Q1).
export type BehaviourBand = "low" | "mid" | "high";

export const BEHAVIOUR_BANDS: { band: BehaviourBand; name: string; range: string }[] = [
  { band: "low", name: "Needs Improvement", range: "Under 50" },
  { band: "mid", name: "Average", range: "50 to 74" },
  { band: "high", name: "Strong", range: "75 and over" },
];

export function bandOf(score: number): BehaviourBand {
  if (score >= 75) return "high";
  if (score >= 50) return "mid";
  return "low";
}

// Colour and wording follow the benchmark status: above, meeting (within 3 points) or below.
export type Standing = "above" | "meet" | "below";

export function standingOf(status: BenchmarkStatus): Standing {
  if (status === "Above") return "above";
  if (status === "Below") return "below";
  return "meet";
}
