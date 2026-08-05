import { NextRequest, NextResponse } from "next/server";

const LOCALE_COOKIE = "locale";

function detectLocale(acceptLanguage: string | null): "en" | "id" {
  if (!acceptLanguage) return "en";
  const langs = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const lang of langs) {
    if (lang.startsWith("id")) return "id";
    if (lang.startsWith("en")) return "en";
  }
  return "en";
}

export function proxy(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.cookies.has(LOCALE_COOKIE)) {
    const locale = detectLocale(req.headers.get("accept-language"));
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
