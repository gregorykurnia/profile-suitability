"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { announce } from "@/components/shell/Toasts";
import {
  boardQueryString,
  boardResults,
  parseBoardQuery,
  roleSlug,
  type BoardCandidate,
  type BoardQuery,
} from "@/lib/boardQuery";
import { InstallCard } from "@/components/shell/InstallOffer";
import { rememberBoardQuery, rememberBoardState, rememberPreview, takeBoardState } from "@/lib/boardMemory";
import { levelOf, type Level } from "@/lib/levels";
import { useAvailability } from "@/lib/offline";
import BoardTools from "./BoardTools";
import GroupBand, { EmptyBoard } from "./GroupBand";
import NeedsConnection from "./NeedsConnection";
import { FilterStatus, Lanes, ListView, NoMatch, PAGE_SIZE, statusText, type RowProps } from "./BoardResults";

const CLEARED = { q: { q: "" }, role: { role: "all" }, level: { level: "all" } } as const;

// The board (F1–F7): group band, search, Role / Level / Order, By level or List. The narrowing and order live in
// the URL (replaceState: no history entry per keystroke, no server round trip), so shared links, the report's
// queue bar and the back button all keep them.
export default function Board({
  candidates,
  roles,
  initialQuery,
}: {
  candidates: BoardCandidate[];
  roles: string[];
  initialQuery: BoardQuery;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [expanded, setExpanded] = useState<Level[]>([]);
  const [pages, setPages] = useState(1);
  // Offline, a report never opened on this device shows a message here instead (A3).
  const [blocked, setBlocked] = useState<BoardCandidate | null>(null);
  const blockedFrom = useRef(0);
  const availability = useAvailability();
  const searchRef = useRef<HTMLInputElement>(null);
  const restore = useRef<{ last: string; scroll: number } | null>(null);
  const refocus = useRef(false);

  const results = useMemo(() => boardResults(candidates, query), [candidates, query]);
  const counts = useMemo(() => {
    const byLevel = { 1: 0, 2: 0, 3: 0, 4: 0 } as Record<Level, number>;
    for (const c of candidates) byLevel[levelOf(c.suitabilityScore)]++;
    return byLevel;
  }, [candidates]);
  const newest = useMemo(() => candidates.reduce((a, c) => (c.assessmentDate > a ? c.assessmentDate : a), ""), [candidates]);

  const roleName = roles.find((r) => roleSlug(r) === query.role);
  const narrowed = Boolean(query.q.trim()) || query.role !== "all" || query.level !== "all";
  const qs = boardQueryString(query);

  function update(patch: Partial<BoardQuery>) {
    const next = { ...query, ...patch };
    const string = boardQueryString(next);
    window.history.replaceState(null, "", `${window.location.pathname}${string}`);
    rememberBoardQuery(string);
    setQuery(next);
    setPages(1);
  }

  // Arriving by the browser's back button can show the page that was cached for an earlier URL: the address bar wins.
  // Then, back from a report, put the board as it was left (M1): open lanes and list pages first, scroll and focus once they render.
  useEffect(() => {
    const fromUrl = parseBoardQuery(new URLSearchParams(window.location.search), roles);
    const current = boardQueryString(fromUrl);
    if (current !== boardQueryString(initialQuery)) setQuery(fromUrl); // eslint-disable-line react-hooks/set-state-in-effect
    rememberBoardQuery(current);
    rememberPreview(null);
    const saved = takeBoardState(current);
    if (saved) {
      restore.current = { last: saved.last, scroll: saved.scroll };
      setExpanded(saved.expanded);
      setPages(saved.pages);
    }
    // Only on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const target = restore.current;
    if (!target) return;
    restore.current = null;
    window.scrollTo(0, target.scroll);
    document.querySelector<HTMLElement>(`[data-ref="${CSS.escape(target.last)}"]`)?.focus({ preventScroll: true });
  }, [expanded, pages]);

  // After a chip or pill goes away, focus stays nearby: the next chip, else the search field.
  useEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    (document.querySelector<HTMLElement>("[data-chip]") ?? searchRef.current)?.focus();
  }, [query]);

  // Filter results are announced politely, after typing settles.
  const shown = results.length;
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const timer = window.setTimeout(() => announce(statusText(shown, candidates.length, narrowed)), 500);
    return () => window.clearTimeout(timer);
  }, [shown, narrowed, candidates.length]);

  // "/" focuses search; Esc clears it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(el?.tagName ?? "")) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && el === searchRef.current && searchRef.current?.value) {
        update({ q: "" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // update() reads the current query, so the listener follows it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const href = (c: BoardCandidate) => `/report/${c.candidateId}${qs}`;
  const remember = (c: BoardCandidate) =>
    rememberBoardState({ qs, last: c.candidateId, scroll: window.scrollY, expanded, pages });
  const unreachable = (c: BoardCandidate) => availability.tag(c.candidateId) === "offline";
  const block = (c: BoardCandidate) => {
    blockedFrom.current = window.scrollY;
    setBlocked(c);
  };
  const row: RowProps = {
    term: query.q,
    href,
    tag: (c) => availability.tag(c.candidateId),
    onOpen: (c, e: MouseEvent) => {
      if (unreachable(c)) {
        e.preventDefault();
        block(c);
      } else if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) remember(c);
    },
  };

  const clear = (key: "q" | "role" | "level") => {
    refocus.current = true;
    update(CLEARED[key]);
  };
  const clearFilters = () => {
    refocus.current = true;
    update({ role: "all", level: "all" });
  };
  const clearAll = () => {
    refocus.current = true;
    update({ q: "", role: "all", level: "all" });
  };

  if (candidates.length === 0) return <EmptyBoard />;

  if (blocked) {
    return (
      <NeedsConnection
        candidate={blocked}
        onBack={() => {
          setBlocked(null);
          requestAnimationFrame(() => {
            window.scrollTo(0, blockedFrom.current);
            document.querySelector<HTMLElement>(`[data-ref="${CSS.escape(blocked.candidateId)}"]`)?.focus({ preventScroll: true });
          });
        }}
        onRetry={() => {
          if (!navigator.onLine) return announce("This report needs a connection");
          remember(blocked);
          router.push(href(blocked));
        }}
      />
    );
  }

  return (
    <>
      <GroupBand
        counts={counts}
        total={candidates.length}
        newest={newest}
        level={query.level}
        onLevel={(level) => update({ level: query.level === level ? "all" : level })}
      />
      <BoardTools query={query} roles={roles} searchRef={searchRef} onChange={update} />
      <FilterStatus
        query={query}
        roleName={roleName}
        count={shown}
        total={candidates.length}
        onClear={clear}
        onClearAll={clearAll}
      />
      {shown === 0 ? (
        <NoMatch query={query} roleName={roleName} onClear={clear} onClearFilters={clearFilters} />
      ) : query.view === "list" ? (
        <ListView
          results={results}
          pages={pages}
          row={row}
          onRowOpen={(c) => {
            if (unreachable(c)) return block(c);
            remember(c);
            router.push(href(c));
          }}
          onMore={() => {
            const firstNew = pages * PAGE_SIZE;
            setPages(pages + 1);
            requestAnimationFrame(() => document.querySelectorAll<HTMLElement>("tbody a")[firstNew]?.focus());
          }}
        />
      ) : (
        <Lanes
          results={results}
          query={query}
          expanded={expanded}
          row={row}
          onToggleLane={(level) => {
            setExpanded((list) => (list.includes(level) ? list.filter((l) => l !== level) : [...list, level]));
            requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-more="${level}"]`)?.focus());
          }}
        />
      )}
      <InstallCard />
    </>
  );
}
