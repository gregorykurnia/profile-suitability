// Offline (design.md §6): the board, every report opened on this device and its PDF preview are kept, with the
// code, fonts and images they use, so they work without a connection. Pages always come from the network when
// there is one; a page that was never kept gets offline.html.
const PAGES = "hiring-pages-v1"; // board and opened reports, read by lib/offline.ts
const ASSETS = "hiring-assets-v2";
const STATIC = [
  "/offline.html",
  "/manifest.webmanifest",
  "/logo.png",
  "/icon-192x192.png",
  "/icon-512x512.png",
  ...[
    [400, 100],
    [600, 100],
    [700, 100],
    [750, 112],
    [800, 80],
    [850, 68],
  ].map(([w, s]) => `/fonts/archivo-doc-${w}-${s}.ttf`),
];
const KEPT_PAGE = /^\/(report\/[^/]+(\/preview)?)?$/;

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([caches.open(ASSETS).then((cache) => cache.addAll(STATIC)), keepPages(["/"])]).catch(() => {}),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== PAGES && key !== ASSETS).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

// From the app: keep these pages (a report just opened), or this code (what loaded before the worker took over).
self.addEventListener("message", (event) => {
  const { type, pages, assets } = event.data || {};
  if (type === "keep" && Array.isArray(pages)) {
    event.waitUntil(keepPages(pages).then(() => event.source && event.source.postMessage({ type: "kept" })));
  } else if (type === "assets" && Array.isArray(assets)) {
    event.waitUntil(keepAssets(assets));
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // In-app navigation data goes to the network only. When that fails, Next.js loads the page itself, served below.
  if (request.headers.get("RSC") === "1" || url.searchParams.has("_rsc")) return;

  if (request.mode === "navigate") event.respondWith(page(request, url));
  else if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/fonts/")) event.respondWith(cacheFirst(request));
  else event.respondWith(staleWhileRevalidate(request, event));
});

async function page(request, url) {
  try {
    const response = await fetch(request);
    if (response.ok && KEPT_PAGE.test(url.pathname)) {
      const copy = response.clone();
      caches.open(PAGES).then((cache) => cache.put(url.pathname, copy));
    }
    return response;
  } catch {
    const cache = await caches.open(PAGES);
    return (await cache.match(url.pathname)) || (await caches.match("/offline.html"));
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const copy = response.clone();
    caches.open(ASSETS).then((cache) => cache.put(request, copy));
  }
  return response;
}

async function staleWhileRevalidate(request, event) {
  const cached = await caches.match(request);
  const fresh = fetch(request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(ASSETS).then((cache) => cache.put(request, copy));
    }
    return response;
  });
  if (cached) {
    event.waitUntil(fresh.catch(() => {}));
    return cached;
  }
  return fresh;
}

// Fetch each page, keep it, and keep the code and styles it names, so it can start offline.
async function keepPages(paths) {
  const pages = await caches.open(PAGES);
  await Promise.all(
    paths.map(async (path) => {
      try {
        const response = await fetch(path, { credentials: "same-origin" });
        if (!response.ok) return;
        const html = await response.clone().text();
        await pages.put(path, response);
        await keepAssets(html.match(/\/_next\/static\/[^"'\s\\]+/g) || []);
      } catch {
        // Offline or failed: kept next time the report opens.
      }
    }),
  );
}

async function keepAssets(urls) {
  const assets = await caches.open(ASSETS);
  await Promise.all(
    [...new Set(urls)].map(async (url) => {
      if (await assets.match(url)) return;
      try {
        await assets.add(url);
      } catch {
        // Skipped; the next load fills it in.
      }
    }),
  );
}
