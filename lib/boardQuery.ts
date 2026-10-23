import type { SuitabilityReport } from "./types";
import { levelName, levelOf, type Level } from "./levels";

// What the board needs from a report, so the board's client code never receives the full reports.
export type BoardCandidate = Pick<
  SuitabilityReport,
  "candidateId" | "candidateName" | "positionApplied" | "suitabilityScore" | "assessmentDate"
>;

// How the board is narrowed and ordered. It lives in the URL, so the report's queue bar, the back
// button and shared links all keep it (inventory decision 5).
export const ORDERS = {
  newest: "Newest first",
  oldest: "Oldest first",
  high: "Highest score first",
  low: "Lowest score first",
  az: "Name A to Z",
  za: "Name Z to A",
} as const;

export type Order = keyof typeof ORDERS;

export interface BoardQuery {
  q: string;
  role: string; // role slug, or "all"
  level: Level | "all";
  order: Order;
  view: "board" | "list";
}

export const DEFAULT_QUERY: BoardQuery = { q: "", role: "all", level: "all", order: "newest", view: "board" };

export function roleSlug(role: string): string {
  return role.toLowerCase().replace(/\s+/g, "-");
}

type Params = Record<string, string | string[] | undefined>;

export function parseBoardQuery(params: Params | URLSearchParams, roles: string[]): BoardQuery {
  const get = (key: string) => {
    const value = params instanceof URLSearchParams ? params.get(key) : params[key];
    return (Array.isArray(value) ? value[0] : value) ?? "";
  };
  const level = Number(get("level"));
  const order = get("order");
  return {
    q: get("q"),
    role: roles.some((r) => roleSlug(r) === get("role")) ? get("role") : "all",
    level: Number.isInteger(level) && level >= 1 && level <= 4 ? (level as Level) : "all",
    order: Object.hasOwn(ORDERS, order) ? (order as Order) : "newest",
    view: get("view") === "list" ? "list" : "board",
  };
}

// Only what differs from the default goes in the URL.
export function boardQueryString(query: BoardQuery): string {
  const params = new URLSearchParams();
  for (const key of Object.keys(DEFAULT_QUERY) as (keyof BoardQuery)[]) {
    if (query[key] !== DEFAULT_QUERY[key]) params.set(key, String(query[key]));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

// Accents are ignored, so "jose" finds "José".
export function fold(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Where a search term sits in a name or reference, in the original text's positions (accents ignored), for highlighting.
export function matchRange(text: string, term: string): [number, number] | null {
  const needle = fold(term.trim());
  if (!needle) return null;
  let folded = "";
  const starts: number[] = [];
  const ends: number[] = [];
  let at = 0;
  for (const ch of text) {
    const f = fold(ch);
    for (let i = 0; i < f.length; i++) {
      starts.push(at);
      ends.push(at + ch.length);
    }
    folded += f;
    at += ch.length;
  }
  const found = folded.indexOf(needle);
  return found < 0 ? null : [starts[found], ends[found + needle.length - 1]];
}

export function matchesQuery(report: BoardCandidate, query: BoardQuery): boolean {
  const term = query.q.trim();
  if (term && !fold(report.candidateName).includes(fold(term)) && !report.candidateId.toLowerCase().includes(term.toLowerCase())) {
    return false;
  }
  if (query.role !== "all" && roleSlug(report.positionApplied) !== query.role) return false;
  if (query.level !== "all" && levelOf(report.suitabilityScore) !== query.level) return false;
  return true;
}

const compare: Record<Order, (a: BoardCandidate, b: BoardCandidate) => number> = {
  newest: (a, b) => b.assessmentDate.localeCompare(a.assessmentDate) || b.candidateId.localeCompare(a.candidateId),
  oldest: (a, b) => a.assessmentDate.localeCompare(b.assessmentDate) || a.candidateId.localeCompare(b.candidateId),
  high: (a, b) => b.suitabilityScore - a.suitabilityScore || a.candidateName.localeCompare(b.candidateName),
  low: (a, b) => a.suitabilityScore - b.suitabilityScore || a.candidateName.localeCompare(b.candidateName),
  az: (a, b) => a.candidateName.localeCompare(b.candidateName, "id"),
  za: (a, b) => b.candidateName.localeCompare(a.candidateName, "id"),
};

export function boardResults<T extends BoardCandidate>(reports: T[], query: BoardQuery): T[] {
  return reports.filter((r) => matchesQuery(r, query)).sort(compare[query.order]);
}

// The order a person steps through reports: the board's levels top to bottom, or the list as shown.
export function boardSequence<T extends BoardCandidate>(reports: T[], query: BoardQuery): T[] {
  const results = boardResults(reports, query);
  if (query.view === "list") return results;
  return ([4, 3, 2, 1] as Level[]).flatMap((level) => results.filter((r) => levelOf(r.suitabilityScore) === level));
}

// "Shift Manager, Recommended, matching “agus”, highest score first" for the queue bar.
export function queryContext(query: BoardQuery, roles: string[]): { narrowing: string; order: string } {
  const parts = [
    query.role !== "all" ? roles.find((r) => roleSlug(r) === query.role) : null,
    query.level !== "all" ? levelName(query.level) : null,
  ].filter(Boolean);
  const term = query.q.trim();
  return {
    narrowing: (parts.length ? parts.join(", ") : "All roles and levels") + (term ? `, matching “${term}”` : ""),
    order: ORDERS[query.order].toLowerCase(),
  };
}
