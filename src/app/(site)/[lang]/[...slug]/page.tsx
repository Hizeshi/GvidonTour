import { notFound } from "next/navigation";

/** Catches every unknown path under a locale (/en/nope, /kk/a/b/c) and throws
 *  it at the not-found boundary of THIS segment.
 *
 *  Without it, an unmatched URL matches no route at all, so Next.js falls back
 *  to the root app/not-found.tsx — which sits above [lang], has no params, and
 *  therefore can't know the language. That's why a nested not-found.tsx looked
 *  "ignored" when this was tried before: nothing ever routed into [lang] for it
 *  to catch. Adding this page is what makes /en/nope a match inside [lang], so
 *  [lang]/not-found.tsx renders — inside [lang]/layout.tsx, which does have the
 *  locale and gives the 404 a properly translated header and footer.
 *
 *  More specific routes (/ru/tours, /ru/blog/[slug]) win over a catch-all, so
 *  this only ever runs for paths that genuinely don't exist.
 *
 *  Vercel's own guide reads the locale from the referer header in not-found.tsx
 *  instead. Not done here: a referer is absent on direct navigation (typed URL,
 *  bookmark, crawler), and headers() in a not-found boundary opts every public
 *  route into dynamic rendering — that one cost the whole site its CDN cache
 *  once already (see CLAUDE.md). */
export default function CatchAllNotFound(): never {
  notFound();
}
