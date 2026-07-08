import HomePage from "@/components/pages/HomePage";
import { getAchievements, getCategories, getDirections, getReviews, getTours } from "@/lib/catalog";

export const revalidate = 300;

export default async function Page() {
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
    />
  );
}
