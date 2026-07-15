import { headers } from "next/headers";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "@/components/LocaleLink";
import StatusPage from "@/components/pages/StatusPage";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CONTENT } from "@/lib/content";
import { DEFAULT_LOCALE, isLocale, LANG_HEADER } from "@/lib/i18n";
import { ui } from "@/lib/ui";

/** The app's only 404 boundary. Next.js ignores a nested not-found.tsx when the
 *  route sits under a dynamic segment ([lang]) — verified: even one placed
 *  directly in tours/[slug] never renders, and the build only registers a
 *  single /_not-found route. So notFound() from the tour/blog pages and
 *  unmatched URLs alike all land here, above [lang] and without its params.
 *
 *  The locale therefore arrives as a request header set by proxy.ts, which
 *  makes this route render per-request and lets the server emit the right
 *  language directly — no client-side detection, no flash of the wrong one. */
export default async function RootNotFound() {
  const raw = (await headers()).get(LANG_HEADER) ?? "";
  const lang = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = CONTENT[lang].notFound;

  return (
    <LanguageProvider lang={lang}>
      <div className="min-h-screen">
        <Header />
        <StatusPage code="404" eyebrow={t.eyebrow} title={t.title} text={t.text}>
          <Link href="/tours" className={ui.btnGold}>
            {t.tours}
            <span className="lic">
              <ArrowRight />
            </span>
          </Link>
          <Link href="/" className={ui.btnGhost}>
            {t.home}
          </Link>
        </StatusPage>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
