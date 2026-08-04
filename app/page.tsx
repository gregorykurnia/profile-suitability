import { redirect } from "next/navigation";
import { mockReport } from "@/lib/reportMock";

export default function Home() {
  redirect(`/report/${mockReport.candidateId}`);
}
