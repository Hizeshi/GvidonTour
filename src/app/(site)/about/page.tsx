import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "GVIDON TOUR — принимающий туроператор, который открывает Казахстан гостям со всего мира. 10+ лет на рынке, 50+ маршрутов, 14 регионов.",
};

export default function Page() {
  return <AboutPage />;
}
