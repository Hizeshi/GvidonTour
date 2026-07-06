import HomePage from "@/components/pages/HomePage";
import { getTours } from "@/lib/catalog";

export const revalidate = 300;

export default async function Page() {
  const tours = await getTours();
  return <HomePage tours={tours} />;
}
