import OfflineBar from "@/components/shell/OfflineBar";
import TopBar from "@/components/shell/TopBar";

// The board and the report: top bar, offline bar, content. The PDF preview has its own bar instead.
export default function AppLayout({ children }: LayoutProps<"/">) {
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
