import type { Metadata } from "next";
import Link from "next/link";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import { deleteBlogPost, toggleBlogPublished } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Блог" };

const dateFmt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export default async function AdminBlogPage() {
  let posts;
  try {
    posts = await prisma.blogPost.findMany({ orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }] });
  } catch {
    posts = null;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className={cx(ui.serif, "text-[28px]")}>Блог</h1>
          <p className="mt-2 text-[14.5px] text-content/60">Статьи в разделе «Блог» сайта.</p>
        </div>
        <Link href="/admin/blog/new" className={ui.btnGold}>
          <span className="lic">
            <Plus />
          </span>
          Новая статья
        </Link>
      </div>

      {posts === null ? (
        <p className="mt-10 text-content/60">База данных недоступна, попробуйте обновить страницу.</p>
      ) : posts.length === 0 ? (
        <p className="mt-10 text-content/50">Статей пока нет.</p>
      ) : (
        <div className="mt-8 space-y-2.5">
          {posts.map((post) => {
            const title = post.title as LText;
            return (
              <div
                key={post.id}
                className={cx(
                  "flex items-center gap-4 rounded-[5px] border bg-panel p-3.5",
                  post.published ? "border-content/12" : "border-content/12 opacity-55"
                )}
              >
                <div className="relative h-[54px] w-[76px] flex-none overflow-hidden rounded-[3px] bg-content/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/admin/blog/${post.id}`} className="truncate text-[15px] font-bold hover:text-gold">
                    {title.ru || "(без названия)"}
                  </Link>
                  <div className="mt-0.5 truncate text-[12.5px] text-content/50">
                    /{post.slug} · {dateFmt.format(post.publishedAt)}
                  </div>
                </div>
                <form action={toggleBlogPublished.bind(null, post.id)}>
                  <button
                    type="submit"
                    className="flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-[3px] text-content/50 transition-colors hover:bg-gold/10 hover:text-gold"
                    title={post.published ? "Снять с публикации" : "Опубликовать"}
                  >
                    <span className="lic text-[16px]">{post.published ? <Eye /> : <EyeOff />}</span>
                  </button>
                </form>
                <form action={deleteBlogPost.bind(null, post.id)}>
                  <button
                    type="submit"
                    className="flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-[3px] text-content/40 transition-colors hover:bg-red-400/10 hover:text-red-400"
                    title="Удалить"
                  >
                    <span className="lic text-[16px]">
                      <Trash2 />
                    </span>
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
