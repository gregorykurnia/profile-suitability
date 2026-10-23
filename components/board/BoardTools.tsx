import type { RefObject } from "react";
import { ChevronIcon, SearchIcon } from "@/components/shell/icons";
import { LEVELS } from "@/lib/levels";
import { DEFAULT_QUERY, ORDERS, roleSlug, type BoardQuery } from "@/lib/boardQuery";

type Option = [value: string, label: string];

// Search (F3), the Role, Level and Order pills (F4, F5) and the view switch. The pills are native selects under
// a styled label, so phones get their own picker. Order is never "active": it doesn't hide anyone.
export default function BoardTools({
  query,
  roles,
  searchRef,
  onChange,
}: {
  query: BoardQuery;
  roles: string[];
  searchRef: RefObject<HTMLInputElement | null>;
  onChange: (patch: Partial<BoardQuery>) => void;
}) {
  return (
    <div className="mx-auto flex max-w-(--max) flex-wrap items-center gap-2 px-(--gutter) pt-4 pb-1 min-[760px]:gap-2.5 min-[760px]:pt-[22px] min-[760px]:pb-1.5">
      <label className="group order-first flex h-[46px] w-full items-center gap-2 rounded-full bg-shade pr-2 pl-4 text-ink-3 focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-ink min-[760px]:relative min-[760px]:order-none min-[760px]:h-[42px] min-[760px]:w-[340px] min-[760px]:before:absolute min-[760px]:before:inset-x-0 min-[760px]:before:-inset-y-px min-[760px]:before:content-['']">
        <SearchIcon className="size-4 flex-none" />
        <span className="sr">Search by name or reference</span>
        <input
          ref={searchRef}
          type="search"
          value={query.q}
          onChange={(e) => onChange({ q: e.target.value })}
          placeholder="Search by name or reference"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          className="h-full min-w-0 flex-1 border-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3 [&::-webkit-search-cancel-button]:cursor-pointer"
        />
        <kbd
          aria-hidden="true"
          className="hidden rounded-[5px] border border-line-2 px-1.5 py-px text-xs font-semibold group-focus-within:hidden min-[760px]:inline"
        >
          /
        </kbd>
      </label>

      <div className="mx-[calc(var(--gutter)*-1)] flex basis-full gap-2 overflow-x-auto px-(--gutter) py-0.5 [scrollbar-width:none] min-[760px]:mx-0 min-[760px]:basis-auto min-[760px]:overflow-visible min-[760px]:p-0">
        <Pill
          label="Role"
          value={query.role}
          active={query.role !== DEFAULT_QUERY.role}
          options={[["all", "All"], ...roles.map((r): Option => [roleSlug(r), r])]}
          onChange={(role) => onChange({ role })}
        />
        <Pill
          label="Level"
          value={String(query.level)}
          active={query.level !== DEFAULT_QUERY.level}
          options={[["all", "All"], ...LEVELS.map((l): Option => [String(l.level), l.name])]}
          onChange={(level) => onChange({ level: level === "all" ? "all" : (Number(level) as BoardQuery["level"]) })}
        />
        <Pill
          label="Order"
          value={query.order}
          active={false}
          options={Object.entries(ORDERS)}
          onChange={(order) => onChange({ order: order as BoardQuery["order"] })}
        />
      </div>

      <div role="group" aria-label="View" className="inline-flex rounded-full bg-shade p-1 min-[760px]:ml-auto">
        {(["board", "list"] as const).map((view) => (
          <button
            key={view}
            type="button"
            aria-pressed={query.view === view}
            onClick={() => onChange({ view })}
            className="relative h-[34px] rounded-full px-4 text-sm font-semibold text-ink-2 before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-[''] aria-pressed:bg-paper aria-pressed:text-ink aria-pressed:shadow-seg"
          >
            {view === "board" ? "By level" : "List"}
          </button>
        ))}
      </div>
    </div>
  );
}

function Pill({
  label,
  value,
  active,
  options,
  onChange,
}: {
  label: string;
  value: string;
  active: boolean;
  options: Option[];
  onChange: (value: string) => void;
}) {
  const current = options.find(([v]) => v === value)?.[1];
  return (
    <label
      className={`relative inline-flex h-10 flex-none items-center gap-1.5 rounded-full border pr-2.5 pl-[13px] text-[13.5px] font-semibold whitespace-nowrap focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-ink min-[760px]:h-[42px] min-[760px]:pr-3 min-[760px]:pl-4 min-[760px]:text-sm ${
        active ? "border-ink bg-ink text-white" : "border-line-2 bg-paper hover:bg-shade"
      }`}
    >
      <span className={`font-medium ${active ? "text-[#CBD5E1]" : "text-ink-3"}`}>{label}</span>
      <span>{current}</span>
      <ChevronIcon className="size-3.5" />
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute top-1/2 -left-px h-11 w-[calc(100%+2px)] -translate-y-1/2 cursor-pointer text-base opacity-0"
      >
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
