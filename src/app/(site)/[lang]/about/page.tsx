import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { CONTENT } from "@/lib/content";
import { isLocale, pageMetadata } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = CONTENT[lang];
  return pageMetadata(lang, "/about", t.about.title, t.about.intro);
}

export default function Page() {
  return <AboutPage />;
}
