"use client";

import { useEffect } from "react";
import { listenForKept } from "@/lib/offline";

// The service worker (public/sw.js) runs in production builds only: in development it would keep stale code.
export default function RegisterServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((all) => all.forEach((r) => r.unregister()));
      return;
    }
    listenForKept();
    navigator.serviceWorker.register("/sw.js").catch(() => {});
    // What loaded before the worker took over is kept too, so this first page can start offline later.
    navigator.serviceWorker.ready.then((registration) => {
      const assets = performance
        .getEntriesByType("resource")
        .map((entry) => new URL(entry.name))
        .filter((url) => url.origin === location.origin && url.pathname.startsWith("/_next/static/"))
        .map((url) => url.pathname);
      registration.active?.postMessage({ type: "assets", assets });
    });
  }, []);

  return null;
}
