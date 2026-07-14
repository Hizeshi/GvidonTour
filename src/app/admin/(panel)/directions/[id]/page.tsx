import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import DirectionForm from "../DirectionForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Редактирование города" };

export default async function EditDirectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.direction.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>{(item.name as LText).ru || "Редактирование города"}</h1>
      <DirectionForm
        directionId={item.id}
        initial={{
          slug: item.slug,
          name: item.name as LText,
          image: item.image ?? "",
          sortOrder: item.sortOrder,
        }}
      />
    </div>
  );
}
