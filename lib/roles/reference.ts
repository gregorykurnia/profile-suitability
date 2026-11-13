import type { RoleDefinition } from "./types";

const REFERENCE_SAMPLE_SIZE = 1000;

interface ReferenceProfile {
  overallScore: number;
  competencyScores: Record<string, number>;
}

export interface RoleReferenceData {
  normAverage: number;
  competencyBenchmarks: Record<string, number>;
  overallScores: number[];
  scoresByCompetency: Record<string, number[]>;
}

function hashSeed(seed: string, parts: Array<string | number>): number {
  let hash = 2166136261;
  const input = [seed, ...parts].join("|");

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function randomUnit(seed: string, ...parts: Array<string | number>): number {
  let value = (hashSeed(seed, parts) + 0x6d2b79f5) >>> 0;
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
}

function randomInt(seed: string, min: number, max: number, ...parts: Array<string | number>): number {
  return min + Math.floor(randomUnit(seed, ...parts) * (max - min + 1));
}

function centeredVariation(
  seed: string,
  magnitude: number,
  ...parts: Array<string | number>
): number {
  const draws = Array.from({ length: 6 }, (_, index) =>
    randomUnit(seed, ...parts, index)
  );
  const centeredMean = draws.reduce((sum, value) => sum + value, 0) / draws.length - 0.5;
  return Math.round(centeredMean * magnitude * 2);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function buildRoleReferenceData(roleName: string, role: RoleDefinition): RoleReferenceData {
  const definitions = role.competencies;
  const competencyBenchmarks = Object.fromEntries(
    definitions.map((definition) => [
      definition.id,
      randomInt(role.seed, 68, 82, "competency-benchmark", roleName, definition.id),
    ])
  );
  const sample: ReferenceProfile[] = Array.from(
    { length: REFERENCE_SAMPLE_SIZE },
    (_, profileIndex) => {
      const profileCenter = clamp(
        role.populationCenter +
          centeredVariation(role.seed, 45, "reference-profile", roleName, profileIndex),
        30,
        95
      );
      const competencyScores = Object.fromEntries(
        definitions.map((definition) => {
          const roleVariation = centeredVariation(
            role.seed,
            8,
            "reference-competency",
            roleName,
            definition.id
          );
          const profileVariation = centeredVariation(
            role.seed,
            24,
            "reference-profile-competency",
            roleName,
            profileIndex,
            definition.id
          );
          return [
            definition.id,
            clamp(Math.round(profileCenter + roleVariation + profileVariation), 0, 100),
          ];
        })
      );
      const scores = Object.values(competencyScores);

      return {
        competencyScores,
        overallScore: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
      };
    }
  );

  const scoresByCompetency = Object.fromEntries(
    definitions.map((definition) => [
      definition.id,
      sample.map((profile) => profile.competencyScores[definition.id]),
    ])
  );
  const overallScores = sample.map((profile) => profile.overallScore);

  return {
    normAverage: Math.round(
      overallScores.reduce((sum, score) => sum + score, 0) / overallScores.length
    ),
    competencyBenchmarks,
    overallScores,
    scoresByCompetency,
  };
}
