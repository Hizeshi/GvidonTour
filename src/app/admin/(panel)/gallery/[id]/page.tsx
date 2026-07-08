import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import GalleryItemForm from "../GalleryItemForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Редактирование" };

export default async function EditGalleryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>{(item.caption as LText).ru || "Редактирование"}</h1>
      <GalleryItemForm
        itemId={item.id}
        initial={{
          kind: item.kind,
          src: item.src,
          videoUrl: item.videoUrl,
          caption: item.caption as LText,
          span: item.span,
          sortOrder: item.sortOrder,
          published: item.published,
        }}
      />
    </div>
  );
}
