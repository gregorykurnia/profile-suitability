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
          <defs>
            <radialGradient id="radarCandidateFill">
              <stop offset="0%" stopColor="#14C8D4" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#0EA5B0" stopOpacity={0.15} />
            </radialGradient>
          </defs>
          <Radar
            name="Role Benchmark"
            dataKey="Role Benchmark"
            stroke="#9CA3AF"
            fill="#9CA3AF"
            fillOpacity={0.12}
            strokeDasharray="4 3"
          />
          <Radar
            name="Candidate"
            dataKey="Candidate"
            stroke="#0EA5B0"
            strokeWidth={2}
            fill="url(#radarCandidateFill)"
            fillOpacity={1}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              boxShadow: "0 8px 24px -8px rgba(27,43,75,0.25)",
              fontSize: 12,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
