import type { Metadata } from "next";
import Link from "next/link";
import { Eye, EyeOff, PlayCircle, Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import { deleteGalleryItem, toggleGalleryPublished } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Галерея" };

export default async function AdminGalleryPage() {
  let items;
  try {
    items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    items = null;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className={cx(ui.serif, "text-[28px]")}>Галерея</h1>
          <p className="mt-2 text-[14.5px] text-content/60">Фото и видео на странице «Галерея» сайта.</p>
        </div>
        <Link href="/admin/gallery/new" className={ui.btnGold}>
          <span className="lic">
            <Plus />
          </span>
          Добавить
        </Link>
      </div>

      {items === null ? (
        <p className="mt-10 text-content/60">База данных недоступна, попробуйте обновить страницу.</p>
      ) : items.length === 0 ? (
        <p className="mt-10 text-content/50">Пока пусто — добавьте первое фото или видео.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const caption = item.caption as LText;
            return (
              <div
                key={item.id}
                className={cx(
                  "overflow-hidden rounded-[5px] border bg-panel",
                  item.published ? "border-content/12" : "border-content/12 opacity-55"
                )}
              >
                <Link href={`/admin/gallery/${item.id}`} className="relative block h-[140px] overflow-hidden bg-black/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  {item.kind === "VIDEO" && (
                    <span className="lic absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[32px] text-white/90">
                      <PlayCircle />
                    </span>
                  )}
                </Link>
                <div className="p-3.5">
                  <Link href={`/admin/gallery/${item.id}`} className="block truncate text-[14px] font-bold hover:text-gold">
                    {caption?.ru || "(без подписи)"}
                  </Link>
                  <div className="mt-3 flex items-center gap-2">
                    <form action={toggleGalleryPublished.bind(null, item.id)}>
                      <button
                        type="submit"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[3px] text-content/50 transition-colors hover:bg-gold/10 hover:text-gold"
                        title={item.published ? "Снять с публикации" : "Опубликовать"}
                      >
                        <span className="lic text-[15px]">{item.published ? <Eye /> : <EyeOff />}</span>
                      </button>
                    </form>
                    <form action={deleteGalleryItem.bind(null, item.id)}>
                      <button
                        type="submit"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[3px] text-content/40 transition-colors hover:bg-red-400/10 hover:text-red-400"
                        title="Удалить"
                      >
                        <span className="lic text-[15px]">
                          <Trash2 />
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
