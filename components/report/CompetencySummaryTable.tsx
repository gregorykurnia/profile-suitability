import { Competency } from "@/lib/types";
import { statusBadgeClasses } from "@/lib/utils";

export default function CompetencySummaryTable({ competencies }: { competencies: Competency[] }) {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left">
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold border-b-2 border-divider">
              Competency
            </th>
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold border-b-2 border-divider">
              Score
            </th>
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold border-b-2 border-divider">
              Percentile
            </th>
            <th className="py-2 pr-4 text-xs uppercase tracking-wide text-muted font-semibold border-b-2 border-divider">
              Norm Score
            </th>
            <th className="py-2 text-xs uppercase tracking-wide text-muted font-semibold border-b-2 border-divider">
              Status
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
