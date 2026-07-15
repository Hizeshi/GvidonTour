import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { CONTENT } from "@/lib/content";
import { isLocale, pageMetadata } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = CONTENT[lang];
  return pageMetadata(lang, "/services", t.services.title, t.services.intro);
}

export default function Page() {
  return <ServicesPage />;
}
