import { notFound } from "next/navigation";
import Analytics from "@/components/Analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import { LanguageProvider } from "@/lib/LanguageContext";
import { isLocale, LOCALES } from "@/lib/i18n";

/** Pre-renders /ru, /en and /kk at build time. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <LanguageProvider lang={lang}>
      <div className="min-h-screen">
        <Header />
        {children}
        <Footer />
        <FloatingCta />
        <Analytics />
      </div>
    </LanguageProvider>
  );
}
