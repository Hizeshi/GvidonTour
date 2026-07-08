"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { LANGS } from "@/lib/content";
import type { LText, PriceRow, ProgramStep, TourDetails } from "@/lib/catalog-types";
import { cx, ui } from "@/lib/ui";
import { addBtn, emptyLText, LTextField, LTextListEditor, removeBtn } from "@/components/admin/AdminFormFields";
import { saveTour, type TourFormPayload } from "./actions";

function ProgramEditor({ items, onChange }: { items: ProgramStep[]; onChange: (items: ProgramStep[]) => void }) {
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <span className={ui.flabel}>Программа по дням</span>
        <button
          type="button"
          onClick={() => onChange([...items, { time: "", text: emptyLText() }])}
          className={addBtn}
        >
          <span className="lic">
            <Plus />
          </span>
          Добавить пункт
        </button>
      </div>
      <div className="space-y-3">
        {items.map((step, i) => (
          <div key={i} className="rounded-[3px] border border-content/12 p-3">
            <div className="flex items-center gap-2.5">
              <input
                className={cx(ui.finput, "max-w-[140px]")}
                placeholder="09:00 или День 1"
                value={step.time}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], time: e.target.value };
                  onChange(next);
                }}
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                className={removeBtn}
              >
                <span className="lic">
                  <Trash2 />
                </span>
              </button>
            </div>
            <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {LANGS.map((lang) => (
                <textarea
                  key={lang}
                  className={cx(ui.finput, "min-h-[60px] resize-y")}
                  placeholder={lang.toUpperCase()}
                  value={step.text[lang]}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], text: { ...next[i].text, [lang]: e.target.value } };
                    onChange(next);
                  }}
                />
              ))}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-[13px] text-content/40">Пока пусто.</p>}
      </div>
    </div>
  );
}

function PriceTableEditor({ items, onChange }: { items: PriceRow[]; onChange: (items: PriceRow[]) => void }) {
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <span className={ui.flabel}>Таблица цен</span>
        <button
          type="button"
          onClick={() => onChange([...items, { group: emptyLText(), price: "" }])}
          className={addBtn}
        >
          <span className="lic">
            <Plus />
          </span>
          Добавить строку
        </button>
      </div>
      <div className="space-y-2.5">
        {items.map((row, i) => (
          <div key={i} className="flex items-start gap-2.5 rounded-[3px] border border-content/12 p-2.5">
            <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3">
              {LANGS.map((lang) => (
                <input
                  key={lang}
                  className={ui.finput}
                  placeholder={`Группа, ${lang.toUpperCase()}`}
                  value={row.group[lang]}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], group: { ...next[i].group, [lang]: e.target.value } };
                    onChange(next);
                  }}
                />
              ))}
            </div>
            <input
              className={cx(ui.finput, "max-w-[150px]")}
              placeholder="Цена"
              value={row.price}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...next[i], price: e.target.value };
                onChange(next);
              }}
            />
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className={removeBtn}>
              <span className="lic">
                <Trash2 />
              </span>
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-[13px] text-content/40">Пока пусто.</p>}
      </div>
    </div>
  );
}

const RU_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
  х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((c) => RU_TO_LATIN[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface CategoryOption {
  id: string;
  name: LText;
}
interface CityOption {
  slug: string;
  name: LText;
}

interface TourFormInitial {
  slug: string;
  categoryId: string | null;
  city: string | null;
  days: number;
  priceFrom: number;
  image: string;
  imagePos: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  region: LText;
  title: LText;
  desc: LText;
  duration: LText;
  priceText: LText;
  details: TourDetails | null;
}

export default function TourForm({
  tourId,
  categories,
  cities,
  initial,
}: {
  tourId: string | null;
  categories: CategoryOption[];
  cities: CityOption[];
  initial?: TourFormInitial;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  const [days, setDays] = useState(initial?.days ?? 1);
  const [priceFrom, setPriceFrom] = useState(initial?.priceFrom ?? 0);
  const [image, setImage] = useState(initial?.image ?? "");
  const [imagePos, setImagePos] = useState(initial?.imagePos ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [published, setPublished] = useState(initial?.published ?? true);
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);

  const [region, setRegion] = useState<LText>(initial?.region ?? emptyLText());
  const [title, setTitle] = useState<LText>(initial?.title ?? emptyLText());
  const [desc, setDesc] = useState<LText>(initial?.desc ?? emptyLText());
  const [duration, setDuration] = useState<LText>(initial?.duration ?? emptyLText());
  const [priceText, setPriceText] = useState<LText>(initial?.priceText ?? emptyLText());

  const [route, setRoute] = useState<LText>(initial?.details?.route ?? emptyLText());
  const [startPlace, setStartPlace] = useState<LText>(initial?.details?.startPlace ?? emptyLText());
  const [about, setAbout] = useState<LText>(initial?.details?.about ?? emptyLText());
  const [galleryText, setGalleryText] = useState((initial?.details?.gallery ?? []).join("\n"));
  const [program, setProgram] = useState<ProgramStep[]>(initial?.details?.program ?? []);
  const [included, setIncluded] = useState<LText[]>(initial?.details?.included ?? []);
  const [notIncluded, setNotIncluded] = useState<LText[]>(initial?.details?.notIncluded ?? []);
  const [tips, setTips] = useState<LText[]>(initial?.details?.tips ?? []);
  const [priceTable, setPriceTable] = useState<PriceRow[]>(initial?.details?.priceTable ?? []);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setPending(true);
    setError(null);
    const payload: TourFormPayload = {
      slug,
      categoryId: categoryId || null,
      city: city || null,
      days: Number(days),
      priceFrom: Number(priceFrom),
      image,
      imagePos,
      featured,
      published,
      sortOrder: Number(sortOrder),
      region,
      title,
      desc,
      duration,
      priceText,
      details: {
        route,
        startPlace,
        about,
        gallery: galleryText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        program,
        included,
        notIncluded,
        tips,
        priceTable,
      },
    };
    const result = await saveTour(tourId, payload);
    setPending(false);
    if (!result.ok) {
      setError(result.error ?? "Не удалось сохранить тур");
      return;
    }
    router.push("/admin/tours");
    router.refresh();
  };

  return (
    <div className="max-w-[900px] space-y-8">
      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <h2 className="mb-4 text-[15px] font-bold uppercase tracking-[0.06em] text-content/70">Основное</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={ui.flabel}>ЧПУ (slug)</label>
            <div className="flex gap-2">
              <input className={ui.finput} value={slug} onChange={(e) => setSlug(e.target.value)} />
              <button
                type="button"
                onClick={() => setSlug(slugify(title.ru))}
                disabled={!title.ru}
                className={cx(addBtn, "flex-none", !title.ru && "pointer-events-none opacity-40")}
              >
                Из названия
              </button>
            </div>
          </div>
          <div>
            <label className={ui.flabel}>Изображение обложки (URL)</label>
            <input className={ui.finput} value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <div>
            <label className={ui.flabel}>Позиция кадра (object-position)</label>
            <input
              className={ui.finput}
              placeholder="50% 50%"
              value={imagePos}
              onChange={(e) => setImagePos(e.target.value)}
            />
          </div>
          <div>
            <Link
              href="/admin/media"
              target="_blank"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-content/60 hover:text-gold"
            >
              Открыть Медиа за ссылкой
              <span className="lic">
                <ExternalLink />
              </span>
            </Link>
          </div>
          <div>
            <label className={ui.flabel}>Город (направление)</label>
            <select className={cx(ui.finput, "cursor-pointer [&_option]:text-onaccent")} value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">—</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name.ru}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={ui.flabel}>Категория</label>
            <select
              className={cx(ui.finput, "cursor-pointer [&_option]:text-onaccent")}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">—</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.ru}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={ui.flabel}>Дней</label>
            <input
              type="number"
              min={1}
              className={ui.finput}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            />
          </div>
          <div>
            <label className={ui.flabel}>Цена от, ₸</label>
            <input
              type="number"
              min={0}
              className={ui.finput}
              value={priceFrom}
              onChange={(e) => setPriceFrom(Number(e.target.value))}
            />
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
          <div className="flex items-end gap-6 pb-3.5">
            <label className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              Опубликован
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
              Избранный
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-5 rounded-[5px] border border-content/12 bg-panel p-5">
        <h2 className="text-[15px] font-bold uppercase tracking-[0.06em] text-content/70">Тексты (RU / EN / KK)</h2>
        <LTextField label="Регион (бейдж на карточке)" value={region} onChange={setRegion} />
        <LTextField label="Заголовок" value={title} onChange={setTitle} />
        <LTextField label="Описание (короткое)" value={desc} onChange={setDesc} multiline />
        <LTextField label="Длительность (текст)" value={duration} onChange={setDuration} />
        <LTextField label="Цена (текст)" value={priceText} onChange={setPriceText} />
      </section>

      <section className="space-y-5 rounded-[5px] border border-content/12 bg-panel p-5">
        <h2 className="text-[15px] font-bold uppercase tracking-[0.06em] text-content/70">Страница тура</h2>
        <LTextField label="Маршрут" value={route} onChange={setRoute} />
        <LTextField label="Место начала" value={startPlace} onChange={setStartPlace} />
        <LTextField label="Описание (подробное)" value={about} onChange={setAbout} multiline />
        <div>
          <label className={ui.flabel}>Галерея — по одной ссылке на строку</label>
          <textarea
            className={cx(ui.finput, "min-h-[100px] resize-y")}
            value={galleryText}
            onChange={(e) => setGalleryText(e.target.value)}
          />
        </div>
      </section>

      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <ProgramEditor items={program} onChange={setProgram} />
      </section>

      <section className="grid grid-cols-1 gap-5 rounded-[5px] border border-content/12 bg-panel p-5 lg:grid-cols-2">
        <LTextListEditor label="Что входит" items={included} onChange={setIncluded} />
        <LTextListEditor label="Что не входит" items={notIncluded} onChange={setNotIncluded} />
      </section>

      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <LTextListEditor label="Рекомендации туристам" items={tips} onChange={setTips} />
      </section>

      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <PriceTableEditor items={priceTable} onChange={setPriceTable} />
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
        <Link href="/admin/tours" className={ui.btnGhost}>
          Отмена
        </Link>
      </div>
    </div>
  );
}
