import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { EMAIL, PHONE } from "@/lib/content";
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

// Runs before paint: applies the saved theme so there is no light/dark flash.
const NO_FLASH = `(function(){try{if(localStorage.getItem("gv_theme")==="light")document.documentElement.classList.add("light")}catch(e){}})()`;

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(ORGANIZATION_JSONLD) }}
        />
      </head>
      <body>
        {/* LanguageProvider lives in (site)/[lang]/layout.tsx — the language
            comes from the URL. Admin is Russian-only and needs no provider. */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
