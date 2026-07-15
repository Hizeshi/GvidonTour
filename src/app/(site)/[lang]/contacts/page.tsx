import type { Metadata } from "next";
import ContactsPage from "@/components/pages/ContactsPage";
import { getTours } from "@/lib/catalog";
import { CONTENT } from "@/lib/content";
import { isLocale, pageMetadata } from "@/lib/i18n";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = CONTENT[lang];
  return pageMetadata(lang, "/contacts", t.contacts.title, t.contacts.intro);
}

export default async function Page() {
  const tours = await getTours();
  return <ContactsPage tourTitles={tours.map((tour) => tour.title)} />;
}
