import en, { Dictionary } from "./dictionaries/en";
import id from "./dictionaries/id";
import { BenchmarkStatus, SuitabilityLabel } from "@/lib/types";

export type Locale = "en" | "id";

export const dictionaries: Record<Locale, Dictionary> = { en, id };

export function translateLabel(dict: Dictionary, label: SuitabilityLabel): string {
  return dict.labels[label];
}

export function translateStatus(dict: Dictionary, status: BenchmarkStatus): string {
  return dict.status[status];
}

export function localeToIntl(locale: Locale): string {
  return locale === "id" ? "id-ID" : "en-GB";
}

export function localeOrdinal(n: number, locale: Locale): string {
  if (locale === "id") return `ke-${n}`;
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}
