import type { Metadata } from "next";
import { Suspense } from "react";
import ToursPage from "@/components/pages/ToursPage";
import { getCategories, getTours } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Туры",
  description:
    "Авторские туры по Казахстану: Астана, Алматы, Чарынский каньон, Кольсайские озёра, Туркестан, Мангистау и плато Бозжыра.",
};

export default async function Page() {
  const [tours, categories] = await Promise.all([getTours(), getCategories()]);
  return (
    <Suspense fallback={null}>
      <ToursPage tours={tours} categories={categories} />
    </Suspense>
  );
}
