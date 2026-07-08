import type { Metadata } from "next";
import ContactsPage from "@/components/pages/ContactsPage";
import { getTours } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с GVIDON TOUR: г. Астана, пр. Тауелсыздык 3–402, +7 701 362 67 25, gvidontour.kz@gmail.com. Работаем по всему Казахстану.",
};

export default async function Page() {
  const tours = await getTours();
  return <ContactsPage tourTitles={tours.map((tour) => tour.title)} />;
}
