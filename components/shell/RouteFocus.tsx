"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const WAIT_MS = 10_000;

// Moves focus to the page heading on every screen change (design.md, Accessibility), so keyboard and
// screen-reader users land at the top of the new screen. Skipped on the first load. While a skeleton shows,
// the heading isn't there yet: focus goes to it when it arrives, unless the new screen has already put focus
// somewhere itself (the board returns it to the row that was opened).
export default function RouteFocus() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    // The first load, and React running this again for the same screen.
    if (last.current === null || last.current === pathname) {
      last.current = pathname;
      return;
    }
    last.current = pathname;

    const focus = (heading: HTMLElement) => {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    };
    const heading = document.querySelector<HTMLElement>("#content h1");
    if (heading) return focus(heading);

    const observer = new MutationObserver(() => {
      const arrived = document.querySelector<HTMLElement>("#content h1");
      if (!arrived) return;
      observer.disconnect();
      const active = document.activeElement;
      if (active && active !== document.body && document.getElementById("content")?.contains(active)) return;
      focus(arrived);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const stop = window.setTimeout(() => observer.disconnect(), WAIT_MS);
    return () => {
      observer.disconnect();
      window.clearTimeout(stop);
    };
  }, [pathname]);

  return null;
}
