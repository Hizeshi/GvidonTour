"use server";

import { revalidatePath, updateTag } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import type { LText } from "@/lib/catalog-types";
import { CATALOG_TAGS } from "@/lib/catalog-cache";

export interface DirectionFormPayload {
  slug: string;
  name: LText;
  image: string;
  sortOrder: number;
}

export interface SaveResult {
  ok: boolean;
  error?: string;
  id?: string;
}

function revalidateDirectionPaths() {
  revalidatePath("/admin/directions");
  updateTag(CATALOG_TAGS.directions);
  updateTag(CATALOG_TAGS.tours);
}

export async function saveDirection(id: string | null, payload: DirectionFormPayload): Promise<SaveResult> {
  if (!(await getSession())) return { ok: false, error: "Сессия истекла — войдите заново" };

  const slug = slugify(payload.slug);
  if (!slug) return { ok: false, error: "Укажите ЧПУ (slug)" };
  if (!payload.name.ru.trim()) return { ok: false, error: "Укажите название на русском" };

  const data = {
    slug,
    name: payload.name,
    image: payload.image.trim() || null,
    sortOrder: Math.round(payload.sortOrder) || 0,
  };

  try {
    if (id) {
      // Tour.city stores the direction's *slug*, not a foreign key, so nothing
      // in the database keeps the two in step: renaming a slug silently strips
      // every tour of its city. Carry the tours over in the same transaction.
      const current = await prisma.direction.findUnique({ where: { id }, select: { slug: true } });
      await prisma.$transaction([
        prisma.direction.update({ where: { id }, data }),
        ...(current && current.slug !== slug
          ? [prisma.tour.updateMany({ where: { city: current.slug }, data: { city: slug } })]
          : []),
      ]);
      revalidateDirectionPaths();
      return { ok: true, id };
    }
    const created = await prisma.direction.create({ data });
    revalidateDirectionPaths();
    return { ok: true, id: created.id };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { ok: false, error: "Город с таким ЧПУ (slug) уже существует" };
    }
    console.error("[directions] save failed:", err);
    return { ok: false, error: "Не удалось сохранить" };
  }
}

export async function deleteDirection(id: string) {
  if (!(await getSession())) return;
  try {
    // Same missing link as in saveDirection: deleting the city used to leave
    // its slug behind on every tour that pointed at it. Those tours matched no
    // city filter and no longer had a city to be edited back to — invisible,
    // but still in the database. Clearing the field puts them back in "all
    // tours", where the admin can reassign them.
    const direction = await prisma.direction.findUnique({ where: { id }, select: { slug: true } });
    await prisma.$transaction([
      ...(direction
        ? [prisma.tour.updateMany({ where: { city: direction.slug }, data: { city: null } })]
        : []),
      prisma.direction.delete({ where: { id } }),
    ]);
  } catch (err) {
    console.error("[directions] delete failed:", err);
  }
  revalidateDirectionPaths();
}
