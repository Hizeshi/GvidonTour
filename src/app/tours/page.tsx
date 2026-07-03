import type { Metadata } from "next";
import ToursPage from "@/components/pages/ToursPage";

export const metadata: Metadata = {
  title: "Туры",
  description:
    "Авторские туры по Казахстану: Астана, Алматы, Чарынский каньон, Кольсайские озёра, Туркестан, Мангистау и плато Бозжыра.",
};

export default function Page() {
  return <ToursPage />;
}
