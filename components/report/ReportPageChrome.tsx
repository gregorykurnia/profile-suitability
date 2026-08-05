"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function BackToCandidatesLink() {
  const { t } = useLocale();
  return (
    <Link
      href="/"
      className="no-print inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-navy transition-colors"
    >
      <ArrowLeft size={15} /> {t("report.backToCandidates")}
    </Link>
  );
}

export function ReportFooter() {
  const { t } = useLocale();
  return (
    <footer className="text-center text-xs text-muted pt-6 pb-2">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1 w-1 rounded-full bg-red" />
        {t("common.confidentialFooter", { year: new Date().getFullYear() })}
      </span>
    </footer>
  );
}
