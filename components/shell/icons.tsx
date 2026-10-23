import type { SVGProps } from "react";

// Line icons drawn for this design (20×20 and 16×16 grids). Decorative: the text next to them carries the meaning.
type IconProps = SVGProps<SVGSVGElement>;

const base = { fill: "none", stroke: "currentColor", "aria-hidden": true } as const;

export function BackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" strokeWidth={2} {...base} {...props}>
      <path d="m12 5-5 5 5 5" />
    </svg>
  );
}

export function NextIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" strokeWidth={2} {...base} {...props}>
      <path d="m8 5 5 5-5 5" />
    </svg>
  );
}

export function SaveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth={1.7} {...base} {...props}>
      <path d="M8 2.5v8m0 0-3-3m3 3 3-3M3 13.5h10" />
    </svg>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth={1.6} {...base} {...props}>
      <path d="M6.5 9.5a3 3 0 0 0 4.2 0l2.3-2.3a3 3 0 0 0-4.2-4.2l-.8.8M9.5 6.5a3 3 0 0 0-4.2 0L3 8.8a3 3 0 0 0 4.2 4.2l.8-.8" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth={1.5} {...base} {...props}>
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 7.2v4M8 4.8v.1" />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" strokeWidth={1.6} {...base} {...props}>
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth={1.7} {...base} {...props}>
      <circle cx="7" cy="7" r="5" />
      <path d="m11 11 3.5 3.5" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" strokeWidth={1.6} {...base} {...props}>
      <path d="m3 3 6 6M9 3 3 9" />
    </svg>
  );
}

export function OfflineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth={1.5} {...base} {...props}>
      <path d="M4.5 12.5h7a3 3 0 0 0 .4-6 4 4 0 0 0-7.6.9A2.6 2.6 0 0 0 4.5 12.5Z" />
      <path d="m2.5 2.5 11 11" />
    </svg>
  );
}

export function InstallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth={1.6} {...base} {...props}>
      <rect x="3.5" y="1.5" width="9" height="13" rx="2" />
      <path d="M8 5v5m0 0-2-2m2 2 2-2" />
    </svg>
  );
}
