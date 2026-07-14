import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import CategoryForm from "../CategoryForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Редактирование категории" };

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.category.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>{(item.name as LText).ru || "Редактирование категории"}</h1>
      <CategoryForm
        categoryId={item.id}
        initial={{
          slug: item.slug,
          name: item.name as LText,
          icon: item.icon,
          sortOrder: item.sortOrder,
        }}
      />
    </div>
  );
}
