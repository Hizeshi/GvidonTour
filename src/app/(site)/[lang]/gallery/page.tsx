import type { Metadata } from "next";
import GalleryPage from "@/components/pages/GalleryPage";
import { getGalleryItems } from "@/lib/catalog";
import { CONTENT } from "@/lib/content";
import { isLocale, pageMetadata, toLocale } from "@/lib/i18n";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = CONTENT[lang];
  return pageMetadata(lang, "/gallery", t.gallery.title, t.gallery.intro);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const items = await getGalleryItems();
  return <GalleryPage items={items} lang={locale} t={CONTENT[locale]} />;
}
