import type { ReactNode } from "react";
import { BEHAVIOUR_BANDS, bandOf, standingOf, type BehaviourBand } from "@/lib/levels";
import type { Competency } from "@/lib/types";
import { ordinalSuffix } from "@/lib/utils";

const RESULT_TONE = { above: "text-above-text", below: "text-below-text", meet: "text-ink-2" } as const;
const ZONE: Record<BehaviourBand, string> = {
  low: "flex-[50] bg-[#EEF1F5]",
  mid: "flex-[25] bg-[#E1E6ED]",
  high: "flex-[25] bg-[#D1D8E2]",
};

// One competency opened: its figures, what it measures, what this score looks like on the job,
// and the three behaviour bands with this score's band marked (C3, U1–U3).
export default function CompetencyFacts({ competency: c }: { competency: Competency }) {
  const diff = c.score - c.benchmarkScore;
  const distance = Math.abs(diff);
  const standing = standingOf(c.status);
  const band = bandOf(c.score);
  const result = standing === "meet" ? "Meeting" : `${standing === "above" ? "Above" : "Below"} by ${distance}`;
  const gap =
    standing !== "meet"
      ? `${distance} points ${diff > 0 ? "above" : "below"} what the role expects.`
      : diff === 0
        ? "Exactly what the role expects."
        : `${distance} point${distance === 1 ? "" : "s"} ${diff > 0 ? "above" : "below"} what the role expects, which counts as meeting it.`;
  const descriptor: Record<BehaviourBand, string> = {
    low: c.lowDescriptor,
    mid: c.midDescriptor,
    high: c.highDescriptor,
  };

  return (
    <div className="grid animate-[open-detail_var(--d-mid)_var(--ease)] gap-x-10 gap-y-5 px-1 pt-4 pb-6 min-[760px]:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] min-[760px]:pt-5 min-[760px]:pb-7">
      <dl className="col-span-full flex flex-wrap gap-x-6 gap-y-3 min-[760px]:gap-x-10">
        <Figure term="Score">{c.score}</Figure>
        <Figure term="Percentile">
          {c.percentile}
          <sup className="relative top-[3px] ml-px align-top text-sm font-bold [font-stretch:100%]">
            {ordinalSuffix(c.percentile)}
          </sup>
        </Figure>
        <Figure term="Role expects">{c.benchmarkScore}</Figure>
        <Figure term="Result" tone={RESULT_TONE[standing]}>
          {result}
        </Figure>
      </dl>

      <div className="max-w-[62ch] space-y-3 leading-(--lh-read)">
        <p>
          <b className="font-bold">What it measures.</b> {c.definition}
        </p>
        <p>
          <b className="font-bold">On the job.</b> {c.behavioralDescriptor}
        </p>
      </div>

      <div>
        <div aria-hidden="true" className="relative mt-[26px] flex h-2.5 gap-[3px]">
          {BEHAVIOUR_BANDS.map((b) => (
            <i key={b.band} className={`h-full rounded-[3px] ${ZONE[b.band]}`} />
          ))}
          <span className="absolute -top-2 -bottom-2 -ml-px w-0.5 bg-ink-2" style={{ left: `${c.benchmarkScore}%` }}>
            <em className="absolute bottom-full left-1/2 -translate-x-1/2 pb-0.5 text-xs whitespace-nowrap text-ink-2 not-italic">
              Role expects {c.benchmarkScore}
            </em>
          </span>
          <span
            className="absolute top-1/2 -mt-[9px] -ml-[9px] size-[18px] rounded-full bg-ink shadow-[0_0_0_3px_var(--paper)]"
            style={{ left: `${c.score}%` }}
          />
        </div>
        <p className="mt-3.5 text-[14.5px] font-[650]">{gap}</p>
        <ul aria-label="What scores usually mean" className="mt-3">
          {BEHAVIOUR_BANDS.map((b) => {
            const here = b.band === band;
            return (
              <li
                key={b.band}
                className={`grid gap-x-4 gap-y-1 border-t border-line-2 py-2.5 leading-[1.45] min-[760px]:grid-cols-[150px_minmax(0,1fr)] ${
                  here ? "text-[15px] text-ink" : "text-sm text-ink-2"
                }`}
              >
                <span className={`text-[13.5px] text-ink ${here ? "font-[750]" : "font-[650]"}`}>
                  {b.name}
                  <small className="block text-[12.5px] font-normal text-ink-3">{b.range}</small>
                  {here && (
                    <span className="mt-[5px] inline-block rounded-full bg-ink px-2 py-px text-xs font-[650] text-white">
                      This score, {c.score}
                    </span>
                  )}
                </span>
                <span>{descriptor[b.band]}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Figure({ term, tone = "", children }: { term: string; tone?: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-(length:--t-xs) text-ink-2">{term}</dt>
      <dd className={`text-[26px] leading-[1.05] font-[820] [font-stretch:var(--narrow-2)] min-[760px]:text-[30px] ${tone}`}>
        {children}
      </dd>
    </div>
  );
}
