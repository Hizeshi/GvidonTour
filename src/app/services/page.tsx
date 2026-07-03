import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Полный цикл организации путешествия по Казахстану: визовая поддержка, трансферы, гиды, отели, индивидуальные маршруты и гастрономия.",
};

export default function Page() {
  return <ServicesPage />;
}
