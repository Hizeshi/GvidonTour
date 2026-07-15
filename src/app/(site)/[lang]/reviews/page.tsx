import type { Metadata } from "next";
import ReviewsPage from "@/components/pages/ReviewsPage";
import { getReviews } from "@/lib/catalog";
import { CONTENT } from "@/lib/content";
import { isLocale, pageMetadata } from "@/lib/i18n";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = CONTENT[lang];
  return pageMetadata(lang, "/reviews", t.reviewsPage.title, t.reviewsPage.intro);
}

export default async function Page() {
  const reviews = await getReviews();
  return <ReviewsPage reviews={reviews} />;
}
