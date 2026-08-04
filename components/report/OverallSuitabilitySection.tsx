import { SuitabilityReport } from "@/lib/types";
import { labelBadgeClasses, labelColor, ordinal } from "@/lib/utils";
import SuitabilityGauge from "./SuitabilityGauge";

export default function OverallSuitabilitySection({ report }: { report: SuitabilityReport }) {
  const color = labelColor(report.suitabilityLabel);
  const diff = report.suitabilityScore - report.roleBenchmarkScore;
  const diffLabel =
    diff === 0 ? "on par with" : diff > 0 ? `${diff} pts above` : `${Math.abs(diff)} pts below`;

  return (
    <section className="report-card px-8 py-8 sm:px-10 sm:py-10">
      <div className="flex items-center gap-2.5 mb-6">
        <span className="h-6 w-1 rounded-full bg-gradient-to-b from-teal to-navy" />
        <h2 className="font-sans font-bold text-navy text-xl tracking-tight">
          Overall Suitability
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
            {report.suitabilityLabel}
          </span>

          <p className="mt-4 text-body leading-relaxed">
            Scores higher than{" "}
            <span className="font-mono font-semibold text-navy">
              {report.normativePercentile}%
            </span>{" "}
            of candidates assessed for this role, based on the{" "}
            <span className="font-medium">{report.normGroupDescription}</span> norm group.
          </p>

          <div className="mt-6 pt-6 border-t border-divider">
            <p className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">
              Role Benchmark Comparison
            </p>
            <div className="space-y-2">
              <BenchmarkBar
                label="Candidate Score"
                value={report.suitabilityScore}
                color={color}
              />
              <BenchmarkBar
                label="Norm Average"
                value={report.roleBenchmarkScore}
                color="#9CA3AF"
              />
            </div>
            <p className="mt-3 text-sm text-muted">
              Candidate score is{" "}
              <span className="font-medium text-navy">{diffLabel}</span> the role benchmark of{" "}
              <span className="font-mono">{report.roleBenchmarkScore}</span>, at the{" "}
              <span className="font-mono">{ordinal(report.normativePercentile)}</span> percentile.
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
