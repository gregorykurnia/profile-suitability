import { useEffect, useState, useSyncExternalStore } from "react";

// Offline (A3, design.md §6). The service worker (public/sw.js) keeps the board and every report opened on this
// device, with its PDF preview, in the cache below; this side asks it to, and reads what it has kept.
export const PAGES_CACHE = "hiring-pages-v1"; // same name in public/sw.js
const SEEN_KEY = "reports:seen";
const KEPT_EVENT = "app:kept";

function subscribeOnline(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

export function useOnline(): boolean {
  return useSyncExternalStore(
    subscribeOnline,
    () => navigator.onLine,
    () => true,
  );
}

function seen(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(SEEN_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

// A report was opened: it counts as seen this session, and it's kept for offline use (with the code that Save PDF
// loads only when it's first used).
export function keepForOffline(reference: string) {
  try {
    const list = seen();
    if (!list.includes(reference)) sessionStorage.setItem(SEEN_KEY, JSON.stringify([...list, reference]));
  } catch {
    // Blocked storage: the "Opened" tag just doesn't show.
  }
  const worker = navigator.serviceWorker?.controller;
  if (!worker || !navigator.onLine) return;
  const path = `/report/${encodeURIComponent(reference)}`;
  worker.postMessage({ type: "keep", pages: [path, `${path}/preview`] });
  void import("jspdf").catch(() => {});
}

// Which reports open without a connection, by reference. Null until known (and where there's no cache at all).
async function keptReports(): Promise<Set<string> | null> {
  if (!("caches" in window) || !navigator.serviceWorker?.controller) return null;
  try {
    const keys = await (await caches.open(PAGES_CACHE)).keys();
    const refs = keys
      .map((request) => new URL(request.url).pathname.match(/^\/report\/([^/]+)$/)?.[1])
      .filter((ref): ref is string => Boolean(ref))
      .map(decodeURIComponent);
    return new Set(refs);
  } catch {
    return null;
  }
}

export type Availability = { online: boolean; tag: (reference: string) => "opened" | "offline" | null };

// For the board's rows: "Opened" for reports seen this session (offline: kept on this device), and
// "Needs a connection" for the rest while offline.
export function useAvailability(): Availability {
  const online = useOnline();
  const [opened, setOpened] = useState<string[]>([]);
  const [kept, setKept] = useState<Set<string> | null>(null);

  useEffect(() => {
    const read = () => {
      setOpened(seen());
      keptReports().then(setKept);
    };
    read();
    window.addEventListener(KEPT_EVENT, read);
    return () => window.removeEventListener(KEPT_EVENT, read);
  }, [online]);

  return {
    online,
    tag: (reference) => {
      if (online) return opened.includes(reference) ? "opened" : null;
      const available = kept ? kept.has(reference) : opened.includes(reference);
      return available ? "opened" : "offline";
    },
  };
}

// The service worker says when it has finished keeping pages.
export function listenForKept() {
  navigator.serviceWorker?.addEventListener("message", (event) => {
    if (event.data?.type === "kept") window.dispatchEvent(new Event(KEPT_EVENT));
  });
}
