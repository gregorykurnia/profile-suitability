"use client";

import { Competency } from "@/lib/types";
import { statusBadgeClasses, statusColor } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { dictionaries, translateStatus } from "@/lib/i18n";

export default function CompetencyDetailCard({ competency }: { competency: Competency }) {
  const { t, locale } = useLocale();
  const color = statusColor(competency.status);

  return (
    <div
      className="bg-surface rounded-xl shadow-sm border border-divider px-6 py-6 sm:px-8 sm:py-8 border-l-4 transition-shadow hover:shadow-md"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-sans font-bold text-navy text-lg tracking-tight">
            {competency.name}
          </h3>
          <p className="text-sm text-muted mt-1 max-w-xl">{competency.definition}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="font-mono font-bold text-2xl text-navy">{competency.score}</p>
            <p className="text-xs text-muted font-mono">{t("report.pctPct", { pct: competency.percentile })}</p>
          </div>
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${statusBadgeClasses(
              competency.status
            )}`}
          >
            {translateStatus(dictionaries[locale], competency.status)}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative h-2 rounded-full bg-[#EEF0F3] shadow-inner">
          <div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white shadow-md"
            style={{ left: `${competency.score}%`, backgroundColor: color, boxShadow: `0 0 0 3px ${color}22` }}
          />
          <div
            className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2"
            style={{ left: `${competency.benchmarkScore}%`, backgroundColor: "#1B2B4B" }}
            title="Role benchmark"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-3">
          <p className="text-xs text-muted leading-relaxed">
            <span className="font-semibold text-navy block mb-0.5">{t("report.low")}</span>
            {competency.lowDescriptor}
          </p>
          <p className="text-xs text-muted leading-relaxed">
            <span className="font-semibold text-navy block mb-0.5">{t("report.mid")}</span>
            {competency.midDescriptor}
          </p>
          <p className="text-xs text-muted leading-relaxed">
            <span className="font-semibold text-navy block mb-0.5">{t("report.high")}</span>
            {competency.highDescriptor}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-divider">
        <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-2">
          {t("report.whatThisMeansInPractice")}
        </p>
        <p className="text-sm text-body leading-relaxed">{competency.behavioralDescriptor}</p>
      </div>
    </div>
  );
}
