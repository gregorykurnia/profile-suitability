"use client";

import { useEffect, useRef, useState } from "react";
import { ordinal } from "@/lib/utils";

interface SuitabilityGaugeProps {
  score: number;
  color: string;
  size?: number;
  percentile?: number;
}

const START_ANGLE = 135;
const END_ANGLE = 405;
const ARC_SWEEP = END_ANGLE - START_ANGLE;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export default function SuitabilityGauge({ score, color, size = 220, percentile }: SuitabilityGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 1400;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [score]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 18;
  const trackPath = describeArc(cx, cy, r, START_ANGLE, END_ANGLE);
  const circumference = (ARC_SWEEP / 360) * 2 * Math.PI * r;
  const fillFraction = animatedScore / 100;

  const gradientId = `gauge-gradient-${color.replace("#", "")}`;

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <div
        className="pointer-events-none absolute inset-4 rounded-full blur-2xl opacity-25"
        style={{ background: color }}
      />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.65} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <path
          d={trackPath}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <path
          d={trackPath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fillFraction)}
          style={{
            transition: "stroke-dashoffset 0.1s linear",
            filter: `drop-shadow(0 2px 6px ${color}66)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-bold text-5xl text-navy tabular-nums">
          {animatedScore}
        </span>
        <span className="font-mono text-sm text-muted mt-1">/ 100</span>
        {percentile !== undefined && (
          <span
            className="font-mono font-semibold text-sm text-navy mt-2 px-2.5 py-0.5 rounded-full border"
            style={{ backgroundColor: `${color}14`, borderColor: `${color}33` }}
          >
            {ordinal(percentile)} percentile
          </span>
        )}
      </div>
    </div>
  );
}
