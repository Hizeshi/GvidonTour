"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/admin/Toast";
import { useState } from "react";
import { ExternalLink, Save } from "lucide-react";
import type { LText } from "@/lib/catalog-types";
import { addBtn, emptyLText, LTextField } from "@/components/admin/AdminFormFields";
import { slugify } from "@/lib/slugify";
import { cx, ui } from "@/lib/ui";
import { saveDirection, type DirectionFormPayload } from "./actions";

interface DirectionFormInitial {
  slug: string;
  name: LText;
  image: string;
  sortOrder: number;
}

export default function DirectionForm({
  directionId,
  initial,
}: {
  directionId: string | null;
  initial?: DirectionFormInitial;
}) {
  const router = useRouter();
  const toast = useToast();
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [name, setName] = useState<LText>(initial?.name ?? emptyLText());
  const [image, setImage] = useState(initial?.image ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setPending(true);
    setError(null);
    const payload: DirectionFormPayload = { slug, name, image, sortOrder: Number(sortOrder) };
    const result = await saveDirection(directionId, payload);
    setPending(false);
    if (!result.ok) {
      setError(result.error ?? "Не удалось сохранить");
      return;
    }
    toast.success(directionId ? "Город сохранён" : "Город добавлен");
    router.push("/admin/directions");
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
            <p className="mt-1.5 text-[12px] text-content/45">Используется в ссылке фильтра: /tours?city=slug</p>
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
          <div className="sm:col-span-2">
            <label className={ui.flabel}>Фото (URL)</label>
            <input className={ui.finput} value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Link
              href="/admin/media"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-content/60 hover:text-gold"
            >
              Открыть Медиа за ссылкой
              <span className="lic">
                <ExternalLink />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <LTextField label="Название города" value={name} onChange={setName} />
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
        <Link href="/admin/directions" className={ui.btnGhost}>
          Отмена
        </Link>
      </div>
    </div>
  );
}
