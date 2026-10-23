// The browser's install offer (beforeinstallprompt) can come before the app has started, so the root layout runs
// this script first: it keeps the offer on window for lib/install.ts and says when it changes.
export type InstallPrompt = Event & {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export const INSTALL_EVENT = "app:install";

export const INSTALL_SCRIPT = `addEventListener("beforeinstallprompt",function(e){e.preventDefault();window.__installPrompt=e;dispatchEvent(new Event("${INSTALL_EVENT}"))});addEventListener("appinstalled",function(){window.__installPrompt=null;dispatchEvent(new Event("${INSTALL_EVENT}"))});`;
