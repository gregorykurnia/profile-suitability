import type { DefaultCompetencyName } from "../competencyFramework";
import type { BenchmarkStatus } from "../types";

type PracticalInterpretations = Record<BenchmarkStatus, string>;

export interface CompetencyDef {
  id: string;
  name: string;
  definition: string;
  sourceCompetencies: DefaultCompetencyName[];
  lowDescriptor: string;
  midDescriptor: string;
  highDescriptor: string;
  practicalInterpretations: PracticalInterpretations;
}

export interface RoleDefinition {
  competencies: CompetencyDef[];
  normGroupDescription: string;
  populationCenter: number;
  seed: string;
}
