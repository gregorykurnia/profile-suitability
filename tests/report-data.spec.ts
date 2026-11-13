import { expect, test } from "@playwright/test";
import {
  buildReport,
  demoCandidates,
  demoRoleAssignments,
  getReportByCandidateId,
  mockReport,
  mockReports,
  reportRoles,
} from "../lib/reportMock";
import { assertDemoInsightCoverage, getDemoInsightsForReport } from "../lib/demoInsights";
import { getRoleDefinition, roleRegistry, type RoleName } from "../lib/roles";
import { buildRoleReferenceData } from "../lib/roles/reference";

test("authored candidates give board, report and PDF readers the same complete reports", () => {
  expect(demoCandidates.length).toBeGreaterThan(0);
  expect(mockReports).toHaveLength(demoCandidates.length);
  expect(mockReport).toBe(mockReports[0]);
  expect(reportRoles).toEqual([...new Set(demoCandidates.map(({ role }) => role))]);

  for (const candidate of demoCandidates) {
    const report = getReportByCandidateId(candidate.candidateId)!;
    const role = getRoleDefinition(candidate.role);
    expect(report).toBe(mockReports.find(({ candidateId }) => candidateId === candidate.candidateId));
    expect(buildReport(candidate)).toEqual(report);
    expect(report.positionApplied).toBe(candidate.role);
    expect(demoRoleAssignments[candidate.candidateId]).toBe(candidate.role);
    expect(report.normGroupDescription).toBe(role.normGroupDescription);
    expect(Object.fromEntries(report.competencies.map(({ id, score }) => [id, score])))
      .toEqual(candidate.scores);
    const ids = role.competencies.map(({ id }) => id.trim().toLowerCase());
    expect(ids.every(Boolean)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  }
  expect(getReportByCandidateId("unknown")).toBeUndefined();
});

test("benchmarks and reference populations use only their role's seed", () => {
  for (const [name, role] of Object.entries(roleRegistry)) {
    const original = buildRoleReferenceData(name, role);
    const changed = buildRoleReferenceData(name, { ...role, seed: `${role.seed}-different` });
    expect(changed.competencyBenchmarks).not.toEqual(original.competencyBenchmarks);
    expect(changed.overallScores).not.toEqual(original.overallScores);
    expect(changed.scoresByCompetency).not.toEqual(original.scoresByCompetency);
    expect(buildRoleReferenceData(name, role)).toEqual(original);
    for (const report of mockReports.filter(({ positionApplied }) => positionApplied === name)) {
      expect(report.roleBenchmarkScore).toBe(original.normAverage);
      for (const competency of report.competencies) {
        expect(competency.benchmarkScore).toBe(original.competencyBenchmarks[competency.id]);
      }
    }
  }
});

test("fixture coverage accepts varying counts and rejects missing or duplicate candidate IDs", () => {
  const ids = demoCandidates.map(({ candidateId }) => candidateId);
  expect(() => assertDemoInsightCoverage(ids)).not.toThrow();
  expect(() => assertDemoInsightCoverage(ids.slice(0, 1))).not.toThrow();
  expect(() => assertDemoInsightCoverage(ids.slice(0, -1))).not.toThrow();
  for (const duplicate of [ids[0], ids[0].toLowerCase(), ` ${ids[0]} `]) {
    expect(() => assertDemoInsightCoverage([...ids, duplicate])).toThrow(/unique/);
  }
  for (const blank of ["", "   "]) {
    expect(() => assertDemoInsightCoverage([blank])).toThrow(/non-empty/);
  }
  for (const missing of ["unknown", "constructor", "__proto__", "x".repeat(1000)]) {
    expect(() => assertDemoInsightCoverage([missing])).toThrow(/Missing demo insight fixture/);
    expect(() => getDemoInsightsForReport({ ...mockReport, candidateId: missing }, "unused"))
      .toThrow(/Missing demo insight fixture/);
  }
});

test("roles have unique canonical names and unregistered roles cannot build a report", () => {
  const names = Object.keys(roleRegistry);
  const normalized = names.map((name) => name.trim().toLowerCase());
  expect(normalized.every(Boolean)).toBe(true);
  expect(new Set(normalized).size).toBe(names.length);
  for (const unknown of ["", " ", "unknown", "constructor", "__proto__", names[0].toLowerCase(), "x".repeat(1000)]) {
    expect(() => getRoleDefinition(unknown)).toThrow(/Unregistered demo role/);
    expect(() => buildReport({ ...demoCandidates[0], role: unknown as RoleName }))
      .toThrow(/Unregistered demo role/);
  }
});

test("authored scores reject missing, extra, blank and non-finite values before calculation", () => {
  const candidate = demoCandidates[0];
  const [id, ...otherIds] = Object.keys(candidate.scores);
  const missing = Object.fromEntries(otherIds.map((key) => [key, candidate.scores[key]]));
  const invalidProfiles = [
    missing,
    { ...candidate.scores, unknown: 50 },
    { ...missing, [id.toUpperCase()]: candidate.scores[id] },
    ...[NaN, Infinity, -1, 101, "" as unknown as number, undefined as unknown as number]
      .map((value) => ({ ...candidate.scores, [id]: value })),
  ];
  for (const scores of invalidProfiles) {
    expect(() => buildReport({ ...candidate, scores })).toThrow(/Authored scores must cover exactly/);
  }
});

test("authored insight guards still reject seed, role and profile drift", () => {
  const candidate = demoCandidates[0];
  const role = getRoleDefinition(candidate.role);
  expect(() => getDemoInsightsForReport(mockReport, `${role.seed}-different`)).toThrow(/seed mismatch/);
  const otherRole = Object.keys(roleRegistry).find((name) => name !== candidate.role)!;
  expect(() => getDemoInsightsForReport({ ...mockReport, positionApplied: otherRole }, role.seed))
    .toThrow(/role mismatch/);
  const id = Object.keys(candidate.scores)[0];
  const score = candidate.scores[id];
  expect(() => buildReport({
    ...candidate,
    scores: { ...candidate.scores, [id]: score === 100 ? score - 1 : score + 1 },
  })).toThrow(/profile mismatch/);
});
