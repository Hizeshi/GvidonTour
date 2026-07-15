import type { Metadata } from "next";
import AgenciesPage from "@/components/pages/AgenciesPage";
import { CONTENT } from "@/lib/content";
import { isLocale, pageMetadata, toLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = CONTENT[lang];
  return pageMetadata(lang, "/agencies", t.agencies.title, t.agencies.intro);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <AgenciesPage lang={toLocale(lang)} />;
}
