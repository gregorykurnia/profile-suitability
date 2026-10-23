import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Candidate not found – PT Example hiring assessments" };

// Where proxy.ts sends report addresses with no candidate behind them.
export default function ReportNotFoundPage() {
  notFound();
}
