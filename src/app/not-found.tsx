"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "@/components/LocaleLink";
import StatusPage from "@/components/pages/StatusPage";
import { LanguageProvider, useLang } from "@/lib/LanguageContext";
import type { Lang } from "@/lib/content";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

/** The app's only 404 boundary. Next.js ignores a nested not-found.tsx when
 *  the route sits under a dynamic segment ([lang]) — verified: even one placed
 *  directly in tours/[slug] never renders — so notFound() from the tour/blog
 *  pages and unmatched URLs alike all land here.
 *
 *  This route is prerendered once and so can't know the locale up front: it
 *  reads it from the path after mount, starting from Russian so the server and
 *  first client render agree and hydration stays clean. Costs a brief flash of
 *  Russian on a /en or /kk 404 — acceptable on a page nobody indexes. */
function NotFoundBody() {
  const { t } = useLang();
  return (
    <StatusPage code="404" eyebrow={t.notFound.eyebrow} title={t.notFound.title} text={t.notFound.text}>
      <Link href="/tours" className={ui.btnGold}>
        {t.notFound.tours}
        <span className="lic">
          <ArrowRight />
        </span>
      </Link>
      <Link href="/" className={ui.btnGhost}>
        {t.notFound.home}
      </Link>
    </StatusPage>
  );
}

export default function RootNotFound() {
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>(DEFAULT_LOCALE);

  useEffect(() => {
    const segment = pathname.split("/")[1] ?? "";
    if (isLocale(segment)) setLang(segment);
  }, [pathname]);

  return (
    <LanguageProvider lang={lang}>
      <div className="min-h-screen">
        <Header />
        <NotFoundBody />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
