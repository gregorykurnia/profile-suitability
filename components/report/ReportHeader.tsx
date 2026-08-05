"use client";

import { SuitabilityReport } from "@/lib/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { localeToIntl } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function formatDate(dateStr: string, intlLocale: string) {
  return new Date(dateStr).toLocaleDateString(intlLocale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ReportHeader({ report }: { report: SuitabilityReport }) {
  const { t, locale } = useLocale();
  const intlLocale = localeToIntl(locale);

  return (
    <header className="report-card no-accent overflow-hidden">
      <div
        className="relative px-8 pt-8 pb-10 sm:px-10 sm:pt-10 sm:pb-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #4a0a0f 0%, #7a0e17 45%, #b8121e 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(227,6,19,0.35), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,90,90,0.18), transparent 70%)" }}
        />

        <div className="relative flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg overflow-hidden bg-white shadow-lg shadow-red/20 ring-1 ring-white/10 shrink-0 flex items-center justify-center">
                <img
                  src="/telkom-logo.png"
                  alt="Telkom Indonesia logo"
                  className="max-w-none"
                  style={{ width: 34, height: 34, objectFit: "contain" }}
                />
              </div>
              <span className="font-sans font-bold tracking-wide text-white/90 text-sm uppercase">
                {t("common.orgName")}
              </span>
            </div>

            <h1 className="font-sans font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
              {report.candidateName}
            </h1>
            <p className="mt-2 text-white/70 text-base sm:text-lg">
              {t("report.candidateFor")}{" "}
              <span className="font-semibold text-red-light">{report.positionApplied}</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-4 shrink-0">
            <LanguageSwitcher variant="dark" />
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-white/50 font-semibold">
                {t("report.referenceNo")}
              </p>
              <p className="font-mono text-sm text-white font-medium mt-1 bg-white/10 rounded-md px-2.5 py-1 border border-white/10">
                {report.candidateId}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-6 px-8 py-6 sm:px-10">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted font-semibold">{t("report.client")}</p>
          <p className="text-sm text-navy font-medium mt-1">{report.clientCompany}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted font-semibold">
            {t("report.assessmentDate")}
          </p>
          <p className="text-sm text-navy font-medium mt-1 font-mono">
            {formatDate(report.assessmentDate, intlLocale)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted font-semibold">
            {t("report.reportGenerated")}
          </p>
          <p className="text-sm text-navy font-medium mt-1 font-mono">
            {formatDate(report.reportGeneratedDate, intlLocale)}
          </p>
        </div>
        {report.hrContact && (
          <div>
            <p className="text-xs uppercase tracking-wide text-muted font-semibold">
              {t("report.hrContact")}
            </p>
            <p className="text-sm text-navy font-medium mt-1">{report.hrContact}</p>
          </div>
        )}
      </div>
    </header>
  );
}
