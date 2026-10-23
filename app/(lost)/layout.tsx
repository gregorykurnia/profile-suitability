import OfflineBar from "@/components/shell/OfflineBar";
import TopBar from "@/components/shell/TopBar";

// Outside the board's loading skeleton, so a missing candidate is a 404 before anything streams (see proxy.ts).
export default function LostLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <TopBar />
      <OfflineBar />
      <main id="content" className="flex-1">
        {children}
      </main>
    </>
  );
}
