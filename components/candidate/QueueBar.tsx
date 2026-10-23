import type { ReactNode } from "react";
import Link from "next/link";
import { BackIcon, NextIcon } from "@/components/shell/icons";
import { shortName } from "@/lib/utils";

type Neighbour = { name: string; href: string } | null;

// Back to the board as it was left, what the person is stepping through, and previous / next (M1).
export default function QueueBar({
  backHref,
  narrowing,
  order,
  position,
  total,
  prev,
  next,
}: {
  backHref: string;
  narrowing: string;
  order: string;
  position: number;
  total: number;
  prev: Neighbour;
  next: Neighbour;
}) {
  return (
    <nav
      aria-label="Candidates"
      className="flex min-h-[50px] items-center gap-2 bg-shade pr-2.5 pl-2 text-sm min-[760px]:min-h-[52px] min-[760px]:gap-5 min-[760px]:px-(--gutter)"
    >
      <Link
        href={backHref}
        className="inline-flex min-h-(--tap) items-center gap-1 font-[650] hover:underline hover:underline-offset-4"
      >
        <BackIcon className="size-[18px] flex-none" />
        All candidates
      </Link>
      <span className="hidden min-w-0 truncate text-ink-2 min-[760px]:inline">
        {narrowing}, <b className="font-semibold text-ink">{order}</b>
      </span>
      <div className="ml-auto flex flex-none items-center gap-2">
        <span className="mr-1 text-[13px] whitespace-nowrap text-ink-2 min-[760px]:text-sm">
          {position} of {total}
        </span>
        <Step dir="prev" to={prev} />
        <Step dir="next" to={next} />
      </div>
    </nav>
  );
}

function Step({ dir, to }: { dir: "prev" | "next"; to: Neighbour }) {
  const word = dir === "prev" ? "Previous" : "Next";
  const shape =
    "inline-flex size-(--tap) items-center justify-center gap-1 rounded-full border text-[13.5px] font-semibold min-[760px]:relative min-[760px]:h-9 min-[760px]:w-auto min-[760px]:max-w-[200px] min-[760px]:before:absolute min-[760px]:before:inset-x-0 min-[760px]:before:-inset-y-[5px] min-[760px]:before:content-[''] " +
    (dir === "prev" ? "min-[760px]:pr-3.5 min-[760px]:pl-2.5" : "min-[760px]:pr-2.5 min-[760px]:pl-3.5");
  const inner = (label: ReactNode) => (
    <>
      {dir === "prev" && <BackIcon className="size-[18px] flex-none" />}
      <em className="hidden truncate not-italic min-[760px]:inline">{label}</em>
      {dir === "next" && <NextIcon className="size-[18px] flex-none" />}
    </>
  );

  if (!to) {
    return (
      <span aria-disabled="true" className={`${shape} border-line text-ink-3`}>
        <span className="sr min-[760px]:hidden">{word}</span>
        {inner(word)}
      </span>
    );
  }
  return (
    <Link href={to.href} aria-label={`${word}: ${to.name}`} className={`${shape} border-line-2 bg-paper hover:bg-shade-2`}>
      {inner(<bdi>{shortName(to.name)}</bdi>)}
    </Link>
  );
}
