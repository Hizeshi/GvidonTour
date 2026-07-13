"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { getSession } from "@/lib/auth";
import { isBlockEmpty } from "@/lib/blog-blocks";
import { prisma } from "@/lib/db";
import type { BlogBlock, LText } from "@/lib/catalog-types";

export interface BlogPostFormPayload {
  slug: string;
  title: LText;
  excerpt: LText;
  content: BlogBlock[];
  image: string;
  publishedAt: string; // yyyy-mm-dd
  sortOrder: number;
  published: boolean;
}

export interface SaveResult {
  ok: boolean;
  error?: string;
  id?: string;
}

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function saveBlogPost(id: string | null, payload: BlogPostFormPayload): Promise<SaveResult> {
  if (!(await getSession())) return { ok: false, error: "Сессия истекла — войдите заново" };

  const slug = payload.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!slug) return { ok: false, error: "Укажите ЧПУ (slug)" };
  if (!payload.title.ru.trim()) return { ok: false, error: "Укажите заголовок на русском" };
  if (!payload.image.trim()) return { ok: false, error: "Укажите изображение" };

  const publishedAt = new Date(payload.publishedAt);
  if (Number.isNaN(publishedAt.getTime())) return { ok: false, error: "Некорректная дата публикации" };

  const data = {
    slug,
    title: payload.title,
    excerpt: payload.excerpt,
    content: payload.content.filter((b) => !isBlockEmpty(b)) as unknown as Prisma.InputJsonValue,
    image: payload.image.trim(),
    publishedAt,
    sortOrder: Math.round(payload.sortOrder) || 0,
    published: payload.published,
  };

  try {
    if (id) {
      await prisma.blogPost.update({ where: { id }, data });
      revalidateBlogPaths(slug);
      return { ok: true, id };
    }
    const created = await prisma.blogPost.create({ data });
    revalidateBlogPaths(slug);
    return { ok: true, id: created.id };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { ok: false, error: "Статья с таким ЧПУ (slug) уже существует" };
    }
    console.error("[blog] save failed:", err);
    return { ok: false, error: "Не удалось сохранить статью" };
  }
}

export async function deleteBlogPost(id: string) {
  if (!(await getSession())) return;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return;
  await prisma.blogPost.delete({ where: { id } }).catch(() => {});
  revalidateBlogPaths(post.slug);
}

export async function toggleBlogPublished(id: string) {
  if (!(await getSession())) return;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return;
  await prisma.blogPost.update({ where: { id }, data: { published: !post.published } });
  revalidateBlogPaths(post.slug);
}
