"use client";

import { useEffect, useRef } from "react";
import MessagePage from "@/components/shell/MessagePage";
import type { BoardCandidate } from "@/lib/boardQuery";

// Offline, and this report was never opened on this device (A3). Shown in place of the board.
export default function NeedsConnection({
  candidate,
  onBack,
  onRetry,
}: {
  candidate: BoardCandidate;
  onBack: () => void;
  onRetry: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = ref.current?.querySelector<HTMLElement>("h1");
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus();
    window.scrollTo(0, 0);
  }, [candidate]);

  return (
    <div ref={ref}>
      <MessagePage
        heading="This report needs a connection"
        detail={
          <>
            You&apos;re offline, and <bdi>{candidate.candidateName}</bdi>&apos;s report hasn&apos;t been opened on this
            device yet. Reports you&apos;ve opened before still work.
          </>
        }
        actions={
          <>
            <button type="button" className="btn btn-primary" onClick={onBack}>
              All candidates
            </button>
            <button type="button" className="btn" onClick={onRetry}>
              Try again
            </button>
          </>
        }
      />
    </div>
  );
}
