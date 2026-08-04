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
    <header className="report-card no-accent overflow-hidden">
      <div
        className="relative px-8 pt-8 pb-10 sm:px-10 sm:pt-10 sm:pb-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #16233f 0%, #1b2b4b 45%, #0f3b46 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(14,165,176,0.35), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(20,200,212,0.18), transparent 70%)" }}
        />

        <div className="relative flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg overflow-hidden shadow-lg shadow-teal/20 ring-1 ring-white/10 shrink-0">
                <img
                  src="/deus-logo.jpeg"
                  alt="DEUS logo"
                  className="max-w-none"
                  style={{ width: 126, height: 126, transform: "translate(-41px, -26px)" }}
                />
              </div>
              <span className="font-sans font-bold tracking-wide text-white/90 text-sm uppercase">
                DEUS Human Capital Services
              </span>
            </div>

            <h1 className="font-sans font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
              {report.candidateName}
            </h1>
            <p className="mt-2 text-white/70 text-base sm:text-lg">
              Candidate for{" "}
              <span className="font-semibold text-teal-light">{report.positionApplied}</span>
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-xs uppercase tracking-wide text-white/50 font-semibold">
              Reference No.
            </p>
            <p className="font-mono text-sm text-white font-medium mt-1 bg-white/10 rounded-md px-2.5 py-1 border border-white/10">
              {report.candidateId}
            </p>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-6 px-8 py-6 sm:px-10">
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
