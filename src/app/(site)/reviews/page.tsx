import type { Metadata } from "next";
import ReviewsPage from "@/components/pages/ReviewsPage";
import { getReviews } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Отзывы гостей",
  description: "Отзывы путешественников о турах и экскурсиях GVIDON TOUR по Казахстану.",
};

export default async function Page() {
  const reviews = await getReviews();
  return <ReviewsPage reviews={reviews} />;
}
