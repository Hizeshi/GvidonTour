import type { Metadata } from "next";
import Link from "next/link";
import { Eye, EyeOff, Plus, Star, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import { deleteTour, toggleTourField } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Туры" };

export default async function AdminToursPage() {
  let tours;
  try {
    tours = await prisma.tour.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: { category: { select: { name: true } } },
    });
  } catch {
    tours = null;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className={cx(ui.serif, "text-[28px]")}>Туры</h1>
          <p className="mt-2 text-[14.5px] text-content/60">
            Список туров и экскурсий. Изменения появляются на сайте сразу после сохранения.
          </p>
        </div>
        <Link href="/admin/tours/new" className={ui.btnGold}>
          <span className="lic">
            <Plus />
          </span>
          Новый тур
        </Link>
      </div>

      {tours === null ? (
        <p className="mt-10 text-content/60">База данных недоступна, попробуйте обновить страницу.</p>
      ) : tours.length === 0 ? (
        <p className="mt-10 text-content/50">Туров пока нет — создайте первый.</p>
      ) : (
        <div className="mt-8 space-y-2.5">
          {tours.map((tour) => {
            const title = tour.title as LText;
            return (
              <div
                key={tour.id}
                className={cx(
                  "flex items-center gap-4 rounded-[5px] border bg-panel p-3.5",
                  tour.published ? "border-content/12" : "border-content/12 opacity-55"
                )}
              >
                <div className="relative h-[54px] w-[76px] flex-none overflow-hidden rounded-[3px] bg-content/10">
                  {tour.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={tour.image} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/tours/${tour.id}`} className="truncate text-[15px] font-bold hover:text-gold">
                      {title.ru || "(без названия)"}
                    </Link>
                    {tour.featured && (
                      <span className="lic flex-none text-[13px] text-gold" title="Избранный">
                        <Star fill="currentColor" />
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-[12.5px] text-content/50">
                    /{tour.slug} · {tour.days} дн. · от {tour.priceFrom.toLocaleString("ru-RU")} ₸
                    {tour.category && ` · ${(tour.category.name as LText).ru}`}
                  </div>
                </div>
                <form action={toggleTourField.bind(null, tour.id, "featured")}>
                  <button
                    type="submit"
                    className="flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-[3px] text-content/50 transition-colors hover:bg-gold/10 hover:text-gold"
                    title={tour.featured ? "Убрать из избранного" : "Сделать избранным"}
                  >
                    <span className="lic text-[16px]">
                      <Star fill={tour.featured ? "currentColor" : "none"} />
                    </span>
                  </button>
                </form>
                <form action={toggleTourField.bind(null, tour.id, "published")}>
                  <button
                    type="submit"
                    className="flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-[3px] text-content/50 transition-colors hover:bg-gold/10 hover:text-gold"
                    title={tour.published ? "Снять с публикации" : "Опубликовать"}
                  >
                    <span className="lic text-[16px]">{tour.published ? <Eye /> : <EyeOff />}</span>
                  </button>
                </form>
                <form action={deleteTour.bind(null, tour.id)}>
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
