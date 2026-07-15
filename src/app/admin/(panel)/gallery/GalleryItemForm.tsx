"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/admin/Toast";
import { useState } from "react";
import { ExternalLink, Save } from "lucide-react";
import type { LText } from "@/lib/catalog-types";
import { emptyLText, LTextField } from "@/components/admin/AdminFormFields";
import { cx, ui } from "@/lib/ui";
import { saveGalleryItem, type GalleryFormPayload } from "./actions";

interface GalleryItemFormInitial {
  kind: "PHOTO" | "VIDEO";
  src: string;
  videoUrl: string | null;
  caption: LText;
  span: string | null;
  sortOrder: number;
  published: boolean;
}

export default function GalleryItemForm({ itemId, initial }: { itemId: string | null; initial?: GalleryItemFormInitial }) {
  const router = useRouter();
  const toast = useToast();
  const [kind, setKind] = useState<"PHOTO" | "VIDEO">(initial?.kind ?? "PHOTO");
  const [src, setSrc] = useState(initial?.src ?? "");
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [caption, setCaption] = useState<LText>(initial?.caption ?? emptyLText());
  const [span, setSpan] = useState(initial?.span ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [published, setPublished] = useState(initial?.published ?? true);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setPending(true);
    setError(null);
    const payload: GalleryFormPayload = {
      kind,
      src,
      videoUrl,
      caption,
      span,
      sortOrder: Number(sortOrder),
      published,
    };
    const result = await saveGalleryItem(itemId, payload);
    setPending(false);
    if (!result.ok) {
      setError(result.error ?? "Не удалось сохранить");
      return;
    }
    toast.success(itemId ? "Материал сохранён" : "Материал добавлен");
    router.push("/admin/gallery");
    router.refresh();
  };

  return (
    <div className="max-w-[700px] space-y-6">
      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={ui.flabel}>Тип</label>
            <select
              className={cx(ui.finput, "cursor-pointer [&_option]:text-onaccent")}
              value={kind}
              onChange={(e) => setKind(e.target.value as "PHOTO" | "VIDEO")}
            >
              <option value="PHOTO">Фото</option>
              <option value="VIDEO">Видео</option>
            </select>
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
            <label className={ui.flabel}>
              {kind === "VIDEO" ? "Изображение-превью (URL)" : "Изображение (URL)"}
            </label>
            <input className={ui.finput} value={src} onChange={(e) => setSrc(e.target.value)} />
          </div>
          {kind === "VIDEO" && (
            <div className="sm:col-span-2">
              <label className={ui.flabel}>Ссылка на видео (MP4, YouTube или Vimeo)</label>
              <input className={ui.finput} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            </div>
          )}
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
          <div className="sm:col-span-2">
            <label className={ui.flabel}>
              Span (класс сетки, необязательно) — например sm:col-span-2 sm:row-span-2
            </label>
            <input className={ui.finput} value={span} onChange={(e) => setSpan(e.target.value)} />
          </div>
          <div className="flex items-end pb-3.5">
            <label className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              Опубликовано
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <LTextField label="Подпись" value={caption} onChange={setCaption} />
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
        <Link href="/admin/gallery" className={ui.btnGhost}>
          Отмена
        </Link>
      </div>
    </div>
  );
}
