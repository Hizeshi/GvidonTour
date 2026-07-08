"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExternalLink, Save } from "lucide-react";
import type { LText } from "@/lib/catalog-types";
import { emptyLText, LTextField } from "@/components/admin/AdminFormFields";
import { cx, ui } from "@/lib/ui";
import { saveReview, type ReviewFormPayload } from "./actions";

interface ReviewFormInitial {
  author: string;
  rating: number;
  text: LText;
  photo: string | null;
  videoUrl: string | null;
  published: boolean;
}

export default function ReviewForm({ reviewId, initial }: { reviewId: string | null; initial?: ReviewFormInitial }) {
  const router = useRouter();
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [rating, setRating] = useState(initial?.rating ?? 5);
  const [text, setText] = useState<LText>(initial?.text ?? emptyLText());
  const [photo, setPhoto] = useState(initial?.photo ?? "");
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [published, setPublished] = useState(initial?.published ?? true);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setPending(true);
    setError(null);
    const payload: ReviewFormPayload = { author, rating: Number(rating), text, photo, videoUrl, published };
    const result = await saveReview(reviewId, payload);
    setPending(false);
    if (!result.ok) {
      setError(result.error ?? "Не удалось сохранить");
      return;
    }
    router.push("/admin/reviews");
    router.refresh();
  };

  return (
    <div className="max-w-[700px] space-y-6">
      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={ui.flabel}>Автор</label>
            <input className={ui.finput} value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            <label className={ui.flabel}>Оценка</label>
            <select
              className={cx(ui.finput, "cursor-pointer [&_option]:text-onaccent")}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {"★".repeat(n)} ({n})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={ui.flabel}>Фото автора (URL, необязательно)</label>
            <input className={ui.finput} value={photo} onChange={(e) => setPhoto(e.target.value)} />
          </div>
          <div>
            <label className={ui.flabel}>Ссылка на видеоотзыв (необязательно)</label>
            <input className={ui.finput} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
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
          <div className="flex items-end pb-3.5">
            <label className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              Опубликован
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <LTextField label="Текст отзыва" value={text} onChange={setText} multiline />
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
        <Link href="/admin/reviews" className={ui.btnGhost}>
          Отмена
        </Link>
      </div>
    </div>
  );
}
