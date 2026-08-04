"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Competency } from "@/lib/types";

export default function CompetencyBarChart({ competencies }: { competencies: Competency[] }) {
  const data = competencies.map((c) => ({
    name: c.name,
    Candidate: c.score,
    "Role Benchmark": c.benchmarkScore,
  }));

  return (
    <div className="w-full h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 48 }}>
          <CartesianGrid stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#374151", fontSize: 11 }}
            angle={-30}
            textAnchor="end"
            interval={0}
          />
          <YAxis domain={[0, 100]} tick={{ fill: "#9CA3AF", fontSize: 10 }} />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              boxShadow: "0 8px 24px -8px rgba(27,43,75,0.25)",
              fontSize: 12,
            }}
            cursor={{ fill: "rgba(14,165,176,0.06)" }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <defs>
            <linearGradient id="barCandidateFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14C8D4" />
              <stop offset="100%" stopColor="#0EA5B0" />
            </linearGradient>
          </defs>
          <Bar dataKey="Candidate" fill="url(#barCandidateFill)" radius={[5, 5, 0, 0]} />
          <Bar dataKey="Role Benchmark" fill="#C7CDD6" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
