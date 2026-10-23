import LevelMark from "@/components/shell/LevelMark";
import { LEVELS, type Level } from "@/lib/levels";
import { formatDate } from "@/lib/utils";

// The group's standing (F7): headline, how many need a closer look, four level counts and a spread bar.
// Each count is a toggle that narrows the board to that level. Counts are always for everyone, never the narrowed list.
export default function GroupBand({
  counts,
  total,
  newest,
  level,
  onLevel,
}: {
  counts: Record<Level, number>;
  total: number;
  newest: string;
  level: Level | "all";
  onLevel: (level: Level) => void;
}) {
  const good = counts[4] + counts[3];
  const close = counts[2] + counts[1];
  const headline =
    good === total
      ? `All ${total} candidates are recommended`
      : good === 0
        ? `None of the ${total} candidates are recommended`
        : `${good} of ${total} candidates are recommended`;
  const subline = `${close ? `${close} need${close === 1 ? "s" : ""} a closer look.` : "Nobody needs a closer look."} Newest assessment ${formatDate(newest)}.`;

  return (
    <section aria-labelledby="board-heading" className="on-dark border-t-[6px] border-strip bg-band text-band-ink">
      <div className="mx-auto grid max-w-(--max) grid-cols-[minmax(0,1fr)] gap-[18px] px-(--gutter) pt-6 pb-[22px] min-[760px]:gap-6 min-[760px]:pt-9 min-[760px]:pb-[30px] min-[1180px]:grid-cols-[minmax(0,1fr)_auto] min-[1180px]:items-end min-[1180px]:gap-x-16">
        <div>
          <h1
            id="board-heading"
            className="max-w-[16ch] text-(length:--t-h1-board) leading-(--lh-tight) font-[750] tracking-[-0.025em] text-balance [font-stretch:var(--wide)]"
          >
            {headline}
          </h1>
          <p className="mt-2 text-[15px] font-medium min-[760px]:mt-3.5 min-[760px]:text-(length:--t-lg)">{subline}</p>
        </div>

        <div
          role="group"
          aria-label="Show one level"
          className="mx-[-8px] grid grid-cols-4 min-[760px]:mx-0 min-[760px]:ml-[-14px] min-[760px]:grid-cols-[repeat(4,auto)] min-[760px]:gap-x-3 min-[1180px]:ml-0"
        >
          {LEVELS.map(({ level: l, name }) => (
            <button
              key={l}
              type="button"
              aria-pressed={level === l}
              onClick={() => onLevel(l)}
              className="group flex flex-col items-start rounded-tile px-2 pt-1.5 pb-2 text-left text-band-ink transition-colors duration-(--d-fast) hover:bg-white/12 min-[760px]:px-3.5 min-[760px]:pt-2 min-[760px]:pb-2.5"
            >
              {/* Considered and Not Recommended are dimmed: large text only, 4.2:1 on the blue. */}
              <b
                className={`text-(length:--n-xl) leading-[.82] font-[850] text-band-accent [font-stretch:var(--narrow)] ${l < 3 ? "opacity-[.72]" : ""}`}
              >
                {counts[l]}
              </b>
              <span className="mt-2 flex items-center gap-[5px] border-b-[3px] border-transparent pb-1 text-xs leading-[1.25] font-semibold group-aria-pressed:border-band-accent min-[760px]:mt-3 min-[760px]:gap-2 min-[760px]:text-sm min-[760px]:whitespace-nowrap">
                <span className="hidden min-[760px]:inline-flex">
                  <LevelMark level={l} />
                </span>
                {name}
              </span>
            </button>
          ))}
        </div>

        <div aria-hidden="true" className="flex gap-1 min-[760px]:mt-0.5 min-[1180px]:col-span-full">
          {LEVELS.map(({ level: l }) =>
            counts[l] ? (
              <i
                key={l}
                className={`h-2 rounded-[4px] ${l > 2 ? "bg-band-accent" : "bg-band-soft"}`}
                style={{ flex: counts[l] }}
              />
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}

// Nothing yet: no numbers at all, just what the levels mean.
export function EmptyBoard() {
  return (
    <>
      <section aria-labelledby="board-heading" className="on-dark border-t-[6px] border-strip bg-band text-band-ink">
        <div className="mx-auto max-w-(--max) px-(--gutter) pt-6 pb-[22px] min-[760px]:pt-9 min-[760px]:pb-[30px]">
          <h1
            id="board-heading"
            className="max-w-[16ch] text-(length:--t-h1-board) leading-(--lh-tight) font-[750] tracking-[-0.025em] text-balance [font-stretch:var(--wide)]"
          >
            No candidates assessed yet
          </h1>
          <p className="mt-2 max-w-[44ch] text-[15px] font-medium min-[760px]:mt-3.5 min-[760px]:text-(length:--t-lg)">
            When an assessment is finished, the candidate appears here, grouped by how well they fit the role.
          </p>
        </div>
      </section>
      <section aria-labelledby="levels-heading" className="mx-auto max-w-(--max) px-(--gutter) pt-10 pb-20">
        <h2
          id="levels-heading"
          className="max-w-[30ch] text-(length:--t-h2) font-[750] tracking-[-0.015em] [font-stretch:var(--wide)]"
        >
          How candidates are grouped
        </h2>
        <p className="mt-2 max-w-[56ch] text-ink-2">
          Every candidate gets a suitability score out of 100 for the role they applied for. The score sets their level.
        </p>
        <ul className="mt-6 max-w-[560px]">
          {LEVELS.map(({ level, name, range }) => (
            <li key={level} className="grid grid-cols-[24px_1fr_auto] items-center gap-2.5 border-t border-line py-[13px]">
              <LevelMark level={level} />
              <b className="font-[650]">{name}</b>
              <span className="text-sm text-ink-2">{range}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
