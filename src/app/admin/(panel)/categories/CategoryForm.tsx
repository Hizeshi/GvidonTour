"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save } from "lucide-react";
import type { LText } from "@/lib/catalog-types";
import { addBtn, emptyLText, LTextField } from "@/components/admin/AdminFormFields";
import IconByName, { ICON_NAMES } from "@/components/IconByName";
import { slugify } from "@/lib/slugify";
import { cx, ui } from "@/lib/ui";
import { saveCategory, type CategoryFormPayload } from "./actions";

interface CategoryFormInitial {
  slug: string;
  name: LText;
  icon: string;
  sortOrder: number;
}

export default function CategoryForm({
  categoryId,
  initial,
}: {
  categoryId: string | null;
  initial?: CategoryFormInitial;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [name, setName] = useState<LText>(initial?.name ?? emptyLText());
  const [icon, setIcon] = useState(initial?.icon ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setPending(true);
    setError(null);
    const payload: CategoryFormPayload = { slug, name, icon, sortOrder: Number(sortOrder) };
    const result = await saveCategory(categoryId, payload);
    setPending(false);
    if (!result.ok) {
      setError(result.error ?? "Не удалось сохранить");
      return;
    }
    router.push("/admin/categories");
    router.refresh();
  };

  return (
    <div className="max-w-[700px] space-y-6">
      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={ui.flabel}>ЧПУ (slug)</label>
            <div className="flex gap-2">
              <input className={ui.finput} value={slug} onChange={(e) => setSlug(e.target.value)} />
              <button
                type="button"
                onClick={() => setSlug(slugify(name.ru))}
                disabled={!name.ru}
                className={cx(addBtn, "flex-none", !name.ru && "pointer-events-none opacity-40")}
              >
                Из названия
              </button>
            </div>
            <p className="mt-1.5 text-[12px] text-content/45">Используется в ссылке фильтра: /tours?category=slug</p>
          </div>
          <div>
            <label className={ui.flabel}>Порядок сортировки</label>
            <input
              type="number"
              className={ui.finput}
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />
          </div>
        </div>
      </section>

      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <LTextField label="Название категории" value={name} onChange={setName} />
      </section>

      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <label className={ui.flabel}>Иконка</label>
        <div className="mt-1 grid grid-cols-6 gap-2 sm:grid-cols-9">
          {ICON_NAMES.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setIcon(n)}
              title={n}
              className={cx(
                "flex aspect-square cursor-pointer items-center justify-center rounded-[4px] border text-[20px] transition-colors",
                icon === n
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-content/12 text-content/60 hover:border-gold/50 hover:text-gold"
              )}
            >
              <IconByName name={n} />
            </button>
          ))}
        </div>
      </section>

      {error && (
        <p className="rounded-[5px] border border-red-400/40 bg-red-400/5 px-4 py-3 text-[14px] font-semibold text-red-400">
          {error}
        </p>
      )}

      <div className="flex gap-3 pb-10">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={pending}
          className={cx(ui.btnGold, pending && "pointer-events-none opacity-60")}
        >
          {pending ? "Сохранение..." : "Сохранить"}
          <span className="lic">
            <Save />
          </span>
        </button>
        <Link href="/admin/categories" className={ui.btnGhost}>
          Отмена
        </Link>
      </div>
    </div>
  );
}
