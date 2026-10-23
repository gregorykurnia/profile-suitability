"use client";

import { useEffect, useState } from "react";

// Toasts (ink, bottom centre, 4 seconds, announced politely) and one live region for other announcements.
// Any component can call showToast() or announce(); the layout renders <Toasts /> once.
const TOAST_EVENT = "app:toast";
const ANNOUNCE_EVENT = "app:announce";
const TOAST_MS = 4200;

export function showToast(text: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: text }));
}

export function announce(text: string) {
  window.dispatchEvent(new CustomEvent(ANNOUNCE_EVENT, { detail: text }));
}

type Toast = { id: number; text: string; shown: boolean };

export default function Toasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let next = 0;
    const timers: number[] = [];
    const onToast = (e: Event) => {
      const id = next++;
      setToasts((list) => [...list, { id, text: (e as CustomEvent<string>).detail, shown: false }]);
      timers.push(
        window.setTimeout(() => setToasts((list) => list.map((t) => (t.id === id ? { ...t, shown: true } : t))), 20),
        window.setTimeout(() => setToasts((list) => list.map((t) => (t.id === id ? { ...t, shown: false } : t))), TOAST_MS),
        window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), TOAST_MS + 300),
      );
    };
    // Cleared first so the same text is read again.
    const onAnnounce = (e: Event) => {
      setMessage("");
      timers.push(window.setTimeout(() => setMessage((e as CustomEvent<string>).detail), 30));
    };
    window.addEventListener(TOAST_EVENT, onToast);
    window.addEventListener(ANNOUNCE_EVENT, onAnnounce);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.removeEventListener(ANNOUNCE_EVENT, onAnnounce);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <div
        aria-live="polite"
        className="fixed bottom-6 left-1/2 z-40 flex w-max max-w-[calc(100vw-32px)] -translate-x-1/2 flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-tile bg-ink px-[18px] py-3 text-sm font-[550] [overflow-wrap:anywhere] text-white shadow-pop transition-[opacity,transform] duration-(--d-mid) ease-(--ease) ${
              t.shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {t.text}
          </div>
        ))}
      </div>
      <div aria-live="polite" className="sr">
        {message}
      </div>
    </>
  );
}
