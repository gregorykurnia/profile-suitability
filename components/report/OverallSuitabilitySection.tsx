"use client";

import { SuitabilityReport } from "@/lib/types";
import { labelBadgeClasses, labelColor } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { dictionaries, localeOrdinal, translateLabel } from "@/lib/i18n";
import SuitabilityGauge from "./SuitabilityGauge";

export default function OverallSuitabilitySection({ report }: { report: SuitabilityReport }) {
  const { t, locale } = useLocale();
  const color = labelColor(report.suitabilityLabel);
  const diff = report.suitabilityScore - report.roleBenchmarkScore;
  const diffLabel =
    diff === 0
      ? t("report.onParWith")
      : diff > 0
        ? t("report.ptsAbove", { n: diff })
        : t("report.ptsBelow", { n: Math.abs(diff) });

  return (
    <section className="report-card px-8 py-8 sm:px-10 sm:py-10">
      <div className="flex items-center gap-2.5 mb-6">
        <span className="h-6 w-1 rounded-full bg-gradient-to-b from-teal to-navy" />
        <h2 className="font-sans font-bold text-navy text-xl tracking-tight">
          {t("report.overallSuitability")}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <SuitabilityGauge
          score={report.suitabilityScore}
          color={color}
          percentile={report.normativePercentile}
        />

        <div className="flex-1 w-full">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold shadow-sm ${labelBadgeClasses(
              report.suitabilityLabel
            )}`}
          >
            {translateLabel(dictionaries[locale], report.suitabilityLabel)}
          </span>

          <p className="mt-4 text-body leading-relaxed">
            {t("report.scoresHigherThan")}{" "}
            <span className="font-mono font-semibold text-navy">
              {report.normativePercentile}%
            </span>{" "}
            {t("report.ofCandidatesAssessed")}{" "}
            <span className="font-medium">{report.normGroupDescription}</span> {t("report.normGroup")}
          </p>

          <div className="mt-6 pt-6 border-t border-divider">
            <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">
              {t("report.roleBenchmarkComparison")}
            </p>
            <div className="space-y-2">
              <BenchmarkBar
                label={t("report.candidateScore")}
                value={report.suitabilityScore}
                color={color}
              />
              <BenchmarkBar
                label={t("report.normAverage")}
                value={report.roleBenchmarkScore}
                color="#9CA3AF"
              />
            </div>
            <p className="mt-3 text-sm text-muted">
              {t("report.candidateScoreIs")}{" "}
              <span className="font-medium text-navy">{diffLabel}</span>{" "}
              {t("report.theRoleBenchmarkOf")}{" "}
              <span className="font-mono">{report.roleBenchmarkScore}</span>, {t("report.atThe")}{" "}
              <span className="font-mono">{localeOrdinal(report.normativePercentile, locale)}</span>{" "}
              {t("report.percentile")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenchmarkBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2.5 rounded-full bg-[#EEF0F3] overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full shadow-sm"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
          }}
        />
      </div>
      <span className="font-mono text-sm text-navy w-8 text-right">{value}</span>
    </div>
  );
}
