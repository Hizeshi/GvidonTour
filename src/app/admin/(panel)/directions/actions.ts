"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import type { LText } from "@/lib/catalog-types";

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
  revalidatePath("/"); // "Куда поехать в Казахстане" block
  revalidatePath("/tours"); // city filter
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
      await prisma.direction.update({ where: { id }, data });
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
  await prisma.direction.delete({ where: { id } }).catch(() => {});
  revalidateDirectionPaths();
}
