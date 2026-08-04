"use client";

import { useState } from "react";
import { Competency } from "@/lib/types";
import CompetencyRadarChart from "./CompetencyRadarChart";
import CompetencyBarChart from "./CompetencyBarChart";
import CompetencySummaryTable from "./CompetencySummaryTable";

export default function CompetencyBreakdownSection({
  competencies,
}: {
  competencies: Competency[];
}) {
  const [view, setView] = useState<"radar" | "bar">("radar");

  return (
    <section className="bg-surface rounded-xl shadow-sm border border-divider px-8 py-8 sm:px-10 sm:py-10">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
        <h2 className="font-sans font-bold text-navy text-xl tracking-tight">
          Competency Breakdown
        </h2>
        <div className="no-print inline-flex rounded-lg border border-divider p-0.5 bg-[#F8F9FB]">
          <button
            onClick={() => setView("radar")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              view === "radar" ? "bg-navy text-white" : "text-muted hover:text-navy"
            }`}
          >
            Radar
          </button>
          <button
            onClick={() => setView("bar")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              view === "bar" ? "bg-navy text-white" : "text-muted hover:text-navy"
            }`}
          >
            Bar
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
