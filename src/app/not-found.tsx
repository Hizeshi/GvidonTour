import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotFoundContent from "@/components/NotFoundContent";
import RootHtml from "@/components/RootHtml";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CONTENT } from "@/lib/content";
import { DEFAULT_LOCALE } from "@/lib/i18n";

/** The app's only 404 boundary. Next.js ignores a nested not-found.tsx when the
 *  route sits under a dynamic segment ([lang]) — verified: even one placed
 *  directly in tours/[slug] never renders, and the build only registers a
 *  single /_not-found route. So notFound() from the tour/blog pages and
 *  unmatched URLs alike all land here, above [lang] and without its params.
 *
 *  Reading request headers here makes every public route dynamic because this
 *  boundary is shared by the whole app. The shell therefore stays static, which
 *  means it is prerendered once and cannot know which locale the visitor asked
 *  for: the header and footer are rendered here in the default locale, and only
 *  the 404 message itself is localized, by NotFoundContent from the pathname.
 *
 *  A Russian header on an English 404 is the deliberate trade. The alternative
 *  — rendering the header and footer on the client so they could localize —
 *  needs the dictionary in a client component, and this boundary is part of
 *  every page's tree, so that chunk downloads on every page of the site.
 *  Measured: 62 KB, on the home page, for a page almost nobody sees and Google
 *  doesn't index.
 *
 *  It renders <html> itself because the app has no shared root layout: this
 *  page sits above both branches, so neither of their roots wraps it. */
export default function RootNotFound() {
  const t = CONTENT[DEFAULT_LOCALE];

  return (
    <RootHtml lang={DEFAULT_LOCALE}>
      <LanguageProvider lang={DEFAULT_LOCALE}>
        <div className="min-h-screen">
          <Header labels={{ brandTag: t.brandTag, nav: t.nav, toursMenu: t.toursMenu }} />
          <NotFoundContent />
          <Footer lang={DEFAULT_LOCALE} />
        </div>
      </LanguageProvider>
    </RootHtml>
  );
}
