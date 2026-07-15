import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { getAchievements, getCategories, getDirections, getReviews, getTours } from "@/lib/catalog";
import { CONTENT } from "@/lib/content";
import { isLocale, pageMetadata, toLocale } from "@/lib/i18n";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = CONTENT[lang];
  // The home page owns the site title, so it opts out of the "%s — GVIDON TOUR"
  // template that the other pages use.
  return {
    ...pageMetadata(lang, "/", t.hero.title, t.hero.sub),
    title: { absolute: `GVIDON TOUR — ${t.hero.title}` },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const [tours, categories, directions, reviews, achievements] = await Promise.all([
    getTours(),
    getCategories(),
    getDirections(),
    getReviews(),
    getAchievements(),
  ]);
  return (
    <HomePage
      tours={tours}
      categories={categories}
      directions={directions}
      reviews={reviews}
      achievements={achievements}
      lang={toLocale(lang)}
    />
  );
}
