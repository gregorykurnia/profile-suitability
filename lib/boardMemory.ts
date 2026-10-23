import type { Level } from "./levels";

// The board as it was left (M1): the brand link returns to the same narrowing and order, and coming back
// from a report restores open lanes, list pages, scroll position and the row that was opened.
// Kept in sessionStorage, which can be unavailable, so every access is guarded.
const QUERY_KEY = "board:query";
const STATE_KEY = "board:state";
export const BOARD_EVENT = "app:board";

export interface BoardState {
  qs: string; // the board's query string the rest belongs to
  last: string; // reference of the report that was opened
  scroll: number;
  expanded: Level[];
  pages: number;
}

function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {
    // Private windows and blocked storage: the board just isn't remembered.
  }
}

export function rememberBoardQuery(qs: string) {
  write(QUERY_KEY, qs);
  window.dispatchEvent(new CustomEvent(BOARD_EVENT, { detail: qs }));
}

export function lastBoardQuery(): string {
  return read(QUERY_KEY) ?? "";
}

export function rememberBoardState(state: BoardState) {
  write(STATE_KEY, JSON.stringify(state));
}

// Returned once: the state belongs to one trip to a report and back.
export function takeBoardState(qs: string): BoardState | null {
  const raw = read(STATE_KEY);
  if (!raw) return null;
  write(STATE_KEY, null);
  try {
    const state = JSON.parse(raw) as BoardState;
    return state.qs === qs ? state : null;
  } catch {
    return null;
  }
}

// The score moment isn't replayed when coming back to a report from its PDF preview (design.md, Motion).
const PREVIEW_KEY = "report:previewed";

export function rememberPreview(reference: string | null) {
  write(PREVIEW_KEY, reference);
}

// True once, when the report being opened is the one whose preview was just open.
export function backFromPreview(reference: string): boolean {
  const previewed = read(PREVIEW_KEY);
  write(PREVIEW_KEY, null);
  return previewed === reference;
}
