import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    images: [{ url: "/images/hero-astana.jpg", width: 2560, height: 1920 }],
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
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen">
              <Header />
              {children}
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
