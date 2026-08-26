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

export default function CompetencyHorizontalBarChart({
  competencies,
}: {
  competencies: Competency[];
}) {
  const data = [...competencies]
    .sort((a, b) => b.score - a.score)
    .map((c) => ({
      name: c.name,
      Candidate: c.score,
      "Role Benchmark": c.benchmarkScore,
    }));

  const rowHeight = 30;
  const chartHeight = Math.max(360, data.length * rowHeight + 60);

  return (
    <div className="w-full" style={{ height: chartHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
          barCategoryGap={10}
        >
          <CartesianGrid stroke="#E5E7EB" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#374151", fontSize: 11 }}
            width={168}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              boxShadow: "0 8px 24px -8px rgba(27,43,75,0.25)",
              fontSize: 12,
            }}
            cursor={{ fill: "rgba(14,165,176,0.06)" }}
          />
          <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: 12, paddingBottom: 8 }} />
          <defs>
            <linearGradient id="hbarCandidateFill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0EA5B0" />
              <stop offset="100%" stopColor="#14C8D4" />
            </linearGradient>
          </defs>
          <Bar dataKey="Candidate" fill="url(#hbarCandidateFill)" radius={[0, 5, 5, 0]} barSize={12} />
          <Bar dataKey="Role Benchmark" fill="#C7CDD6" radius={[0, 5, 5, 0]} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
