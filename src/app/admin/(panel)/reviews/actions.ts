"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { LText } from "@/lib/catalog-types";
import { CATALOG_TAGS } from "@/lib/catalog-cache";

export interface ReviewFormPayload {
  author: string;
  rating: number;
  text: LText;
  photo: string;
  videoUrl: string;
  published: boolean;
}

export interface SaveResult {
  ok: boolean;
  error?: string;
  id?: string;
}

function revalidateReviewPaths() {
  revalidatePath("/admin/reviews");
  updateTag(CATALOG_TAGS.reviews);
}

export async function saveReview(id: string | null, payload: ReviewFormPayload): Promise<SaveResult> {
  if (!(await getSession())) return { ok: false, error: "Сессия истекла — войдите заново" };
  if (!payload.author.trim()) return { ok: false, error: "Укажите имя автора" };
  if (!payload.text.ru.trim()) return { ok: false, error: "Укажите текст отзыва на русском" };

  const data = {
    author: payload.author.trim(),
    rating: Math.min(5, Math.max(1, Math.round(payload.rating) || 5)),
    text: payload.text,
    photo: payload.photo.trim() || null,
    videoUrl: payload.videoUrl.trim() || null,
    published: payload.published,
  };

  try {
    if (id) {
      await prisma.review.update({ where: { id }, data });
      revalidateReviewPaths();
      return { ok: true, id };
    }
    const created = await prisma.review.create({ data });
    revalidateReviewPaths();
    return { ok: true, id: created.id };
  } catch (err) {
    console.error("[reviews] save failed:", err);
    return { ok: false, error: "Не удалось сохранить" };
  }
}

export async function deleteReview(id: string) {
  if (!(await getSession())) return;
  await prisma.review.delete({ where: { id } }).catch(() => {});
  revalidateReviewPaths();
}

export async function toggleReviewPublished(id: string) {
  if (!(await getSession())) return;
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) return;
  await prisma.review.update({ where: { id }, data: { published: !review.published } });
  revalidateReviewPaths();
}
