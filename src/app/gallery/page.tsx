import type { Metadata } from "next";
import GalleryPage from "@/components/pages/GalleryPage";

export const metadata: Metadata = {
  title: "Галерея",
  description:
    "Пейзажи и города Казахстана: Байтерек, Чарынский каньон, Кольсайские озёра, плато Бозжыра, Хан Шатыр и Большое Алматинское озеро.",
};

export default function Page() {
  return <GalleryPage />;
}
