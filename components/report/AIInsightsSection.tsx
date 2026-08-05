"use client";

import { useEffect } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { RefreshCw, Sparkles } from "lucide-react";
import { aiInsightsSchema, SuitabilityReport } from "@/lib/types";

export default function AIInsightsSection({ report }: { report: SuitabilityReport }) {
  const { object, submit, isLoading, error } = useObject({
    api: "/api/generate-insights",
    schema: aiInsightsSchema,
    initialValue: report.insights,
  });

  const insights = object ?? report.insights ?? null;
  const loading = isLoading && !insights;

  const load = (regenerate = false) =>
    submit({
      candidateId: report.candidateId,
      candidateName: report.candidateName,
      positionApplied: report.positionApplied,
      competencies: report.competencies,
      suitabilityScore: report.suitabilityScore,
      normativePercentile: report.normativePercentile,
      regenerate,
    });

  useEffect(() => {
    if (!report.insights) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="report-card px-8 py-8 sm:px-10 sm:py-10 relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, rgba(14,165,176,0.25), transparent 70%)" }}
      />
      <div className="relative flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center shadow-sm"
            style={{ background: "linear-gradient(135deg, #0ea5b0, #14c8d4)" }}
          >
            <Sparkles size={16} className="text-white" />
          </div>
          <h2 className="font-sans font-bold text-navy text-xl tracking-tight">
            AI-Generated Insights
          </h2>
        </div>
        {!loading && (
          <button
            onClick={() => load(true)}
            title="Regenerate insights"
            className="no-print p-2 rounded-lg text-muted hover:text-navy hover:bg-[#F8F9FB] transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        )}
      </div>

      {loading && <InsightsSkeleton />}

      {!loading && error && (
        <div className="text-center py-8">
          <p className="text-sm text-alert font-medium">
            {error.message ?? "Something went wrong"}
          </p>
          <button
            onClick={() => load()}
            className="no-print mt-4 inline-flex items-center gap-2 rounded-lg bg-navy text-white text-sm font-semibold px-4 py-2 hover:bg-navy/90 transition-colors"
          >
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {!loading && !error && insights && (
        <div className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">
              Role Fit Risks &amp; Mitigations
            </p>
            <ul className="space-y-3">
              {insights.roleFitRisks
                ?.filter((r): r is { risk: string; mitigation?: string } => !!r?.risk)
                .map((r, i) => (
                  <li key={i} className="text-sm text-body flex gap-2">
                    <span className="text-amber font-bold mt-0.5">–</span>
                    <span>
                      <span className="font-semibold text-navy">{r.risk}</span>
                      {r.mitigation && <span> {r.mitigation}</span>}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">
              90-Day Success Plan
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              {insights.successPlan90Day?.filter(Boolean).map((s, i) => (
                <li key={i} className="text-sm text-body">
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">
              Suggested Interview Probes
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              {insights.interviewProbes?.filter(Boolean).map((q, i) => (
                <li key={i} className="text-sm text-body">
                  {q}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">
              Onboarding &amp; Development Focus
            </p>
            <ul className="space-y-2">
              {insights.developmentFocus?.filter(Boolean).map((s, i) => (
                <li key={i} className="text-sm text-body flex gap-2">
                  <span className="text-navy font-bold mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

function InsightsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-3 bg-[#EEF0F3] rounded w-full" />
        <div className="h-3 bg-[#EEF0F3] rounded w-5/6" />
      </div>
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="space-y-2">
          <div className="h-2 bg-[#EEF0F3] rounded w-1/3 mb-3" />
          <div className="h-3 bg-[#EEF0F3] rounded w-full" />
          <div className="h-3 bg-[#EEF0F3] rounded w-4/5" />
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-[#EEF0F3] rounded w-1/3 mb-3" />
          <div className="h-3 bg-[#EEF0F3] rounded w-full" />
          <div className="h-3 bg-[#EEF0F3] rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
