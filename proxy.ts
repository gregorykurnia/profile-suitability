import { NextResponse, type NextRequest } from "next/server";
import { getReportByCandidateId } from "@/lib/reportMock";

// A report address with no candidate behind it gets the unknown-candidate screen with a real 404 (M2). The check
// happens here because the report streams behind its loading skeleton, and a streamed page can't change its status.
export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.split("/")[2] ?? "";
  let reference = segment;
  try {
    reference = decodeURIComponent(segment);
  } catch {
    // A malformed escape can't name a candidate; it falls through to the unknown-candidate screen as typed.
  }
  if (getReportByCandidateId(reference)) return NextResponse.next();
  return NextResponse.rewrite(new URL(`/report-not-found/${encodeURIComponent(reference)}`, request.url));
}

export const config = {
  matcher: ["/report/:candidateId", "/report/:candidateId/preview"],
};
