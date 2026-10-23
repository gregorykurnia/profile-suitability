import { InfoIcon } from "@/components/shell/icons";
import type { AIInsights } from "@/lib/types";

// The written insight (X1–X4), set as type rather than boxed. Every part carries the demo notice.

const H2 = "text-(length:--t-h2) leading-[1.2] font-[750] tracking-[-0.015em] [font-stretch:var(--wide)]";

function DemoTag() {
  return (
    <span className="inline-flex items-center gap-1.5 self-center rounded-full bg-shade py-[3px] pr-2.5 pl-2 text-[12.5px] font-semibold text-ink-2">
      <InfoIcon className="size-3.5" />
      Simulated demo data
    </span>
  );
}

export function InShort({ summary }: { summary: string }) {
  return (
    <section aria-labelledby="in-short-heading" className="min-w-0">
      <h2 id="in-short-heading" className="sr">
        In short
      </h2>
      <p className="max-w-[36em] text-(length:--t-lead) leading-normal font-[420] text-pretty">
        <strong className="font-[780] tracking-[-0.01em] [font-stretch:var(--wide)]">In short.</strong> {summary}
      </p>
      <p className="mt-3.5 flex items-start gap-2 text-(length:--t-sm) text-ink-2">
        <InfoIcon className="mt-0.5 size-4 flex-none" />
        <span>Written from simulated demo data, not a real assessment result.</span>
      </p>
    </section>
  );
}

export function StrengthsShortfalls({ strengths, shortfalls }: { strengths: string[]; shortfalls: string[] }) {
  const points = (items: string[], dash: string) => (
    <ul>
      {items.map((text) => (
        <li
          key={text}
          className={`relative border-t border-line py-[9px] pl-[22px] leading-(--lh-read) before:absolute before:top-5 before:left-0.5 before:h-[3px] before:w-2.5 before:rounded-[2px] ${dash}`}
        >
          {text}
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="insight-heading" className="min-w-0">
      <div className="mb-3.5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h2 id="insight-heading" className={H2}>
          Strengths and shortfalls
        </h2>
        <DemoTag />
      </div>
      <div className="grid gap-7 min-[760px]:grid-cols-2 min-[760px]:gap-8 min-[1180px]:grid-cols-1 min-[1180px]:gap-7">
        <div>
          <h3 className="pb-2 font-[750]">Does well</h3>
          {points(strengths, "before:bg-above")}
        </div>
        <div>
          <h3 className="pb-2 font-[750]">Where they fall short</h3>
          {points(shortfalls, "before:bg-below")}
        </div>
      </div>
    </section>
  );
}

export function Risks({ risks }: { risks: AIInsights["roleFitRisks"] }) {
  const label = "block text-[12.5px] font-semibold text-ink-3 min-[760px]:sr-only";
  return (
    <section aria-labelledby="risks-heading" className="mx-auto max-w-(--max) px-(--gutter) pt-4 pb-12 min-[760px]:pt-8">
      <div className="mb-3.5 flex flex-wrap items-baseline gap-x-4 gap-y-2 min-[760px]:mb-[18px]">
        <h2 id="risks-heading" className={H2}>
          Risks in this role, and how to reduce them
        </h2>
        <DemoTag />
      </div>
      <div
        aria-hidden="true"
        className="hidden grid-cols-2 gap-x-14 pb-2 text-(length:--t-xs) font-semibold text-ink-3 min-[760px]:grid"
      >
        <span>Risk</span>
        <span>How to reduce it</span>
      </div>
      <ul className="border-b border-line">
        {risks.map(({ risk, mitigation }) => (
          <li key={risk} className="grid gap-1.5 border-t border-line py-4 min-[760px]:grid-cols-2 min-[760px]:gap-x-14">
            <p className="max-w-[58ch] text-base leading-[1.45] font-[620]">
              <span className="sr">Risk: </span>
              {risk}
            </p>
            <p className="max-w-[62ch] leading-(--lh-read) text-ink-2">
              <span className={label}>How to reduce it</span>
              {mitigation}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
