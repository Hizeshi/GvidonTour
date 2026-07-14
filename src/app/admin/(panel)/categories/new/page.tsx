import type { Metadata } from "next";
import { cx, ui } from "@/lib/ui";
import CategoryForm from "../CategoryForm";

export const metadata: Metadata = { title: "Новая категория" };

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>Новая категория</h1>
      <CategoryForm categoryId={null} />
    </div>
  );
}
