"use client";

import { Competency } from "@/lib/types";
import { statusBadgeClasses } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { dictionaries, translateStatus } from "@/lib/i18n";

export default function CompetencySummaryTable({ competencies }: { competencies: Competency[] }) {
  const { t, locale } = useLocale();
  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left">
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold border-b-2 border-divider">
              {t("report.tableCompetency")}
            </th>
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold border-b-2 border-divider">
              {t("report.tableScore")}
            </th>
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold border-b-2 border-divider">
              {t("report.tablePercentile")}
            </th>
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold border-b-2 border-divider">
              {t("report.tableNormScore")}
            </th>
            <th className="py-2 text-xs uppercase tracking-wide text-muted font-semibold border-b-2 border-divider">
              {t("report.tableStatus")}
            </th>
          </tr>
        </thead>
        <tbody>
          {competencies.map((c, i) => (
            <tr
              key={c.id}
              className={`border-b border-divider last:border-0 transition-colors hover:bg-teal/5 ${
                i % 2 === 1 ? "bg-[#FAFBFD]" : ""
              }`}
            >
              <td className="py-3 pr-4 font-medium text-navy">{c.name}</td>
              <td className="py-3 pr-4 font-mono font-semibold text-navy">{c.score}</td>
              <td className="py-3 pr-4 font-mono text-muted">{t("report.pctTh", { pct: c.percentile })}</td>
              <td className="py-3 pr-4 font-mono text-muted">{c.benchmarkScore}</td>
              <td className="py-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeClasses(
                    c.status
                  )}`}
                >
                  {translateStatus(dictionaries[locale], c.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
