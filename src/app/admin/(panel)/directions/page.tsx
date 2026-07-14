import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import { deleteDirection } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Города" };

export default async function AdminDirectionsPage() {
  let items;
  try {
    items = await prisma.direction.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    items = null;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className={cx(ui.serif, "text-[28px]")}>Города</h1>
          <p className="mt-2 text-[14.5px] text-content/60">
            Направления в блоке «Куда поехать в Казахстане» и в фильтре каталога по городу.
          </p>
        </div>
        <Link href="/admin/directions/new" className={ui.btnGold}>
          <span className="lic">
            <Plus />
          </span>
          Добавить город
        </Link>
      </div>

      {items === null ? (
        <p className="mt-10 text-content/60">База данных недоступна, попробуйте обновить страницу.</p>
      ) : items.length === 0 ? (
        <p className="mt-10 text-content/50">Пока пусто.</p>
      ) : (
        <div className="mt-8 space-y-2.5">
          {items.map((item) => {
            const name = item.name as LText;
            return (
              <div key={item.id} className="flex items-center gap-4 rounded-[5px] border border-content/12 bg-panel p-3.5">
                <div className="h-12 w-16 flex-none overflow-hidden rounded-[3px] bg-content/5">
                  {item.image ? (
                    <Image src={item.image} alt="" width={64} height={48} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-content/25">
                      <span className="lic text-[18px]">
                        <MapPin />
                      </span>
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/admin/directions/${item.id}`} className="truncate text-[15px] font-bold hover:text-gold">
                    {name.ru || "(без названия)"}
                  </Link>
                  <div className="text-[12.5px] text-content/45">/{item.slug}</div>
                </div>
                <form action={deleteDirection.bind(null, item.id)}>
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
