import { NextResponse } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "en";

function getLocale(request) {
  const acceptLang = request.headers.get("accept-language") || "";
  const preferred = acceptLang.split(",")[0]?.split("-")[0]?.trim();
  if (locales.includes(preferred)) return preferred;
  return defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to the locale-prefixed path
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths (_next), api, static files, and images
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$|.*\\.webp$).*)",
  ],
};
