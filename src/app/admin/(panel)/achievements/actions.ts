"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { LText } from "@/lib/catalog-types";
import { CATALOG_TAGS } from "@/lib/catalog-cache";

export interface AchievementFormPayload {
  title: LText;
  image: string;
  sortOrder: number;
}

export interface SaveResult {
  ok: boolean;
  error?: string;
  id?: string;
}

function revalidateAchievementPaths() {
  revalidatePath("/admin/achievements");
  updateTag(CATALOG_TAGS.achievements);
}

export async function saveAchievement(id: string | null, payload: AchievementFormPayload): Promise<SaveResult> {
  if (!(await getSession())) return { ok: false, error: "Сессия истекла — войдите заново" };
  if (!payload.title.ru.trim()) return { ok: false, error: "Укажите название на русском" };
  if (!payload.image.trim()) return { ok: false, error: "Укажите изображение" };

  const data = {
    title: payload.title,
    image: payload.image.trim(),
    sortOrder: Math.round(payload.sortOrder) || 0,
  };

  try {
    if (id) {
      await prisma.achievement.update({ where: { id }, data });
      revalidateAchievementPaths();
      return { ok: true, id };
    }
    const created = await prisma.achievement.create({ data });
    revalidateAchievementPaths();
    return { ok: true, id: created.id };
  } catch (err) {
    console.error("[achievements] save failed:", err);
    return { ok: false, error: "Не удалось сохранить" };
  }
}

export async function deleteAchievement(id: string) {
  if (!(await getSession())) return;
  await prisma.achievement.delete({ where: { id } }).catch(() => {});
  revalidateAchievementPaths();
}
