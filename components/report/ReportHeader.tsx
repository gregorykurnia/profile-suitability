import { SuitabilityReport } from "@/lib/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ReportHeader({ report }: { report: SuitabilityReport }) {
  return (
    <header className="bg-surface rounded-xl shadow-sm border border-divider px-8 py-8 sm:px-10 sm:py-10">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-md bg-navy flex items-center justify-center">
              <span className="font-mono font-bold text-teal text-sm">D</span>
            </div>
            <span className="font-sans font-bold tracking-tight text-navy text-sm uppercase">
              DEUS Human Capital Services
            </span>
          </div>

          <h1 className="font-sans font-extrabold text-navy text-3xl sm:text-4xl tracking-tight">
            {report.candidateName}
          </h1>
          <p className="mt-2 text-body text-base sm:text-lg">
            Candidate for{" "}
            <span className="font-semibold text-navy">{report.positionApplied}</span>
          </p>
        </div>

        <div className="text-right shrink-0">
          <p className="text-xs uppercase tracking-wide text-muted font-semibold">
            Reference No.
          </p>
          <p className="font-mono text-sm text-navy font-medium">{report.candidateId}</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-divider grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted font-semibold">Client</p>
          <p className="text-sm text-navy font-medium mt-1">{report.clientCompany}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted font-semibold">
            Assessment Date
          </p>
          <p className="text-sm text-navy font-medium mt-1 font-mono">
            {formatDate(report.assessmentDate)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted font-semibold">
            Report Generated
          </p>
          <p className="text-sm text-navy font-medium mt-1 font-mono">
            {formatDate(report.reportGeneratedDate)}
          </p>
        </div>
        {report.hrContact && (
          <div>
            <p className="text-xs uppercase tracking-wide text-muted font-semibold">
              HR Contact
            </p>
            <p className="text-sm text-navy font-medium mt-1">{report.hrContact}</p>
          </div>
        )}
      </div>
    </header>
  );
}
