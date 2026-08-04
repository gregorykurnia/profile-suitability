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

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fillFraction)}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-bold text-5xl text-navy tabular-nums">
          {animatedScore}
        </span>
        <span className="font-mono text-sm text-muted mt-1">/ 100</span>
        {percentile !== undefined && (
          <span className="font-mono font-semibold text-sm text-navy mt-2 px-2.5 py-0.5 rounded-full bg-[#EEF0F3]">
            {ordinal(percentile)} percentile
          </span>
        )}
      </div>
    </div>
  );
}
