"use client";

import { useEffect, useState, type ReactNode } from "react";
import LevelMark from "@/components/shell/LevelMark";
import { backFromPreview } from "@/lib/boardMemory";
import { LEVELS, levelOf } from "@/lib/levels";
import { formatDate, ordinalSuffix, signed } from "@/lib/utils";

const MOMENT_MS = 900;

// The verdict, the loudest thing on the page (J1–J4): who, the score, the level, how they compare.
// Client side only for the score moment: the numeral counts up while the pin slides along the scale.
export default function VerdictBand({
  name,
  reference,
  role,
  clientCompany,
  hrContact,
  assessed,
  produced,
  score,
  percentile,
  normGroup,
  roleAverage,
}: {
  name: string;
  reference: string;
  role: string;
  clientCompany: string;
  hrContact?: string;
  assessed: string;
  produced: string;
  score: number;
  percentile: number;
  normGroup: string;
  roleAverage: number;
}) {
  const level = levelOf(score);
  const levelInfo = LEVELS.find((l) => l.level === level)!;
  const diff = score - roleAverage;
  const counting = useScoreMoment(score, reference);
  const shown = counting ?? score;

  const facts = [
    ["Client company", clientCompany],
    ...(hrContact ? [["HR contact", hrContact]] : []),
    ["Assessed", formatDate(assessed)],
    ["Report produced", formatDate(produced)],
  ];

  return (
    <section aria-labelledby="verdict-name" className="on-dark border-t-[6px] border-strip bg-band text-band-ink">
      <div className="mx-auto grid max-w-(--max) grid-cols-[minmax(0,1fr)] px-(--gutter) py-[22px] [grid-template-areas:'who'_'numbers'_'scale'_'facts'] min-[760px]:pt-[34px] min-[760px]:pb-7 min-[760px]:[grid-template-areas:'who'_'numbers'_'facts'_'scale'] min-[1180px]:grid-cols-[minmax(0,1fr)_auto] min-[1180px]:items-end min-[1180px]:gap-x-14 min-[1180px]:[grid-template-areas:'who_numbers'_'facts_numbers'_'scale_scale']">
        <div className="min-w-0 [grid-area:who]">
          <h1
            id="verdict-name"
            className="text-(length:--t-h1) leading-[1.02] font-[750] tracking-[-0.025em] [overflow-wrap:anywhere] text-balance [font-stretch:var(--wide)]"
          >
            <bdi>{name}</bdi>
          </h1>
          <p className="mt-2 flex flex-wrap gap-x-3 text-[15px] font-medium min-[760px]:mt-3 min-[760px]:gap-x-[18px] min-[760px]:text-(length:--t-lg)">
            <span>{role}</span>
            <span>{reference}</span>
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-band-line pt-4 text-(length:--t-sm) [grid-area:facts] min-[760px]:mt-6 min-[760px]:flex min-[760px]:flex-wrap min-[760px]:gap-x-8 min-[760px]:border-0 min-[760px]:pt-0 min-[1180px]:mt-[26px] min-[1180px]:self-start">
          {facts.map(([term, value]) => (
            <div key={term} className="min-w-0">
              <dt>{term}</dt>
              <dd className="font-[650] [overflow-wrap:anywhere]">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-[18px] flex min-w-0 items-center gap-[18px] [grid-area:numbers] min-[760px]:mt-6 min-[760px]:items-end min-[760px]:gap-8 min-[1180px]:mt-0">
          <p role="img" aria-label={`Suitability ${score} out of 100`} className="flex items-start leading-[.8] text-band-accent">
            <b className="relative text-(length:--n-hero) font-[850] tracking-[-0.03em] [font-stretch:var(--narrow)]">
              <span className={counting === null ? undefined : "text-transparent"}>{score}</span>
              {counting !== null && (
                <span aria-hidden="true" className="absolute top-0 right-0">
                  {Math.round(shown)}
                </span>
              )}
            </b>
            <span className="mt-1.5 ml-2 text-base font-semibold text-band-ink min-[760px]:mt-2.5 min-[760px]:text-xl">/100</span>
          </p>
          <div className="flex min-w-0 flex-1 flex-col gap-3 min-[760px]:w-60 min-[760px]:flex-none min-[760px]:gap-4 min-[760px]:pb-1">
            <p className="inline-flex items-center gap-[9px] self-start rounded-full bg-white py-1.5 pr-3 pl-2.5 text-[14.5px] font-bold text-ink min-[760px]:py-[7px] min-[760px]:pr-[15px] min-[760px]:pl-[13px] min-[760px]:text-base min-[760px]:whitespace-nowrap">
              <LevelMark level={level} />
              {levelInfo.name}
            </p>
            <p>
              <Figure>
                {percentile}
                <sup className="relative top-[3px] ml-0.5 align-top text-[15px] font-bold [font-stretch:100%]">
                  {ordinalSuffix(percentile)}
                </sup>
              </Figure>
              <span className="mt-[3px] block text-[12.5px] min-[760px]:text-(length:--t-sm)">
                percentile: outscores {percentile}% of
              </span>
              <span className="mt-px block text-[12.5px] leading-[1.35] font-[650] [overflow-wrap:anywhere] min-[760px]:text-(length:--t-sm)">{normGroup}</span>
            </p>
            <p>
              <Figure>{diff === 0 ? "Level" : signed(diff)}</Figure>
              <span className="mt-[3px] block text-[12.5px] min-[760px]:text-(length:--t-sm)">
                {diff === 0 ? "with" : diff > 0 ? "above" : "below"} the role average of {roleAverage}
              </span>
            </p>
          </div>
        </div>

        <div aria-hidden="true" className="mt-5 [grid-area:scale] min-[760px]:mt-7">
          <div className="relative grid grid-cols-[minmax(0,45fr)_minmax(0,20fr)_minmax(0,20fr)_minmax(0,15fr)] gap-1">
            {[...LEVELS].reverse().map((l) => (
              <div
                key={l.level}
                className={`h-2 rounded-[4px] transition-opacity duration-(--d-mid) ${
                  l.level === level ? `bg-band-accent ${counting !== null ? "opacity-[.32]" : ""}` : "bg-band-soft"
                }`}
              />
            ))}
            <span
              className="absolute -top-1.5 -ml-2.5 size-5 rounded-full bg-band-accent shadow-[0_0_0_4px_var(--band)]"
              style={{ left: `${shown}%` }}
            />
          </div>
          <div className="mt-[9px] grid grid-cols-[minmax(0,45fr)_minmax(0,20fr)_minmax(0,20fr)_minmax(0,15fr)] gap-1 text-xs min-[760px]:text-[13px]">
            {[...LEVELS].reverse().map((l) => (
              <span
                key={l.level}
                className={`whitespace-nowrap last:justify-self-end min-[760px]:whitespace-normal min-[760px]:last:text-right ${
                  l.level === level ? "font-[750]" : "invisible min-[760px]:visible"
                }`}
              >
                {l.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Figure({ children }: { children: ReactNode }) {
  return (
    <b className="block text-(length:--n-lg) leading-none font-extrabold [font-stretch:var(--narrow-2)]">{children}</b>
  );
}

// Counts from 0 to the score with an ease-out curve. Returns the value while counting, null once landed.
// Skipped with reduced motion and on coming back from the PDF preview; the final state always lands even if frames stall.
function useScoreMoment(score: number, reference: string): number | null {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (backFromPreview(reference) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const p = Math.min(1, (now - start) / MOMENT_MS);
      if (p >= 1) return setValue(null);
      setValue(score * (1 - Math.pow(1 - p, 3)));
      frame = requestAnimationFrame(tick);
    });
    const land = setTimeout(() => {
      cancelAnimationFrame(frame);
      setValue(null);
    }, MOMENT_MS + 150);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(land);
    };
  }, [score, reference]);

  return value;
}
