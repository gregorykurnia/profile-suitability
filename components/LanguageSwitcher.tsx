"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { locale, setLocale } = useLocale();

  const options: Locale[] = ["en", "id"];

  return (
    <div
      className={`no-print inline-flex rounded-lg p-0.5 text-xs font-semibold ${
        variant === "dark" ? "bg-white/10 border border-white/15" : "bg-[#F8F9FB] border border-divider"
      }`}
    >
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setLocale(opt)}
          className={`px-2.5 py-1 rounded-md uppercase tracking-wide transition-all ${
            locale === opt
              ? variant === "dark"
                ? "bg-white text-navy shadow-sm"
                : "bg-gradient-to-br from-navy to-navy-light text-white shadow-sm"
              : variant === "dark"
                ? "text-white/70 hover:text-white"
                : "text-muted hover:text-navy"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
