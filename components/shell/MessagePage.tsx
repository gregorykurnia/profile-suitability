import type { ReactNode } from "react";

// A screen with one thing to say (M2, A3): a large heading, a plain explanation and the primary way back.
export default function MessagePage({
  heading,
  detail,
  actions,
  children,
}: {
  heading: ReactNode;
  detail: ReactNode;
  actions: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[720px] px-(--gutter) pt-14 pb-18 min-[760px]:pt-20 min-[760px]:pb-24">
      <h1 className="text-[32px] leading-[1.08] font-[750] tracking-[-0.02em] [overflow-wrap:anywhere] text-balance [font-stretch:var(--wide)] min-[760px]:text-[40px]">
        {heading}
      </h1>
      <p className="mt-4 max-w-[52ch] text-(length:--t-lg) text-ink-2">{detail}</p>
      <div className="mt-7 flex flex-wrap gap-2.5">{actions}</div>
      {children}
    </section>
  );
}
