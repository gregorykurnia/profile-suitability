"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { AIInsights, SuitabilityReport } from "@/lib/types";

async function fetchInsights(report: SuitabilityReport): Promise<AIInsights> {
  const res = await fetch("/api/generate-insights", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      candidateName: report.candidateName,
      positionApplied: report.positionApplied,
      competencies: report.competencies,
      suitabilityScore: report.suitabilityScore,
      normativePercentile: report.normativePercentile,
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to generate insights");
  }
  return res.json();
}

export default function AIInsightsSection({ report }: { report: SuitabilityReport }) {
  const [insights, setInsights] = useState<AIInsights | null>(report.insights ?? null);
  const [loading, setLoading] = useState(!report.insights);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchInsights(report)
      .then((data) => setInsights(data))
      .catch((err) => setError(err.message ?? "Something went wrong"))
      .finally(() => setLoading(false));
  }, [report]);

  const hasInsights = insights !== null;
  useEffect(() => {
    if (!hasInsights) {
      fetchInsights(report)
        .then((data) => setInsights(data))
        .catch((err) => setError(err.message ?? "Something went wrong"))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-surface rounded-xl shadow-sm border border-divider px-8 py-8 sm:px-10 sm:py-10">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-teal" />
          <h2 className="font-sans font-bold text-navy text-xl tracking-tight">
            AI-Generated Insights
          </h2>
        </div>
        {!loading && (
          <button
            onClick={load}
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
          <p className="text-sm text-alert font-medium">{error}</p>
          <button
            onClick={load}
            className="no-print mt-4 inline-flex items-center gap-2 rounded-lg bg-navy text-white text-sm font-semibold px-4 py-2 hover:bg-navy/90 transition-colors"
          >
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {!loading && !error && insights && (
        <div className="space-y-8">
          <p className="text-body leading-relaxed">{insights.executiveSummary}</p>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">
                Key Strengths
              </p>
              <ul className="space-y-2">
                {insights.keyStrengths.map((s, i) => (
                  <li key={i} className="text-sm text-body flex gap-2">
                    <span className="text-teal font-bold mt-0.5">+</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">
                Development Areas
              </p>
              <ul className="space-y-2">
                {insights.developmentAreas.map((s, i) => (
                  <li key={i} className="text-sm text-body flex gap-2">
                    <span className="text-amber font-bold mt-0.5">–</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">
              Suggested Interview Probes
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              {insights.interviewProbes.map((q, i) => (
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
              {insights.developmentFocus.map((s, i) => (
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
