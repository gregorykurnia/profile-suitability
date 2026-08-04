import { Competency } from "@/lib/types";
import { statusBadgeClasses } from "@/lib/utils";

export default function CompetencySummaryTable({ competencies }: { competencies: Competency[] }) {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-divider text-left">
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold">
              Competency
            </th>
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold">
              Score
            </th>
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold">
              Percentile
            </th>
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold">
              Benchmark
            </th>
            <th className="py-2 text-xs uppercase tracking-wide text-muted font-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {competencies.map((c) => (
            <tr key={c.id} className="border-b border-divider last:border-0">
              <td className="py-3 pr-4 font-medium text-navy">{c.name}</td>
              <td className="py-3 pr-4 font-mono text-navy">{c.score}</td>
              <td className="py-3 pr-4 font-mono text-muted">{c.percentile}th</td>
              <td className="py-3 pr-4 font-mono text-muted">{c.benchmarkScore}</td>
              <td className="py-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeClasses(
                    c.status
                  )}`}
                >
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
