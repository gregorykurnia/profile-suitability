"use client";

import { useOnline } from "@/lib/offline";
import { OfflineIcon } from "./icons";

// Under the top bar on every screen while there's no connection (A3).
export default function OfflineBar() {
  const online = useOnline();
  if (online) return null;
  return (
    <div
      role="status"
      className="on-dark flex items-start gap-2.5 bg-ink px-(--gutter) py-2.5 text-(length:--t-sm) text-white min-[760px]:py-[11px]"
    >
      <OfflineIcon className="mt-px size-[17px] flex-none" />
      <p>
        <b className="font-bold">You&apos;re offline.</b> Reports you&apos;ve opened before still work. Anything else waits
        for a connection.
      </p>
    </div>
  );
}
