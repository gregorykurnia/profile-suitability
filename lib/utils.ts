import { BenchmarkStatus, SuitabilityLabel } from "./types";

export function labelColor(label: SuitabilityLabel): string {
  switch (label) {
    case "Highly Suitable":
      return "#0EA5B0";
    case "Suitable":
      return "#0EA5B0";
    case "Needs Development":
      return "#F59E0B";
    case "Not Recommended":
      return "#EF4444";
  }
}

export function labelBadgeClasses(label: SuitabilityLabel): string {
  switch (label) {
    case "Highly Suitable":
    case "Suitable":
      return "bg-teal/10 text-teal border-teal/30";
    case "Needs Development":
      return "bg-amber/10 text-amber border-amber/30";
    case "Not Recommended":
      return "bg-alert/10 text-alert border-alert/30";
  }
}

export function statusColor(status: BenchmarkStatus): string {
  switch (status) {
    case "Above":
      return "#0EA5B0";
    case "Meets":
      return "#F59E0B";
    case "Below":
      return "#EF4444";
  }
}

export function statusBadgeClasses(status: BenchmarkStatus): string {
  switch (status) {
    case "Above":
      return "bg-teal/10 text-teal";
    case "Meets":
      return "bg-amber/10 text-amber";
    case "Below":
      return "bg-alert/10 text-alert";
  }
}

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}
