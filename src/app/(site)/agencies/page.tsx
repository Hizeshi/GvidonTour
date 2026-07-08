import type { Metadata } from "next";
import AgenciesPage from "@/components/pages/AgenciesPage";

export const metadata: Metadata = {
  title: "Для агентств",
  description:
    "Партнёрство с GVIDON TOUR для турагентств: комиссионное вознаграждение, персональный менеджер, маркетинговые материалы и прозрачные условия сотрудничества.",
};

export default function Page() {
  return <AgenciesPage />;
}
