"use client";

import Image from "next/image";
import { dismissInstall, install, useInstallOffer } from "@/lib/install";
import { InstallIcon } from "./icons";
import { showToast } from "./Toasts";

const INSTALLED = "Installed. Open Hiring assessments from your home screen or app list.";
const SHARE_SHEET = "Tap Share, then Add to Home Screen.";

async function installNow() {
  if (await install()) showToast(INSTALLED);
}

// Tablet and desktop: "Install app" at the end of the top bar.
export function InstallButton() {
  const offer = useInstallOffer();
  if (!offer) return null;
  return (
    <button
      type="button"
      onClick={offer === "prompt" ? installNow : () => showToast(SHARE_SHEET)}
      className="relative hidden h-[38px] items-center gap-[7px] rounded-full border border-line-2 pr-3.5 pl-[11px] before:absolute before:inset-x-0 before:-inset-y-1 before:content-[''] text-[13.5px] font-semibold transition-colors duration-(--d-fast) hover:bg-shade min-[760px]:inline-flex"
    >
      <InstallIcon className="size-4" />
      Install app
    </button>
  );
}

// Phones: a card at the foot of the board.
export function InstallCard() {
  const offer = useInstallOffer();
  if (!offer) return null;
  return (
    <aside
      aria-labelledby="install-heading"
      className="fixed inset-x-3 bottom-3 z-30 flex gap-3.5 rounded-sheet bg-paper p-4 shadow-pop min-[760px]:hidden"
    >
      <Image src="/icon-192x192.png" alt="" width={44} height={44} className="size-11 flex-none rounded-tile" />
      <div className="min-w-0">
        <h2 id="install-heading" className="text-base leading-snug font-[750]">
          Keep it one tap away
        </h2>
        <p className="mt-0.5 text-(length:--t-sm) text-ink-2">
          {offer === "prompt"
            ? "Install Hiring assessments to open it from your home screen."
            : `${SHARE_SHEET} Hiring assessments then opens from your home screen.`}{" "}
          Reports you&apos;ve opened then work without a connection.
        </p>
        <div className="mt-2.5 flex gap-1.5">
          {offer === "prompt" && (
            <button type="button" onClick={installNow} className="btn btn-primary relative min-h-10 px-4 text-sm before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']">
              Install
            </button>
          )}
          <button type="button" onClick={dismissInstall} className="btn btn-ghost relative min-h-10 px-4 text-sm before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']">
            Not now
          </button>
        </div>
      </div>
    </aside>
  );
}
