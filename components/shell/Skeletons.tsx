import type { CSSProperties } from "react";

// Loading: the board and the report keep their real shape, in blocks that pulse gently (design.md, Skeletons).
// Screen readers hear one status line instead.

const PULSE = "animate-[skeleton_1.4s_ease-in-out_infinite] motion-reduce:animate-none";

// On the blue band.
function OnBand({ style, className = "" }: { style: CSSProperties; className?: string }) {
  return <i className={`block rounded-md bg-white/24 ${PULSE} ${className}`} style={style} />;
}

// On white.
function Block({ style, className = "" }: { style: CSSProperties; className?: string }) {
  return <i className={`block rounded-md bg-shade-2 ${PULSE} ${className}`} style={style} />;
}

const ROW_WIDTHS = [
  [72, 44],
  [58, 38],
  [66, 47],
  [52, 34],
  [76, 42],
  [61, 49],
];

function Rows({ count }: { count: number }) {
  return (
    <>
      {ROW_WIDTHS.slice(0, count).map(([a, b], i) => (
        <div key={i} className="border-b border-line py-3.5">
          <i className={`block h-3 rounded-[4px] bg-shade-2 ${PULSE}`} style={{ width: `${a}%` }} />
          <i className={`mt-2 block h-2.5 rounded-[4px] bg-shade ${PULSE}`} style={{ width: `${b}%` }} />
        </div>
      ))}
    </>
  );
}

export function BoardSkeleton() {
  return (
    <div aria-busy="true">
      <p role="status" className="sr">
        Loading candidates
      </p>
      <section aria-hidden="true" className="bg-band">
        <div className="mx-auto grid max-w-(--max) gap-6 px-(--gutter) pt-6 pb-[22px] min-[760px]:pt-9 min-[760px]:pb-[30px] min-[1180px]:grid-cols-[minmax(0,1fr)_auto] min-[1180px]:items-end min-[1180px]:gap-x-16">
          <div>
            <OnBand style={{ width: "72%", height: 44 }} />
            <OnBand style={{ width: "40%", height: 18 }} className="mt-4" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <OnBand style={{ width: 64, height: 88 }} className="max-[759px]:h-14! max-[759px]:w-10!" />
                <OnBand style={{ width: "100%", maxWidth: 110, height: 14 }} className="mt-3" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div
        aria-hidden="true"
        className="mx-auto flex max-w-(--max) flex-wrap gap-2.5 px-(--gutter) pt-4 min-[760px]:pt-[22px]"
      >
        <Block style={{ height: 42, borderRadius: 21 }} className="w-full min-[760px]:w-[320px]" />
        <Block style={{ width: 110, height: 42, borderRadius: 21 }} />
        <Block style={{ width: 110, height: 42, borderRadius: 21 }} />
      </div>
      <div
        aria-hidden="true"
        className="mx-auto grid max-w-(--max) gap-y-7 px-(--gutter) pt-6 pb-14 min-[760px]:grid-cols-2 min-[760px]:gap-x-5 min-[1180px]:grid-cols-4"
      >
        {[0, 1, 2, 3].map((i) => (
          <section key={i}>
            <Block style={{ width: "60%", height: 20 }} className="mb-3.5" />
            <Rows count={4} />
          </section>
        ))}
      </div>
    </div>
  );
}

export function ReportSkeleton() {
  return (
    <div aria-busy="true">
      <p role="status" className="sr">
        Loading the report
      </p>
      <div aria-hidden="true" className="flex min-h-[50px] items-center bg-shade px-(--gutter) min-[760px]:min-h-[52px]">
        <Block style={{ width: 130, height: 16 }} />
      </div>
      <section aria-hidden="true" className="bg-band">
        <div className="mx-auto max-w-(--max) px-(--gutter) py-[22px] min-[760px]:pt-[34px] min-[760px]:pb-7">
          <OnBand style={{ width: "min(520px, 80%)", height: 48 }} />
          <OnBand style={{ width: 220, height: 18 }} className="mt-3.5" />
          <div className="mt-6 flex items-end gap-8">
            <OnBand style={{ width: 170, height: 150 }} className="max-[759px]:h-24! max-[759px]:w-28!" />
            <div className="flex flex-col gap-4">
              <OnBand style={{ width: 150, height: 30 }} />
              <OnBand style={{ width: 120, height: 44 }} />
            </div>
          </div>
          <div className="mt-7 grid grid-cols-[45fr_20fr_20fr_15fr] gap-1">
            {[0, 1, 2, 3].map((i) => (
              <i key={i} className="h-2 rounded-[4px] bg-band-soft" />
            ))}
          </div>
        </div>
      </section>
      <div
        aria-hidden="true"
        className="mx-auto grid max-w-(--max) items-start gap-10 px-(--gutter) pt-10 pb-14 min-[1180px]:grid-cols-[minmax(0,1fr)_340px] min-[1180px]:gap-14"
      >
        <section>
          <Rows count={6} />
        </section>
        <section>
          <Rows count={4} />
        </section>
      </div>
    </div>
  );
}
