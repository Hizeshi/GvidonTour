import NotFoundContent from "@/components/NotFoundContent";
import RootHtml from "@/components/RootHtml";
import { DEFAULT_LOCALE } from "@/lib/i18n";

/** The app's only 404 boundary. Next.js ignores a nested not-found.tsx when the
 *  route sits under a dynamic segment ([lang]) — verified: even one placed
 *  directly in tours/[slug] never renders, and the build only registers a
 *  single /_not-found route. So notFound() from the tour/blog pages and
 *  unmatched URLs alike all land here, above [lang] and without its params.
 *
 *  Reading request headers here makes every public route dynamic because this
 *  boundary is shared by the whole app. The shell therefore stays static;
 *  NotFoundContent derives the locale from the browser pathname.
 *
 *  It renders <html> itself because the app has no shared root layout: this
 *  page sits above both branches, so neither of their roots wraps it. */
export default function RootNotFound() {
  return (
    <RootHtml lang={DEFAULT_LOCALE}>
      <NotFoundContent />
    </RootHtml>
  );
}
