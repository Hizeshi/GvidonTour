"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { LText } from "@/lib/catalog-types";
import { CATALOG_TAGS } from "@/lib/catalog-cache";

export interface GalleryFormPayload {
  kind: "PHOTO" | "VIDEO";
  src: string;
  videoUrl: string;
  caption: LText;
  span: string;
  sortOrder: number;
  published: boolean;
}

export interface SaveResult {
  ok: boolean;
  error?: string;
  id?: string;
}

function revalidateGalleryPaths() {
  revalidatePath("/admin/gallery");
  updateTag(CATALOG_TAGS.gallery);
}

export async function saveGalleryItem(id: string | null, payload: GalleryFormPayload): Promise<SaveResult> {
  if (!(await getSession())) return { ok: false, error: "Сессия истекла — войдите заново" };
  if (!payload.src.trim()) return { ok: false, error: "Укажите изображение" };
  if (payload.kind === "VIDEO" && !payload.videoUrl.trim()) {
    return { ok: false, error: "Для видео укажите ссылку на файл или YouTube/Vimeo" };
  }

  const data = {
    kind: payload.kind,
    src: payload.src.trim(),
    videoUrl: payload.kind === "VIDEO" ? payload.videoUrl.trim() : null,
    caption: payload.caption,
    span: payload.span.trim() || null,
    sortOrder: Math.round(payload.sortOrder) || 0,
    published: payload.published,
  };

  try {
    if (id) {
      await prisma.galleryItem.update({ where: { id }, data });
      revalidateGalleryPaths();
      return { ok: true, id };
    }
    const created = await prisma.galleryItem.create({ data });
    revalidateGalleryPaths();
    return { ok: true, id: created.id };
  } catch (err) {
    console.error("[gallery] save failed:", err);
    return { ok: false, error: "Не удалось сохранить" };
  }
}

export async function deleteGalleryItem(id: string) {
  if (!(await getSession())) return;
  await prisma.galleryItem.delete({ where: { id } }).catch(() => {});
  revalidateGalleryPaths();
}

export async function toggleGalleryPublished(id: string) {
  if (!(await getSession())) return;
  const item = await prisma.galleryItem.findUnique({ where: { id } });
  if (!item) return;
  await prisma.galleryItem.update({ where: { id }, data: { published: !item.published } });
  revalidateGalleryPaths();
}
