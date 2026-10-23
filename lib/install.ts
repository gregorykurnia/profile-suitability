import { useSyncExternalStore } from "react";
import { INSTALL_EVENT as EVENT, type InstallPrompt } from "./installScript";

// The install offer (A2): the browser's own offer, kept by the layout's script (installScript.ts). iPhones never
// offer one: there the offer says how to add the app from the Share sheet instead. Dismissing it lasts for the session.

declare global {
  interface Window {
    __installPrompt?: InstallPrompt | null;
  }
}

const DISMISSED_KEY = "install:dismissed";

export type InstallOffer = "prompt" | "share-sheet" | null;

function isIphone(): boolean {
  const standalone =
    (navigator as Navigator & { standalone?: boolean }).standalone === true ||
    window.matchMedia("(display-mode: standalone)").matches;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return ios && !standalone;
}

function snapshot(): InstallOffer {
  try {
    if (sessionStorage.getItem(DISMISSED_KEY)) return null;
  } catch {
    // Blocked storage: the offer can't be dismissed for good, only hidden now.
  }
  if (window.__installPrompt) return "prompt";
  return isIphone() ? "share-sheet" : null;
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

export function useInstallOffer(): InstallOffer {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}

export function dismissInstall() {
  try {
    sessionStorage.setItem(DISMISSED_KEY, "1");
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

// Shows the browser's own install question. True when the person said yes.
export async function install(): Promise<boolean> {
  const prompt = window.__installPrompt;
  if (!prompt) return false;
  window.__installPrompt = null; // a prompt can only be used once
  await prompt.prompt();
  const { outcome } = await prompt.userChoice;
  window.dispatchEvent(new Event(EVENT));
  return outcome === "accepted";
}
