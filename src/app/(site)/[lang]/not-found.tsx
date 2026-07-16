import NotFoundContent from "@/components/NotFoundContent";

/** The 404 for everything under a locale. It renders inside [lang]/layout.tsx,
 *  so the header, the footer and <html lang> are already the right language —
 *  the layout reads the locale from params. Only the message below has to work
 *  it out for itself, because a not-found boundary receives no params.
 *
 *  Reached via [lang]/[...slug]/page.tsx (see the note there) and by any
 *  notFound() thrown from a tour or blog page. The root app/not-found.tsx stays
 *  as the fallback for paths outside any locale. */
export default function LocalizedNotFound() {
  return <NotFoundContent />;
}
