import type { Metadata } from "next";
import GalleryPage from "@/components/pages/GalleryPage";
import { getGalleryItems } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Галерея",
  description:
    "Пейзажи и города Казахстана: Байтерек, Чарынский каньон, Кольсайские озёра, плато Бозжыра, Хан Шатыр и Большое Алматинское озеро.",
};

export default async function Page() {
  const items = await getGalleryItems();
  return <GalleryPage items={items} />;
}
