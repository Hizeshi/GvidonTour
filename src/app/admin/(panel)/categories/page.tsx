import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import IconByName from "@/components/IconByName";
import { deleteCategory } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Категории" };

export default async function AdminCategoriesPage() {
  let items;
  try {
    items = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    items = null;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className={cx(ui.serif, "text-[28px]")}>Категории</h1>
          <p className="mt-2 text-[14.5px] text-content/60">
            Виды туризма в блоке «Категории туров» и в фильтре каталога.
          </p>
        </div>
        <Link href="/admin/categories/new" className={ui.btnGold}>
          <span className="lic">
            <Plus />
          </span>
          Добавить категорию
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
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-gold/40 text-[20px] text-gold">
                  <IconByName name={item.icon} />
                </span>
                <div className="min-w-0 flex-1">
                  <Link href={`/admin/categories/${item.id}`} className="truncate text-[15px] font-bold hover:text-gold">
                    {name.ru || "(без названия)"}
                  </Link>
                  <div className="text-[12.5px] text-content/45">/{item.slug}</div>
                </div>
                <form action={deleteCategory.bind(null, item.id)}>
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
