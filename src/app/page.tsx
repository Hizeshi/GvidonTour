import HomePage from "@/components/pages/HomePage";
import { getCategories, getDirections, getTours } from "@/lib/catalog";

export const revalidate = 300;

export default async function Page() {
  const [tours, categories, directions] = await Promise.all([
    getTours(),
    getCategories(),
    getDirections(),
  ]);
  return <HomePage tours={tours} categories={categories} directions={directions} />;
}
