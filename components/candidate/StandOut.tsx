import type { Competency } from "@/lib/types";
import { signed } from "@/lib/utils";

// Biggest strength (green) and biggest gap (amber). Grey when nothing is more than 3 points above / below (C2).
export default function StandOut({ competency, kind }: { competency: Competency; kind: "strength" | "gap" }) {
  const diff = competency.score - competency.benchmarkScore;
  const figures = `${competency.score} against ${competency.benchmarkScore} expected`;
  const tone =
    kind === "strength" && diff > 3
      ? { tile: "bg-above-t", figure: "text-above-text", caption: `Biggest strength, ${figures}` }
      : kind === "gap" && diff < -3
        ? { tile: "bg-below-t", figure: "text-below-text", caption: `Biggest gap, ${figures}` }
        : kind === "strength"
          ? { tile: "bg-shade", figure: "text-ink-2", caption: `No strengths. Strongest result, ${figures}` }
          : { tile: "bg-shade", figure: "text-ink-2", caption: `No gaps. Closest to the line, ${figures}` };

  return (
    <div className={`flex min-w-0 items-center gap-3.5 rounded-tile px-4 py-3.5 ${tone.tile}`}>
      <span className={`min-w-[58px] flex-none text-[40px] leading-[.9] font-[850] [font-stretch:72%] ${tone.figure}`}>
        {signed(diff)}
      </span>
      <div className="min-w-0">
        <b className="block text-[15px] leading-[1.3] font-bold [overflow-wrap:anywhere]">{competency.name}</b>
        <span className="text-[13px] text-ink-2">{tone.caption}</span>
      </div>
    </div>
  );
}
