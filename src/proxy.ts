import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/auth";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";

/** Two jobs:
 *  1. Gate /admin behind the session cookie. Runs on the edge, so it only
 *     verifies the JWT signature — user lookups happen in server actions.
 *  2. Keep every public page under a locale prefix (/ru, /en, /kk). "/" and
 *     any legacy un-prefixed URL (/tours, /blog/x — the shape this site used
 *     before the language moved into the URL) redirect to their /ru
 *     equivalent, so old links and existing search results keep working. */

async function isSessionValid(token: string | undefined): Promise<boolean> {
  if (!token || !process.env.AUTH_SECRET) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET), {
      algorithms: ["HS256"],
    });
    return true;
  } catch {
    return false;
  }
}

function hasLocalePrefix(pathname: string): boolean {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname === "/admin/login") return NextResponse.next();
    if (await isSessionValid(req.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (!hasLocalePrefix(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next internals, the API (POST bodies must not be
  // redirected) and static/metadata files.
  matcher: ["/((?!_next/|api/|images/|favicon.ico|robots.txt|sitemap.xml|icon.svg).*)"],
};
