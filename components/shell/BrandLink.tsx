"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { BOARD_EVENT, lastBoardQuery } from "@/lib/boardMemory";

// Where the board was left (M1): the same narrowing and order.
export function useBoardHref(): string {
  const [qs, setQs] = useState("");

  useEffect(() => {
    // Read after mount so the server and first client render agree.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQs(lastBoardQuery());
    const onBoard = (e: Event) => setQs((e as CustomEvent<string>).detail);
    window.addEventListener(BOARD_EVENT, onBoard);
    return () => window.removeEventListener(BOARD_EVENT, onBoard);
  }, []);

  return `/${qs}`;
}

// The brand links to the board as it was left.
export default function BrandLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Link href={useBoardHref()} aria-label="PT Example hiring assessments, all candidates" className={className}>
      {children}
    </Link>
  );
}
