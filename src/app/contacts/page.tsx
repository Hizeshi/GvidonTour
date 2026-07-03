import type { Metadata } from "next";
import ContactsPage from "@/components/pages/ContactsPage";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с GVIDON TOUR: г. Астана, пр. Тауелсыздык 3–402, +7 701 362 67 25, Tatiana.gvidon@gmail.com. Работаем по всему Казахстану.",
};

export default function Page() {
  return <ContactsPage />;
}
