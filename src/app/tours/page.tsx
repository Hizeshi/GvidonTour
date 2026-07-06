import type { Metadata } from "next";
import ToursPage from "@/components/pages/ToursPage";
import { getTours } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Туры",
  description:
    "Авторские туры по Казахстану: Астана, Алматы, Чарынский каньон, Кольсайские озёра, Туркестан, Мангистау и плато Бозжыра.",
};

export default async function Page() {
  const tours = await getTours();
  return <ToursPage tours={tours} />;
}
