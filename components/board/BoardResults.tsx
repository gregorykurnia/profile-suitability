import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import LevelMark from "@/components/shell/LevelMark";
import { CloseIcon, OfflineIcon } from "@/components/shell/icons";
import { matchRange, type BoardCandidate, type BoardQuery } from "@/lib/boardQuery";
import { levelName, levelOf, LEVELS, type Level } from "@/lib/levels";
import { formatDate } from "@/lib/utils";

export const LANE_CAP = 6;
export const PAGE_SIZE = 50;

// What each of the board's results needs to open a report: where it goes, and to remember the board when it does.
export interface RowProps {
  term: string;
  href: (c: BoardCandidate) => string;
  tag: (c: BoardCandidate) => "opened" | "offline" | null;
  onOpen: (c: BoardCandidate, e: MouseEvent) => void;
}

// "Opened": seen this session (offline: kept on this device). "Needs a connection": offline and never opened.
function Tag({ kind, className = "" }: { kind: "opened" | "offline" | null; className?: string }) {
  if (!kind) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-bar bg-shade px-1.5 py-px align-[2px] text-[11.5px] font-semibold whitespace-nowrap text-ink-2 [font-stretch:100%] ${className}`}
    >
      {kind === "offline" && <OfflineIcon className="size-3" />}
      {kind === "offline" ? "Needs a connection" : "Opened"}
    </span>
  );
}

type ClearKey = "q" | "role" | "level";

// "Showing all 10 candidates" or "Showing 3 of 10 candidates" with one chip per narrowing (F6).
export function statusText(count: number, total: number, narrowed: boolean): string {
  return narrowed ? `Showing ${count} of ${total} candidates` : `Showing all ${total} candidates`;
}

export function FilterStatus({
  query,
  roleName,
  count,
  total,
  onClear,
  onClearAll,
}: {
  query: BoardQuery;
  roleName: string | undefined;
  count: number;
  total: number;
  onClear: (key: ClearKey) => void;
  onClearAll: () => void;
}) {
  const term = query.q.trim();
  const chips: { key: ClearKey; text: string; label: string }[] = [
    ...(term ? [{ key: "q" as const, text: `“${term}”`, label: `Remove search “${term}”` }] : []),
    ...(roleName ? [{ key: "role" as const, text: roleName, label: `Remove filter ${roleName}` }] : []),
    ...(query.level !== "all"
      ? [{ key: "level" as const, text: levelName(query.level), label: `Remove filter ${levelName(query.level)}` }]
      : []),
  ];

  return (
    <div className="mx-auto flex min-h-11 max-w-(--max) flex-wrap items-center gap-x-3 gap-y-2 px-(--gutter) pt-2 text-(length:--t-sm) text-ink-2 min-[760px]:pt-2.5">
      {chips.length === 0 ? (
        <p>{statusText(count, total, false)}</p>
      ) : (
        <>
          <p className="text-[14.5px] text-ink">
            Showing <b className="font-extrabold">{count}</b> of {total} candidates
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <li key={chip.key}>
                {/* The pseudo-element makes the 32px chip a 44px touch target. */}
                <button
                  type="button"
                  data-chip
                  aria-label={chip.label}
                  onClick={() => onClear(chip.key)}
                  className="relative inline-flex h-8 max-w-[260px] items-center gap-1.5 rounded-full bg-ink pr-2.5 pl-[13px] text-[13.5px] font-semibold text-white before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-[''] hover:bg-[#1E293B]"
                >
                  <span className="truncate">{chip.text}</span>
                  <CloseIcon className="size-3 flex-none" />
                </button>
              </li>
            ))}
          </ul>
          {chips.length > 1 && (
            <button type="button" className="text-btn" onClick={onClearAll}>
              Clear all
            </button>
          )}
        </>
      )}
    </div>
  );
}

// The match inside a name or reference, marked (F3). Names sit in <bdi> so right-to-left names don't disturb the line.
function Marked({ text, term }: { text: string; term: string }) {
  const range = matchRange(text, term);
  if (!range) return <bdi>{text}</bdi>;
  return (
    <bdi>
      {text.slice(0, range[0])}
      <mark>{text.slice(range[0], range[1])}</mark>
      {text.slice(range[1])}
    </bdi>
  );
}

export function NoMatch({
  query,
  roleName,
  onClear,
  onClearFilters,
}: {
  query: BoardQuery;
  roleName: string | undefined;
  onClear: (key: ClearKey) => void;
  onClearFilters: () => void;
}) {
  const term = query.q.trim();
  const filtered = Boolean(roleName) || query.level !== "all";
  const actions: { label: string; run: () => void }[] = [];
  let heading: string;
  let detail: string;

  if (term && !filtered) {
    heading = `No candidates match “${term}”`;
    detail = "Check the spelling, or try part of a reference number, such as 0147.";
    actions.push({ label: "Clear search", run: () => onClear("q") });
  } else if (!term) {
    const who = roleName ? `${roleName} candidates` : "candidates";
    heading = query.level !== "all" ? `No ${who} are ${levelName(query.level)}` : `No ${who} yet`;
    detail = "Widen the filters to see more people.";
    if (query.level !== "all") actions.push({ label: "Show all levels", run: () => onClear("level") });
    if (roleName) actions.push({ label: "Show all roles", run: () => onClear("role") });
  } else {
    heading = `No candidates match “${term}” with these filters`;
    detail = "Clear the search or the filters to see more people.";
    actions.push({ label: "Clear search", run: () => onClear("q") }, { label: "Clear filters", run: onClearFilters });
  }

  return (
    <section aria-labelledby="no-match-heading" className="mx-auto max-w-(--max) px-(--gutter) pt-10 pb-20">
      <h2
        id="no-match-heading"
        className="max-w-[30ch] text-(length:--t-h2) font-[750] tracking-[-0.015em] [overflow-wrap:anywhere] [font-stretch:var(--wide)]"
      >
        {heading}
      </h2>
      <p className="mt-2 max-w-[56ch] text-ink-2">{detail}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {actions.map((action, i) => (
          <button key={action.label} type="button" className={`btn ${i === 0 ? "btn-primary" : ""}`} onClick={action.run}>
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}

// By level (F1, F2): one lane per level, the first six candidates, then "Show all". With a level chosen only
// that lane shows, uncapped, in columns.
export function Lanes({
  results,
  query,
  expanded,
  onToggleLane,
  row,
}: {
  results: BoardCandidate[];
  query: BoardQuery;
  expanded: Level[];
  onToggleLane: (level: Level) => void;
  row: RowProps;
}) {
  const levels = query.level === "all" ? LEVELS : LEVELS.filter((l) => l.level === query.level);
  const single = levels.length === 1;
  const narrowed = Boolean(query.q.trim()) || query.role !== "all";

  return (
    <div
      className={`mx-auto grid max-w-(--max) gap-y-7 px-(--gutter) pt-2.5 pb-14 min-[760px]:gap-x-5 min-[760px]:gap-y-9 min-[760px]:pt-3.5 min-[760px]:pb-18 ${
        single ? "grid-cols-1" : "grid-cols-1 min-[760px]:grid-cols-2 min-[1180px]:grid-cols-4"
      }`}
    >
      {levels.map(({ level, name }) => {
        const inLane = results.filter((c) => levelOf(c.suitabilityScore) === level);
        const open = single || expanded.includes(level);
        const shown = open ? inLane : inLane.slice(0, LANE_CAP);
        return (
          <section key={level} aria-labelledby={`lane-${level}`}>
            <h2
              id={`lane-${level}`}
              className={`mb-1.5 flex items-center gap-[9px] border-b-2 pb-3 text-(length:--t-lg) font-[750] tracking-[-0.01em] [font-stretch:var(--wide)] ${
                level < 3 ? "border-ink-3" : "border-ink"
              }`}
            >
              <LevelMark level={level} />
              <span>{name}</span>
              <em className="ml-auto text-(length:--n-sm) font-extrabold not-italic [font-stretch:var(--narrow-2)]">
                {inLane.length}
                <span className="sr"> candidates</span>
              </em>
            </h2>
            {inLane.length ? (
              <ul className={single ? "min-[760px]:grid min-[760px]:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] min-[760px]:gap-x-7" : undefined}>
                {shown.map((c) => (
                  <li key={c.candidateId}>
                    <CandidateRow candidate={c} row={row} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-3.5 text-(length:--t-sm) text-ink-3">
                {narrowed ? "None match at this level" : "None at this level"}
              </p>
            )}
            {!single && inLane.length > LANE_CAP && (
              <button
                type="button"
                data-more={level}
                aria-expanded={open}
                onClick={() => onToggleLane(level)}
                className="min-h-(--tap) w-full px-1 text-left text-sm font-[650] underline decoration-line-2 underline-offset-4 hover:decoration-ink"
              >
                {open ? "Show fewer" : `Show all ${inLane.length}`}
              </button>
            )}
          </section>
        );
      })}
    </div>
  );
}

function CandidateRow({ candidate: c, row }: { candidate: BoardCandidate; row: RowProps }) {
  const tag = row.tag(c);
  return (
    <Link
      href={row.href(c)}
      data-ref={c.candidateId}
      onClick={(e) => row.onOpen(c, e)}
      className={`grid min-h-(--tap) grid-cols-[minmax(0,1fr)_auto] gap-x-3.5 gap-y-0.5 rounded-[2px] border-b border-line py-[13px] pr-1.5 pl-1 hover:bg-shade ${
        tag === "offline" ? "text-ink-3" : ""
      }`}
    >
      <span className="text-[15.5px] leading-[1.3] font-[650] [overflow-wrap:anywhere]">
        <Marked text={c.candidateName} term={row.term} />
        <Tag kind={tag} className="ml-2" />
      </span>
      <span className="col-start-1 text-[13px] text-ink-2">
        {c.positionApplied}, {formatDate(c.assessmentDate)}
      </span>
      <strong className="col-start-2 row-span-2 row-start-1 self-center text-(length:--n-md) leading-none font-[850] [font-stretch:var(--narrow)]">
        <span className="sr">score </span>
        {c.suitabilityScore}
      </strong>
    </Link>
  );
}

// List view: one row per candidate, the whole row opens the report, 50 at a time. On phones each row folds into
// two lines. The roles keep table semantics where the rows stop being table-shaped.
export function ListView({
  results,
  pages,
  onMore,
  row,
  onRowOpen,
}: {
  results: BoardCandidate[];
  pages: number;
  onMore: () => void;
  row: RowProps;
  onRowOpen: (c: BoardCandidate) => void;
}) {
  const shown = results.slice(0, pages * PAGE_SIZE);
  const head = "px-0 pr-3 pb-2.5 text-left text-(length:--t-xs) font-semibold text-ink-3 border-b-2 border-ink";
  return (
    <div className="mx-auto max-w-(--max) px-(--gutter) pt-3 pb-18">
      <table role="table" className="block w-full border-collapse min-[760px]:table">
        <thead role="rowgroup" className="sr-only min-[760px]:not-sr-only min-[760px]:table-header-group">
          <tr role="row" className="min-[760px]:table-row">
            <th role="columnheader" scope="col" className={head}>
              Candidate
            </th>
            <th role="columnheader" scope="col" className={head}>
              Role
            </th>
            <th role="columnheader" scope="col" className={head}>
              Level
            </th>
            <th role="columnheader" scope="col" className={`${head} text-right`}>
              Score
            </th>
            <th role="columnheader" scope="col" className={head}>
              Assessed
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup" className="block min-[760px]:table-row-group">
          {shown.map((c) => {
            const level = levelOf(c.suitabilityScore);
            const tag = row.tag(c);
            return (
              <tr
                  key={c.candidateId}
                  role="row"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a")) return;
                    onRowOpen(c);
                  }}
                  className={`grid cursor-pointer grid-cols-[minmax(0,1fr)_auto] gap-x-3.5 gap-y-0.5 border-b border-line py-3 hover:bg-shade min-[760px]:table-row min-[760px]:py-0 ${
                    tag === "offline" ? "[&_td]:text-ink-3" : ""
                  }`}
                >
                  <Cell className="col-start-1 min-[760px]:py-3 min-[760px]:pr-3">
                    <Link
                      href={row.href(c)}
                      data-ref={c.candidateId}
                      onClick={(e) => row.onOpen(c, e)}
                      className="text-[15.5px] font-[650] [overflow-wrap:anywhere]"
                    >
                      <Marked text={c.candidateName} term={row.term} />
                    </Link>
                    <span className="block text-[12.5px] text-ink-3">
                      <Marked text={c.candidateId} term={row.term} />
                    </span>
                    <Tag kind={tag} className="mt-1" />
                  </Cell>
                  <Cell className="col-start-1 text-[13px] text-ink-2 min-[760px]:py-3 min-[760px]:pr-3 min-[760px]:text-sm min-[760px]:text-ink">
                    {c.positionApplied}
                  </Cell>
                  <Cell className="col-start-1 text-[13px] text-ink-2 min-[760px]:py-3 min-[760px]:pr-3 min-[760px]:text-sm min-[760px]:text-ink">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap">
                      <LevelMark level={level} />
                      {levelName(level)}
                    </span>
                  </Cell>
                  <Cell className="col-start-2 row-span-3 row-start-1 self-center text-right text-2xl font-[850] [font-stretch:var(--narrow)] min-[760px]:w-[72px] min-[760px]:py-3 min-[760px]:pr-3">
                    <span className="sr">score </span>
                    {c.suitabilityScore}
                  </Cell>
                  <Cell phone="hidden" className="whitespace-nowrap text-ink-2 min-[760px]:w-[120px] min-[760px]:py-3 min-[760px]:text-sm">
                    {formatDate(c.assessmentDate)}
                  </Cell>
              </tr>
            );
          })}
        </tbody>
      </table>
      {results.length > shown.length && (
        <div className="flex items-center gap-4 pt-5 text-(length:--t-sm) text-ink-2">
          <p>
            Showing {shown.length} of {results.length}
          </p>
          <button type="button" className="btn" onClick={onMore}>
            Show {Math.min(PAGE_SIZE, results.length - shown.length)} more
          </button>
        </div>
      )}
    </div>
  );
}

function Cell({ phone = "block", className, children }: { phone?: "block" | "hidden"; className: string; children: ReactNode }) {
  return (
    <td role="cell" className={`${phone} min-[760px]:table-cell min-[760px]:align-middle ${className}`}>
      {children}
    </td>
  );
}
