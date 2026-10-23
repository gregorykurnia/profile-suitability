"use client";

import { useState } from "react";
import { ChevronIcon } from "@/components/shell/icons";
import { standingOf, type Standing } from "@/lib/levels";
import type { Competency } from "@/lib/types";
import { ordinalSuffix, signed } from "@/lib/utils";
import CompetencyFacts from "./CompetencyFacts";
import StandOut from "./StandOut";

const BAR: Record<Standing, string> = { above: "bg-above", below: "bg-below", meet: "bg-meet" };
const DELTA: Record<Standing, string> = {
  above: "text-[19px] font-extrabold text-above-text [font-stretch:var(--narrow-2)]",
  below: "text-[19px] font-extrabold text-below-text [font-stretch:var(--narrow-2)]",
  meet: "text-sm font-[650] text-ink-2",
};
// Label, below half, above half, difference, chevron. On phones the label sits above the bars.
const COLUMNS =
  "grid grid-cols-[1fr_1fr_52px_22px] items-center min-[760px]:grid-cols-[minmax(0,1fr)_150px_150px_64px_22px] min-[1180px]:grid-cols-[minmax(0,1fr)_200px_200px_76px_22px]";

// Every competency against what the role expects, biggest strength to biggest gap (C1–C3, U1–U3).
// Each row opens its detail.
export default function GapChart({ competencies, role }: { competencies: Competency[]; role: string }) {
  const rows = [...competencies].sort(
    (a, b) => b.score - b.benchmarkScore - (a.score - a.benchmarkScore) || a.name.localeCompare(b.name),
  );
  const largest = Math.max(20, ...rows.map((c) => Math.abs(c.score - c.benchmarkScore)));
  const scaleMax = Math.ceil(largest / 5) * 5;
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const allOpen = open.size === rows.length;

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  return (
    <section aria-labelledby="competencies-heading" className="min-w-0">
      <div className="mb-3.5 flex flex-wrap items-baseline gap-x-4 gap-y-2 min-[760px]:mb-[18px]">
        <h2
          id="competencies-heading"
          className="text-(length:--t-h2) leading-[1.2] font-[750] tracking-[-0.015em] [font-stretch:var(--wide)]"
        >
          Competencies
        </h2>
        <p className="basis-full text-sm text-ink-2 min-[760px]:basis-auto">
          How far each score sits from what a {role} needs
        </p>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(rows.map((c) => c.id)))}
          className="text-btn relative min-h-8 before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-[''] min-[760px]:ml-auto"
        >
          {allOpen ? "Close all details" : "Open all details"}
        </button>
      </div>

      <div className="mb-6 grid gap-2 min-[760px]:grid-cols-2 min-[760px]:gap-3">
        <StandOut competency={rows[0]} kind="strength" />
        <StandOut competency={rows[rows.length - 1]} kind="gap" />
      </div>

      <div aria-hidden="true" className={`${COLUMNS} hidden pb-2 text-(length:--t-xs) font-medium text-ink-3 min-[760px]:grid`}>
        <span />
        <span className="pr-3.5 text-right whitespace-nowrap">Below what the role expects</span>
        <span className="pl-3.5">Above</span>
        <span />
      </div>

      <ul className="border-b border-line">
        {rows.map((c) => {
          const diff = c.score - c.benchmarkScore;
          const standing = standingOf(c.status);
          const isOpen = open.has(c.id);
          const bar = (
            <i
              className={`block h-[22px] ${BAR[standing]} ${diff < 0 ? "rounded-l-[4px]" : "rounded-r-[4px]"}`}
              style={{ width: `${Math.max(2, (Math.abs(diff) / scaleMax) * 100)}%` }}
            />
          );
          return (
            <li key={c.id} className="border-t border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`detail-${c.id}`}
                onClick={() => toggle(c.id)}
                className={`${COLUMNS} min-h-[58px] w-full pb-2.5 text-left transition-colors duration-(--d-fast) hover:bg-shade focus-visible:outline-offset-[-3px] min-[760px]:pb-0 ${isOpen ? "bg-shade" : ""}`}
              >
                <span className="col-span-full min-w-0 px-1 pt-3 pb-2 min-[760px]:col-span-1 min-[760px]:py-2.5 min-[760px]:pr-5">
                  <span className="block text-[15px] leading-[1.3] font-[620] [overflow-wrap:anywhere]">{c.name}</span>
                  <small className="mt-0.5 block text-[13px] text-ink-2">
                    {c.score}, role expects {c.benchmarkScore}, {c.percentile}
                    {ordinalSuffix(c.percentile)} percentile
                  </small>
                </span>
                <span className="flex h-6 items-center justify-end border-r-2 border-ink min-[760px]:h-full">{diff < 0 && bar}</span>
                <span className="flex h-6 items-center min-[760px]:h-full">{diff >= 0 && bar}</span>
                <span className={`text-right ${DELTA[standing]}`}>
                  {standing === "meet" ? (
                    <>
                      Meeting<span className="sr"> what the role expects, within 3 points</span>
                    </>
                  ) : (
                    <>
                      {signed(diff)}
                      <span className="sr"> points {diff > 0 ? "above" : "below"} what the role expects</span>
                    </>
                  )}
                </span>
                <ChevronIcon
                  className={`mr-0.5 size-3.5 justify-self-end text-ink-3 transition-transform duration-(--d-mid) ease-(--ease) ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div id={`detail-${c.id}`} hidden={!isOpen}>
                {isOpen && <CompetencyFacts competency={c} />}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
