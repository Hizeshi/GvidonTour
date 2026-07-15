import type { Metadata } from "next";
import { Suspense } from "react";
import ToursPage from "@/components/pages/ToursPage";
import { getCategories, getDirections, getTours } from "@/lib/catalog";
import { CONTENT } from "@/lib/content";
import { isLocale, pageMetadata } from "@/lib/i18n";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = CONTENT[lang];
  return pageMetadata(lang, "/tours", t.toursPage.title, t.toursPage.intro);
}

export default async function Page() {
  const [tours, categories, directions] = await Promise.all([getTours(), getCategories(), getDirections()]);
  return (
    <Suspense fallback={null}>
      <ToursPage tours={tours} categories={categories} directions={directions} />
    </Suspense>
  );
}
