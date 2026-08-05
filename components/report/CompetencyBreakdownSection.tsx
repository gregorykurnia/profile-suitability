"use client";

import { useState } from "react";
import { Competency } from "@/lib/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import CompetencyRadarChart from "./CompetencyRadarChart";
import CompetencyBarChart from "./CompetencyBarChart";
import CompetencySummaryTable from "./CompetencySummaryTable";

export default function CompetencyBreakdownSection({
  competencies,
}: {
  competencies: Competency[];
}) {
  const { t } = useLocale();
  const [view, setView] = useState<"radar" | "bar">("radar");

  return (
    <section className="report-card px-8 py-8 sm:px-10 sm:py-10">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <span className="h-6 w-1 rounded-full bg-gradient-to-b from-teal to-navy" />
          <h2 className="font-sans font-bold text-navy text-xl tracking-tight">
            {t("report.competencyBreakdown")}
          </h2>
        </div>
        <div className="no-print inline-flex rounded-lg border border-divider p-0.5 bg-[#F8F9FB]">
          <button
            onClick={() => setView("radar")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              view === "radar"
                ? "bg-gradient-to-br from-navy to-navy-light text-white shadow-sm"
                : "text-muted hover:text-navy"
            }`}
          >
            {t("report.radar")}
          </button>
          <button
            onClick={() => setView("bar")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              view === "bar"
                ? "bg-gradient-to-br from-navy to-navy-light text-white shadow-sm"
                : "text-muted hover:text-navy"
            }`}
          >
            {t("report.bar")}
          </button>
        </div>
      </div>

      {view === "radar" ? (
        <CompetencyRadarChart competencies={competencies} />
      ) : (
        <CompetencyBarChart competencies={competencies} />
      )}

      <CompetencySummaryTable competencies={competencies} />
    </section>
  );
}
