import type { Metadata } from "next";
// Type-only import on purpose: proxy.ts (edge middleware) imports this module,
// and a value import would pull the whole content.ts dictionary into the
// middleware bundle. content.ts re-exports LOCALES below as LANGS, so the
// locale list still has a single source of truth.
import type { Lang } from "./content";
import { SITE_URL } from "./seo";

/** Every public page lives under a locale segment: /ru/…, /en/…, /kk/…
 *  ("/" and any legacy un-prefixed path redirect to /ru/… in proxy.ts).
 *  Note the Kazakh prefix is "kk" — the ISO 639-1 *language* code, which is
 *  what hreflang requires ("kz" is the country code, not a language). */
export const LOCALES: Lang[] = ["ru", "en", "kk"];
export const DEFAULT_LOCALE: Lang = "ru";

export function isLocale(value: string): value is Lang {
  return (LOCALES as readonly string[]).includes(value);
}

/** Narrows the raw [lang] route param to a Lang.
 *
 *  Pages read `lang` from params as a plain string, but every server component
 *  below them indexes the dictionary with it. The layout already 404s on an
 *  unknown locale, so the fallback here is unreachable in practice — it exists
 *  so a page can't be typed into indexing CONTENT with an arbitrary string. */
export function toLocale(value: string): Lang {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Builds a locale-prefixed href from a locale-agnostic path.
 *  localeHref("/tours", "en") -> "/en/tours";  localeHref("/", "ru") -> "/ru" */
export function localeHref(path: string, lang: Lang): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${clean}`;
}

/** Strips the locale prefix off a pathname, giving the locale-agnostic path.
 *  stripLocale("/en/tours") -> "/tours";  stripLocale("/ru") -> "/" */
export function stripLocale(pathname: string): string {
  const [, maybeLocale, ...rest] = pathname.split("/");
  if (maybeLocale && isLocale(maybeLocale)) {
    const path = "/" + rest.join("/");
    return path === "/" ? "/" : path.replace(/\/$/, "");
  }
  return pathname;
}

/** canonical + hreflang alternates for a locale-agnostic path, so Google
 *  treats /ru/tours, /en/tours and /kk/tours as translations of one page
 *  rather than duplicates. */
export function localeAlternates(path: string, lang: Lang) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = `${SITE_URL}${localeHref(path, l)}`;
  languages["x-default"] = `${SITE_URL}${localeHref(path, DEFAULT_LOCALE)}`;
  return { canonical: `${SITE_URL}${localeHref(path, lang)}`, languages };
}

/** Per-locale page metadata: localized title/description plus the canonical
 *  and hreflang set for this path. */
export function pageMetadata(
  lang: Lang,
  path: string,
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    alternates: localeAlternates(path, lang),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${localeHref(path, lang)}`,
      locale: lang,
    },
  };
}
