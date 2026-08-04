"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Competency } from "@/lib/types";

export default function CompetencyRadarChart({ competencies }: { competencies: Competency[] }) {
  const data = competencies.map((c) => ({
    name: c.name,
    Candidate: c.score,
    "Role Benchmark": c.benchmarkScore,
  }));

  return (
    <div className="w-full h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: "#374151", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
          />
          <Radar
            name="Role Benchmark"
            dataKey="Role Benchmark"
            stroke="#9CA3AF"
            fill="#9CA3AF"
            fillOpacity={0.15}
            strokeDasharray="4 3"
          />
          <Radar
            name="Candidate"
            dataKey="Candidate"
            stroke="#0EA5B0"
            fill="#0EA5B0"
            fillOpacity={0.3}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #E5E7EB",
              fontSize: 12,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
