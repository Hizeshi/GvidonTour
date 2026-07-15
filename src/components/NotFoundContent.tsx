"use client";

import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "@/components/LocaleLink";
import StatusPage from "@/components/pages/StatusPage";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CONTENT } from "@/lib/content";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

export default function NotFoundContent() {
  const pathname = usePathname();
  const candidate = pathname.split("/")[1] ?? "";
  const lang = isLocale(candidate) ? candidate : DEFAULT_LOCALE;
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
