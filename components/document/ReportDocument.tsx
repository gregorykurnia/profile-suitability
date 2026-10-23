"use client";

import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BEHAVIOUR_BANDS, bandOf, LEVELS, levelOf, standingOf, type Level } from "@/lib/levels";
import type { SuitabilityReport } from "@/lib/types";
import { formatDate, ordinalSuffix, signed } from "@/lib/utils";
import { loadDocumentFonts } from "./writePdf";
import "./a4.css";

// The report as A4 pages (design.md §5, S1, S2, S5): the preview shows them, Ctrl+P prints them and Save PDF
// copies them into a real-text PDF. Content is a run of unbreakable blocks; a heading always travels with the
// first block after it. The blocks are measured once the document's fonts have loaded, then dealt onto pages.

type Block = { key: string; node: ReactNode };

const BY_SCALE = [...LEVELS].reverse(); // lowest level first, as the scale reads left to right

function Mark({ level }: { level: Level }) {
  return (
    <span className="doc-mark">
      {[1.4, 2.2, 2.9, 3.5].map((h, i) => (
        <i key={h} className={i < level ? "on" : undefined} style={{ height: `${h}mm` }} />
      ))}
    </span>
  );
}

function blocksFor(r: SuitabilityReport): Block[] {
  const level = levelOf(r.suitabilityScore);
  const diff = r.suitabilityScore - r.roleBenchmarkScore;
  const blocks: Block[] = [];

  blocks.push({
    key: "cover",
    node: (
      <header className="doc-cover">
        <div className="doc-brand">
          {/* A plain image: Save PDF copies it from the page. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" />
          <b>PT Example</b>
          <span>Hiring assessment report</span>
        </div>
        <p className="doc-name">
          <bdi>{r.candidateName}</bdi>
        </p>
        <p className="doc-sub">
          {r.positionApplied}
          <span>{r.candidateId}</span>
        </p>
        <dl className="doc-facts">
          <div>
            <dt>Client company</dt>
            <dd>{r.clientCompany}</dd>
          </div>
          {r.hrContact && (
            <div>
              <dt>HR contact</dt>
              <dd>{r.hrContact}</dd>
            </div>
          )}
          <div>
            <dt>Assessed</dt>
            <dd>{formatDate(r.assessmentDate)}</dd>
          </div>
          <div>
            <dt>Report produced</dt>
            <dd>{formatDate(r.reportGeneratedDate)}</dd>
          </div>
        </dl>
        <div className="doc-verdict">
          <p className="doc-score">
            <b>{r.suitabilityScore}</b>
            <span>/100</span>
          </p>
          <div className="doc-vtext">
            <p className="doc-level">
              <Mark level={level} />
              {LEVELS.find((l) => l.level === level)!.name}
            </p>
            <p>
              <b>
                {r.normativePercentile}
                {ordinalSuffix(r.normativePercentile)} percentile.
              </b>{" "}
              Outscores {r.normativePercentile}% of {r.normGroupDescription}.
            </p>
            <p>
              <b>{diff === 0 ? "Level with" : `${Math.abs(diff)} points ${diff > 0 ? "above" : "below"}`}</b> the role
              average of {r.roleBenchmarkScore}.
            </p>
          </div>
        </div>
        <div className="doc-scale">
          <div className="doc-track">
            {BY_SCALE.map((l) => (
              <i key={l.level} className={l.level === level ? "on" : undefined} />
            ))}
            <span className="doc-pin" style={{ left: `${r.suitabilityScore}%` }} />
          </div>
          <div className="doc-key">
            {BY_SCALE.map((l) => (
              <span key={l.level} className={l.level === level ? "on" : undefined}>
                {l.name}
                <small>{l.range}</small>
              </span>
            ))}
          </div>
        </div>
      </header>
    ),
  });

  const insights = r.insights;
  if (insights) {
    blocks.push({
      key: "in-short",
      node: (
        <section className="doc-sec">
          <h2 className="doc-h2">In short</h2>
          <p className="doc-lead">{insights.executiveSummary}</p>
          <p className="doc-demo">Written from simulated demo data, not a real assessment result.</p>
        </section>
      ),
    });
  }

  // Biggest strength to biggest gap, as on the report.
  const rows = [...r.competencies].sort(
    (a, b) => b.score - b.benchmarkScore - (a.score - a.benchmarkScore) || a.name.localeCompare(b.name),
  );
  const scaleMax = Math.ceil(Math.max(20, ...rows.map((c) => Math.abs(c.score - c.benchmarkScore))) / 5) * 5;
  const difference = (d: number, standing: string) => (
    <span className={`doc-cd ${standing}`}>{standing === "meet" ? "Meeting" : signed(d)}</span>
  );

  rows.forEach((c, i) => {
    const d = c.score - c.benchmarkScore;
    const standing = standingOf(c.status);
    const bar = <i className={standing} style={{ width: `${Math.max(1.5, (Math.abs(d) / scaleMax) * 100)}%` }} />;
    const row = (
      <div className="doc-crow">
        <span className="doc-cn">{c.name}</span>
        <span className="doc-cf">
          {c.score}
          <small>/{c.benchmarkScore}</small>
        </span>
        <span className="doc-cp">
          {c.percentile}
          {ordinalSuffix(c.percentile)}
        </span>
        <span className="doc-half l">{d < 0 && bar}</span>
        <span className="doc-half r">{d >= 0 && bar}</span>
        {difference(d, standing)}
      </div>
    );
    blocks.push({
      key: `row-${c.id}`,
      node:
        i === 0 ? (
          <section className="doc-sec">
            <h2 className="doc-h2">Competencies</h2>
            <p className="doc-cap">
              Each score against what a {r.positionApplied} needs. “Meeting” means within 3 points.
            </p>
            <div className="doc-crow doc-chead">
              <span>Competency</span>
              <span>Score / expects</span>
              <span>Percentile</span>
              <span className="l">Below</span>
              <span className="r">Above</span>
              <span />
            </div>
            {row}
          </section>
        ) : (
          row
        ),
    });
  });

  rows.forEach((c, i) => {
    const d = c.score - c.benchmarkScore;
    const standing = standingOf(c.status);
    const band = BEHAVIOUR_BANDS.find((b) => b.band === bandOf(c.score))!;
    const descriptor = { low: c.lowDescriptor, mid: c.midDescriptor, high: c.highDescriptor }[band.band];
    const detail = (
      <article className="doc-det">
        <h3>
          <span>{c.name}</span>
          {difference(d, standing)}
        </h3>
        <p className="doc-dfig">
          Score {c.score}, {c.percentile}
          {ordinalSuffix(c.percentile)} percentile. The role expects {c.benchmarkScore}.
        </p>
        <p>
          <b>What it measures.</b> {c.definition}
        </p>
        <p>
          <b>
            {band.name} ({band.range.toLowerCase()}).
          </b>{" "}
          {descriptor}
        </p>
        <p>
          <b>On the job.</b> {c.behavioralDescriptor}
        </p>
      </article>
    );
    blocks.push({
      key: `detail-${c.id}`,
      node:
        i === 0 ? (
          <section className="doc-sec">
            <h2 className="doc-h2">Competency detail</h2>
            {detail}
          </section>
        ) : (
          detail
        ),
    });
  });

  if (insights) {
    const points = (key: string, heading: ReactNode, items: string[], dash: "up" | "down", first?: string) =>
      items.forEach((text, i) => {
        const point = (
          <p className="doc-pt">
            <span className={`doc-dash ${dash}`} />
            {text}
          </p>
        );
        blocks.push({
          key: `${key}-${i}`,
          node:
            i === 0 ? (
              <div className={first}>
                {heading}
                {point}
              </div>
            ) : (
              point
            ),
        });
      });

    points(
      "strength",
      <>
        <h2 className="doc-h2">Strengths and shortfalls</h2>
        <h3 className="doc-lh">Does well</h3>
      </>,
      insights.keyStrengths,
      "up",
      "doc-sec lists",
    );
    points("shortfall", <h3 className="doc-lh">Where they fall short</h3>, insights.developmentAreas, "down");

    insights.roleFitRisks.forEach(({ risk, mitigation }, i) => {
      const item = (
        <div className="doc-risk">
          <p>{risk}</p>
          <p>{mitigation}</p>
        </div>
      );
      blocks.push({
        key: `risk-${i}`,
        node:
          i === 0 ? (
            <div className="doc-sec lists">
              <h2 className="doc-h2">Risks in this role, and how to reduce them</h2>
              <div className="doc-rhead">
                <span>Risk</span>
                <span>How to reduce it</span>
              </div>
              {item}
            </div>
          ) : (
            item
          ),
      });
    });
  }

  blocks.push({
    key: "end",
    node: (
      <section className="doc-end">
        <div>
          <p>
            <b>About this report.</b> The written insight is based on simulated demo data and is not a real assessment
            result. Scores and benchmarks run from 0 to 100; percentiles compare the candidate with{" "}
            {r.normGroupDescription}.
          </p>
          <p>
            <b>Confidential.</b> For internal HR use only. Don&apos;t forward outside the hiring team.
          </p>
        </div>
      </section>
    ),
  });

  return blocks;
}

// Deal the measured blocks onto pages. Page 1 has no running head, so it holds more.
function paginate(measure: HTMLElement): number[][] {
  const room = (probe: string) =>
    measure.querySelector(`[data-probe="${probe}"] .doc-body`)!.getBoundingClientRect().height;
  const first = room("first");
  const rest = room("rest");
  const items = Array.from(measure.querySelector('[data-probe="flow"] .doc-body')!.children) as HTMLElement[];

  const pages: number[][] = [[]];
  let used = 0;
  let space = first;
  items.forEach((el, i) => {
    const full = el.getBoundingClientRect().height;
    const top = parseFloat(getComputedStyle(el).paddingTop) || 0; // dropped when the block opens a page
    let height = pages.at(-1)!.length ? full : full - top;
    if (pages.at(-1)!.length && used + height > space + 0.5) {
      pages.push([]);
      used = 0;
      space = rest;
      height = full - top;
    }
    pages.at(-1)!.push(i);
    used += height;
  });
  return pages;
}

export default function ReportDocument({
  report,
  mode,
}: {
  report: SuitabilityReport;
  // offscreen: on the report, ready for Save PDF and Ctrl+P. onscreen: the preview, scaled to fit narrow screens.
  mode: "offscreen" | "onscreen";
}) {
  const blocks = useMemo(() => blocksFor(report), [report]);
  const [pages, setPages] = useState<number[][] | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    // Off screen, wait a moment so the score moment has the device to itself.
    const start = window.setTimeout(
      async () => {
        await loadDocumentFonts();
        if (!cancelled && measureRef.current) setPages(paginate(measureRef.current));
      },
      mode === "offscreen" ? 600 : 0,
    );
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [blocks, mode]);

  if (!pages) {
    return (
      <div ref={measureRef} aria-hidden="true" className="doc doc-offscreen">
        <div className="doc-pg" data-probe="first">
          <div className="doc-body" />
          <div className="doc-foot" />
        </div>
        <div className="doc-pg" data-probe="rest">
          <div className="doc-head" />
          <div className="doc-body" />
          <div className="doc-foot" />
        </div>
        <div className="doc-pg" data-probe="flow" style={{ height: "auto" }}>
          <div className="doc-body" style={{ overflow: "visible" }}>
            {blocks.map((b) => (
              <Fragment key={b.key}>{b.node}</Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const sheets = pages.map((indexes, i) => (
    <div key={i} className="doc-pg">
      {i > 0 && (
        <div className="doc-head">
          <span>
            <bdi>{report.candidateName}</bdi>, {report.positionApplied}, {report.candidateId}
          </span>
          <span>PT Example</span>
        </div>
      )}
      <div className="doc-body">
        {indexes.map((b) => (
          <Fragment key={blocks[b].key}>{blocks[b].node}</Fragment>
        ))}
      </div>
      <div className="doc-foot">
        <span>Confidential, for internal HR use only</span>
        <span>
          Page {i + 1} of {pages.length}
        </span>
      </div>
    </div>
  ));

  if (mode === "offscreen") {
    return (
      <div data-a4="ready" aria-hidden="true" className="doc doc-offscreen">
        <div className="doc-pages">{sheets}</div>
      </div>
    );
  }
  return <FittedPages>{sheets}</FittedPages>;
}

// On screens narrower than A4 the pages are scaled down as a whole. A transform leaves the layout (and so the
// PDF copied from it) exactly as on a wide screen.
function FittedPages({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ scale: number; width: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const available = outer.current!.parentElement!.clientWidth;
      const width = inner.current!.offsetWidth;
      const scale = Math.min(1, available / width);
      setFit({ scale, width: width * scale, height: inner.current!.offsetHeight * scale });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={outer}
      data-a4="ready"
      className="doc doc-onscreen mx-auto overflow-hidden"
      style={fit ? { width: fit.width, height: fit.height } : undefined}
    >
      <div
        ref={inner}
        className="doc-pages w-[210mm] origin-top-left"
        style={fit ? { transform: `scale(${fit.scale})` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
