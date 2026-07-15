import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Analytics from "@/components/Analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import RootHtml from "@/components/RootHtml";
import { LanguageProvider } from "@/lib/LanguageContext";
import { A11Y_LABELS } from "@/lib/a11y";
import { EMAIL, PHONE } from "@/lib/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { jsonLdScript, SITE_URL } from "@/lib/seo";

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "GVIDON TOUR",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/images/hero-astana.jpg`,
  telephone: PHONE,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Astana",
    addressCountry: "KZ",
  },
  areaServed: "KZ",
};

/** Site-wide defaults. Every page overrides title/description/canonical
 *  through pageMetadata(); what survives from here is metadataBase (which
 *  resolves the relative image paths below) and the title template. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GVIDON TOUR — принимающий туроператор в Казахстане",
    template: "%s — GVIDON TOUR",
  },
  description:
    "Авторские туры по Казахстану: Астана, Алматы, Чарынский каньон, Кольсайские озёра, Туркестан и Мангистау. Визовая поддержка, трансферы, лицензированные гиды.",
  keywords: [
    "туры в Казахстан",
    "туроператор Казахстан",
    "Астана",
    "Kazakhstan tours",
    "GVIDON TOUR",
  ],
  openGraph: {
    title: "GVIDON TOUR — путешествие в сердце Евразии",
    description:
      "От футуристичной Астаны до бескрайних степей, каньонов и горных озёр — авторские маршруты по всему Казахстану.",
    type: "website",
    url: SITE_URL,
    siteName: "GVIDON TOUR",
    images: [{ url: "/images/hero-astana.jpg", width: 2560, height: 1920 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GVIDON TOUR — путешествие в сердце Евразии",
    description:
      "От футуристичной Астаны до бескрайних степей, каньонов и горных озёр — авторские маршруты по всему Казахстану.",
    images: ["/images/hero-astana.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#00152F",
};

/** Pre-renders /ru, /en and /kk at build time. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/** Root layout for the public site: it owns <html> so that lang matches the
 *  locale in the URL. Admin has its own (see admin/layout.tsx). */
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
    <RootHtml lang={lang} jsonLd={jsonLdScript(ORGANIZATION_JSONLD)}>
      <LanguageProvider lang={lang}>
        <div className="min-h-screen">
          <a
            href="#site-content"
            className="fixed left-4 top-4 z-[200] -translate-y-24 rounded bg-gold px-4 py-2 font-bold text-onaccent shadow-lg transition-transform focus:translate-y-0"
          >
            {A11Y_LABELS[lang].skipToContent}
          </a>
          <Header />
          <div id="site-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
          <FloatingCta />
          <Analytics />
        </div>
      </LanguageProvider>
    </RootHtml>
  );
}
