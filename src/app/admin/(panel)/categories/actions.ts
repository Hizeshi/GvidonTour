"use server";

import { revalidatePath, updateTag } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import type { LText } from "@/lib/catalog-types";
import { CATALOG_TAGS } from "@/lib/catalog-cache";

export interface CategoryFormPayload {
  slug: string;
  name: LText;
  icon: string;
  sortOrder: number;
}

export interface SaveResult {
  ok: boolean;
  error?: string;
  id?: string;
}

function revalidateCategoryPaths() {
  revalidatePath("/admin/categories");
  updateTag(CATALOG_TAGS.categories);
  updateTag(CATALOG_TAGS.tours);
}

export async function saveCategory(id: string | null, payload: CategoryFormPayload): Promise<SaveResult> {
  if (!(await getSession())) return { ok: false, error: "Сессия истекла — войдите заново" };

  const slug = slugify(payload.slug);
  if (!slug) return { ok: false, error: "Укажите ЧПУ (slug)" };
  if (!payload.name.ru.trim()) return { ok: false, error: "Укажите название на русском" };
  if (!payload.icon.trim()) return { ok: false, error: "Выберите иконку" };

  const data = {
    slug,
    name: payload.name,
    icon: payload.icon.trim(),
    sortOrder: Math.round(payload.sortOrder) || 0,
  };

  try {
    if (id) {
      await prisma.category.update({ where: { id }, data });
      revalidateCategoryPaths();
      return { ok: true, id };
    }
    const created = await prisma.category.create({ data });
    revalidateCategoryPaths();
    return { ok: true, id: created.id };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { ok: false, error: "Категория с таким ЧПУ (slug) уже существует" };
    }
    console.error("[categories] save failed:", err);
    return { ok: false, error: "Не удалось сохранить" };
  }
}

export async function deleteCategory(id: string) {
  if (!(await getSession())) return;
  try {
    // Explicitly unlink any tours in this category first, so the delete never
    // hits a foreign-key restriction regardless of how the FK was created.
    await prisma.tour.updateMany({ where: { categoryId: id }, data: { categoryId: null } });
    await prisma.category.delete({ where: { id } });
  } catch (err) {
    console.error("[categories] delete failed:", err);
  }
  revalidateCategoryPaths();
}
