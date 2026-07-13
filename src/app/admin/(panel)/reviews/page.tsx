import type { Metadata } from "next";
import Link from "next/link";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import { deleteReview, toggleReviewPublished } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Отзывы" };

export default async function AdminReviewsPage() {
  let reviews;
  try {
    reviews = await prisma.review.findMany({ orderBy: { date: "desc" } });
  } catch {
    reviews = null;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className={cx(ui.serif, "text-[28px]")}>Отзывы</h1>
          <p className="mt-2 text-[14.5px] text-content/60">Отзывы гостей на главной странице сайта.</p>
        </div>
        <Link href="/admin/reviews/new" className={ui.btnGold}>
          <span className="lic">
            <Plus />
          </span>
          Новый отзыв
        </Link>
      </div>

      {reviews === null ? (
        <p className="mt-10 text-content/60">База данных недоступна, попробуйте обновить страницу.</p>
      ) : reviews.length === 0 ? (
        <p className="mt-10 text-content/50">Отзывов пока нет.</p>
      ) : (
        <div className="mt-8 space-y-2.5">
          {reviews.map((review) => {
            const text = review.text as LText;
            return (
              <div
                key={review.id}
                className={cx(
                  "flex items-start gap-4 rounded-[5px] border bg-panel p-3.5",
                  review.published ? "border-content/12" : "border-content/12 opacity-55"
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/reviews/${review.id}`} className="truncate text-[15px] font-bold hover:text-gold">
                      {review.author}
                    </Link>
                    <span className="flex-none text-[13px] tracking-[1px] text-gold">
                      {"★".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[13px] text-content/60">{text.ru}</p>
                </div>
                <form action={toggleReviewPublished.bind(null, review.id)}>
                  <button
                    type="submit"
                    className="flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-[3px] text-content/50 transition-colors hover:bg-gold/10 hover:text-gold"
                    title={review.published ? "Снять с публикации" : "Опубликовать"}
                  >
                    <span className="lic text-[16px]">{review.published ? <Eye /> : <EyeOff />}</span>
                  </button>
                </form>
                <form action={deleteReview.bind(null, review.id)}>
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
