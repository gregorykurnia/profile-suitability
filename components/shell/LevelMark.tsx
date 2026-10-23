import type { Level } from "@/lib/levels";

// Four rising bars, filled up to the level (4 = Highly Recommended). Always shown next to the level's name.
const HEIGHTS = [5, 8, 11, 14];

export default function LevelMark({ level }: { level: Level }) {
  return (
    <span aria-hidden="true" className="inline-flex h-3.5 flex-none items-end gap-0.5">
      {HEIGHTS.map((h, i) => (
        <i
          key={h}
          className={`w-1 rounded-[1px] bg-current ${i < level ? "opacity-100" : "opacity-[.22]"}`}
          style={{ height: h }}
        />
      ))}
    </span>
  );
}
