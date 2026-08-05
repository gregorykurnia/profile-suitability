"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Search } from "lucide-react";
import { mockReports } from "@/lib/reportMock";
import { SuitabilityLabel } from "@/lib/types";
import { labelBadgeClasses, labelColor } from "@/lib/utils";

type SortKey = "candidateName" | "positionApplied" | "clientCompany" | "suitabilityScore" | "suitabilityLabel" | "assessmentDate";
type SortDir = "asc" | "desc";

const labelRank: Record<SuitabilityLabel, number> = {
  "Highly Suitable": 4,
  Suitable: 3,
  "Needs Development": 2,
  "Not Recommended": 1,
};

const labelFilters: SuitabilityLabel[] = ["Highly Suitable", "Suitable", "Needs Development", "Not Recommended"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const avatarPalette = ["#1b2b4b", "#0ea5b0", "#2d4470", "#0a7a83"];
function avatarColor(name: string) {
  let h = 0;
  for (const c of name) h = (h + c.charCodeAt(0)) % avatarPalette.length;
  return avatarPalette[h];
}

export default function DashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState<string | null>(null);
  const [labelFilter, setLabelFilter] = useState<SuitabilityLabel | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("assessmentDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const positions = useMemo(
    () => Array.from(new Set(mockReports.map((r) => r.positionApplied))),
    []
  );

  const totalAssessed = mockReports.length;
  const avgScore = Math.round(
    mockReports.reduce((sum, r) => sum + r.suitabilityScore, 0) / totalAssessed
  );
  const suitableCount = mockReports.filter(
    (r) => r.suitabilityLabel === "Highly Suitable" || r.suitabilityLabel === "Suitable"
  ).length;
  const needsAttentionCount = mockReports.filter(
    (r) => r.suitabilityLabel === "Needs Development" || r.suitabilityLabel === "Not Recommended"
  ).length;

  const filtered = useMemo(() => {
    return mockReports.filter((r) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q || r.candidateName.toLowerCase().includes(q) || r.candidateId.toLowerCase().includes(q);
      const matchesPosition = !positionFilter || r.positionApplied === positionFilter;
      const matchesLabel = !labelFilter || r.suitabilityLabel === labelFilter;
      return matchesSearch && matchesPosition && matchesLabel;
    });
  }, [search, positionFilter, labelFilter]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let cmp: number;
      switch (sortKey) {
        case "suitabilityScore":
          cmp = a.suitabilityScore - b.suitabilityScore;
          break;
        case "suitabilityLabel":
          cmp = labelRank[a.suitabilityLabel] - labelRank[b.suitabilityLabel];
          break;
        case "assessmentDate":
          cmp = new Date(a.assessmentDate).getTime() - new Date(b.assessmentDate).getTime();
          break;
        default:
          cmp = a[sortKey].localeCompare(b[sortKey]);
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "candidateName" || key === "positionApplied" || key === "clientCompany" ? "asc" : "desc");
    }
  }

  function sortArrow(key: SortKey) {
    if (sortKey !== key) return <span className="opacity-40">▾</span>;
    return <span className="text-[#0a7a83]">{sortDir === "asc" ? "▴" : "▾"}</span>;
  }

  const columns: { key: SortKey; label: string; align?: "right" }[] = [
    { key: "candidateName", label: "Candidate" },
    { key: "positionApplied", label: "Position Applied" },
    { key: "clientCompany", label: "Client" },
    { key: "suitabilityScore", label: "Score", align: "right" },
    { key: "suitabilityLabel", label: "Suitability" },
    { key: "assessmentDate", label: "Assessment Date" },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-[1180px] mx-auto space-y-6">
        {/* Banner */}
        <header className="report-card no-accent overflow-hidden">
          <div
            className="relative px-8 pt-8 pb-8 sm:px-10 sm:pt-10 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #16233f 0%, #1b2b4b 45%, #0f3b46 100%)",
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

            <div className="relative flex items-center gap-3 mb-6">
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

            <h1 className="relative font-sans font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
              Candidate Assessments
            </h1>
            <p className="relative mt-2 text-white/70 text-base">
              <span className="font-semibold text-teal-light">{totalAssessed} candidates</span> assessed across{" "}
              {positions.length} open roles
            </p>

            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-6 border-t border-white/10">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/50 font-semibold">Total Assessed</p>
                <p className="text-2xl font-extrabold text-white mt-1.5 font-mono">{totalAssessed}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/50 font-semibold">Avg. Suitability Score</p>
                <p className="text-2xl font-extrabold text-teal-light mt-1.5 font-mono">{avgScore}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/50 font-semibold">
                  Highly Suitable / Suitable
                </p>
                <p className="text-2xl font-extrabold text-teal-light mt-1.5 font-mono">{suitableCount}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/50 font-semibold">Needs Attention</p>
                <p className="text-2xl font-extrabold text-amber mt-1.5 font-mono">{needsAttentionCount}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by candidate name or reference no."
              className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-divider bg-white text-sm text-body focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
            />
          </div>

          <button
            onClick={() => setPositionFilter(null)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors ${
              positionFilter === null
                ? "border-teal bg-teal/10 text-[#0a7a83]"
                : "border-divider bg-white text-body hover:bg-[#F8F9FB]"
            }`}
          >
            All Roles
          </button>
          {positions.map((p) => (
            <button
              key={p}
              onClick={() => setPositionFilter(p)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                positionFilter === p
                  ? "border-teal bg-teal/10 text-[#0a7a83]"
                  : "border-divider bg-white text-body hover:bg-[#F8F9FB]"
              }`}
            >
              {p}
            </button>
          ))}

          {labelFilters.map((l) => (
            <button
              key={l}
              onClick={() => setLabelFilter(labelFilter === l ? null : l)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                labelFilter === l
                  ? "border-teal bg-teal/10 text-[#0a7a83]"
                  : "border-divider bg-white text-body hover:bg-[#F8F9FB]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: labelColor(l) }} />
              {l}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="report-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className={`text-left text-[11px] uppercase tracking-wide text-muted font-bold px-5 py-3.5 border-b border-divider whitespace-nowrap cursor-pointer select-none hover:text-navy transition-colors ${
                        col.align === "right" ? "text-right" : ""
                      } ${sortKey === col.key ? "text-[#0a7a83]" : ""}`}
                    >
                      {col.label} <span className="ml-0.5 text-[10px]">{sortArrow(col.key)}</span>
                    </th>
                  ))}
                  <th className="border-b border-divider" />
                </tr>
              </thead>
              <tbody>
                {sorted.map((r) => (
                  <tr
                    key={r.candidateId}
                    onClick={() => router.push(`/report/${r.candidateId}`)}
                    className="border-b border-divider last:border-0 cursor-pointer hover:bg-[#F8F9FB] transition-colors group"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-9 w-9 rounded-[9px] flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: avatarColor(r.candidateName) }}
                        >
                          {initials(r.candidateName)}
                        </div>
                        <div>
                          <p className="font-semibold text-navy text-sm">{r.candidateName}</p>
                          <p className="font-mono text-[11.5px] text-muted mt-0.5">{r.candidateId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-body">{r.positionApplied}</td>
                    <td className="px-5 py-3.5 text-muted">{r.clientCompany}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5 justify-end">
                        <div className="w-14 h-1.5 rounded-full bg-[#EEF0F3] overflow-hidden shadow-inner">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${r.suitabilityScore}%`,
                              background: `linear-gradient(90deg, ${labelColor(r.suitabilityLabel)}cc, ${labelColor(
                                r.suitabilityLabel
                              )})`,
                            }}
                          />
                        </div>
                        <span className="font-mono font-bold text-navy text-[15px] w-7 text-right">
                          {r.suitabilityScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${labelBadgeClasses(
                          r.suitabilityLabel
                        )}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: labelColor(r.suitabilityLabel) }} />
                        {r.suitabilityLabel}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[12.5px] text-body">{formatDate(r.assessmentDate)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <ChevronRight
                        size={16}
                        className="text-muted opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all inline-block"
                      />
                    </td>
                  </tr>
                ))}
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-muted text-sm">
                      No candidates match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-divider text-xs text-muted">
            <span>
              Showing {sorted.length} of {totalAssessed} candidates
            </span>
          </div>
        </div>

        <footer className="text-center text-xs text-muted pt-2 pb-2">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-teal" />©{" "}
            {new Date().getFullYear()} DEUS Human Capital Services. Confidential — for internal HR use only.
          </span>
        </footer>
      </div>
    </div>
  );
}
