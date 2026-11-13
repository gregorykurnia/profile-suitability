import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import { PAGES_CACHE } from "../lib/offline";

test("page-cache rotation evicts obsolete reports and serves current reports offline", async () => {
  type LifecycleEvent = { waitUntil: (work: Promise<unknown>) => void };
  const listeners = new Map<string, (event: LifecycleEvent) => void>();
  const stores = new Map<string, Map<string, Response>>();
  const context = createContext({
    self: {
      addEventListener: (type: string, listener: (event: LifecycleEvent) => void) => listeners.set(type, listener),
      clients: { claim: () => {} },
    },
    URL,
    fetch: async () => { throw new Error("Offline"); },
    caches: {
      keys: async () => [...stores.keys()],
      delete: async (name: string) => stores.delete(name),
      open: async (name: string) => {
        if (!stores.has(name)) stores.set(name, new Map());
        return { match: async (path: string) => stores.get(name)!.get(path)?.clone() };
      },
      match: async (path: string) => {
        for (const store of stores.values()) {
          if (store.has(path)) return store.get(path)!.clone();
        }
      },
    },
  });
  runInContext(readFileSync("public/sw.js", "utf8"), context);
  expect(PAGES_CACHE).toBe("hiring-pages-v2");
  expect(runInContext("PAGES", context)).toBe(PAGES_CACHE);
  const assets = runInContext("ASSETS", context) as string;
  stores.set("hiring-pages-v1", new Map([
    ["/report/current", new Response("obsolete profile")],
    ["/report/obsolete", new Response("obsolete profile")],
  ]));
  stores.set(PAGES_CACHE, new Map([["/report/current", new Response("current profile")]]));
  stores.set(assets, new Map([["/offline.html", new Response("needs a connection")]]));

  let activation: Promise<unknown> | undefined;
  listeners.get("activate")!({ waitUntil: (work) => { activation = work; } });
  await activation;
  expect([...stores.keys()].sort()).toEqual([PAGES_CACHE, assets].sort());

  const offlinePage = async (path: string) => {
    context.request = new Request(`https://demo.invalid${path}`);
    const response = await runInContext("page(request, new URL(request.url))", context) as Response;
    return response.text();
  };
  expect(await offlinePage("/report/current")).toBe("current profile");
  expect(await offlinePage("/report/current?from=board")).toBe("current profile");
  expect(await offlinePage("/report/obsolete")).toBe("needs a connection");
});
