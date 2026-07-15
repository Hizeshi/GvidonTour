"use server";

import { revalidatePath, updateTag } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { LText, TourDetails } from "@/lib/catalog-types";
import { CATALOG_TAGS } from "@/lib/catalog-cache";

export interface TourFormPayload {
  slug: string;
  categoryId: string | null;
  city: string | null;
  days: number;
  priceFrom: number;
  image: string;
  imagePos: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  region: LText;
  title: LText;
  desc: LText;
  duration: LText;
  priceText: LText;
  details: TourDetails;
}

export interface SaveResult {
  ok: boolean;
  error?: string;
  id?: string;
}

function revalidateTourPaths(_slug?: string) {
  revalidatePath("/admin/tours");
  updateTag(CATALOG_TAGS.tours);
}

export async function saveTour(id: string | null, payload: TourFormPayload): Promise<SaveResult> {
  if (!(await getSession())) return { ok: false, error: "Сессия истекла — войдите заново" };

  const slug = payload.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!slug) return { ok: false, error: "Укажите ЧПУ (slug), например astana-city" };
  if (!payload.title.ru.trim()) return { ok: false, error: "Укажите заголовок на русском" };
  if (!payload.image.trim()) return { ok: false, error: "Укажите изображение обложки" };

  const data = {
    slug,
    categoryId: payload.categoryId || null,
    city: payload.city || null,
    days: Math.max(1, Math.round(payload.days) || 1),
    priceFrom: Math.max(0, Math.round(payload.priceFrom) || 0),
    image: payload.image.trim(),
    imagePos: payload.imagePos.trim() || null,
    featured: payload.featured,
    published: payload.published,
    sortOrder: Math.round(payload.sortOrder) || 0,
    region: payload.region,
    title: payload.title,
    desc: payload.desc,
    duration: payload.duration,
    priceText: payload.priceText,
    details: payload.details as unknown as Prisma.InputJsonValue,
  };

  try {
    if (id) {
      await prisma.tour.update({ where: { id }, data });
      revalidateTourPaths(slug);
      return { ok: true, id };
    }
    const created = await prisma.tour.create({ data });
    revalidateTourPaths(slug);
    return { ok: true, id: created.id };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { ok: false, error: "Тур с таким ЧПУ (slug) уже существует" };
    }
    console.error("[tours] save failed:", err);
    return { ok: false, error: "Не удалось сохранить тур" };
  }
}

export async function deleteTour(id: string) {
  if (!(await getSession())) return;
  const tour = await prisma.tour.findUnique({ where: { id } });
  if (!tour) return;
  await prisma.tour.delete({ where: { id } }).catch(() => {});
  revalidateTourPaths(tour.slug);
}

export async function toggleTourField(id: string, field: "published" | "featured") {
  if (!(await getSession())) return;
  const tour = await prisma.tour.findUnique({ where: { id } });
  if (!tour) return;
  await prisma.tour.update({ where: { id }, data: { [field]: !tour[field] } });
  revalidateTourPaths(tour.slug);
}
