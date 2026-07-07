import HomePage from "@/components/pages/HomePage";
import { getCategories, getDirections, getReviews, getTours } from "@/lib/catalog";

export const revalidate = 300;

export default async function Page() {
  const [tours, categories, directions, reviews] = await Promise.all([
    getTours(),
    getCategories(),
    getDirections(),
    getReviews(),
  ]);
  return (
    <HomePage tours={tours} categories={categories} directions={directions} reviews={reviews} />
  );
}
