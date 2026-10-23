import Image from "next/image";
import BrandLink from "./BrandLink";
import { InstallButton } from "./InstallOffer";

// Brand name and mark come from the brand theme; the right end is kept free for an account menu when sign-in arrives.
export default function TopBar() {
  return (
    <header className="flex h-[54px] items-center gap-4 border-b border-line px-(--gutter) min-[760px]:h-[60px]">
      <BrandLink
        className="flex min-h-(--tap) items-center gap-2.5 text-[17px] font-extrabold tracking-[-0.01em] text-brand-text [font-stretch:var(--wide)]"
      >
        <Image src="/logo.png" alt="" width={240} height={240} className="h-[30px] w-auto" priority />
        <span>PT Example</span>
      </BrandLink>
      <span className="hidden border-l border-line pl-4 text-sm font-medium text-ink-2 min-[760px]:inline">
        Hiring assessments
      </span>
      <div className="ml-auto flex items-center gap-4">
        <span className="hidden text-[13px] text-ink-3 min-[1180px]:inline">Confidential, internal HR use</span>
        <InstallButton />
      </div>
    </header>
  );
}
