"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExternalLink, Save } from "lucide-react";
import type { LText } from "@/lib/catalog-types";
import { emptyLText, LTextField } from "@/components/admin/AdminFormFields";
import { cx, ui } from "@/lib/ui";
import { saveAchievement, type AchievementFormPayload } from "./actions";

interface AchievementFormInitial {
  title: LText;
  image: string;
  sortOrder: number;
}

export default function AchievementForm({
  achievementId,
  initial,
}: {
  achievementId: string | null;
  initial?: AchievementFormInitial;
}) {
  const router = useRouter();
  const [title, setTitle] = useState<LText>(initial?.title ?? emptyLText());
  const [image, setImage] = useState(initial?.image ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setPending(true);
    setError(null);
    const payload: AchievementFormPayload = { title, image, sortOrder: Number(sortOrder) };
    const result = await saveAchievement(achievementId, payload);
    setPending(false);
    if (!result.ok) {
      setError(result.error ?? "Не удалось сохранить");
      return;
    }
    router.push("/admin/achievements");
    router.refresh();
  };

  return (
    <div className="max-w-[700px] space-y-6">
      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={ui.flabel}>Изображение (URL)</label>
            <input className={ui.finput} value={image} onChange={(e) => setImage(e.target.value)} />
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
        <LTextField label="Название" value={title} onChange={setTitle} />
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
        <Link href="/admin/achievements" className={ui.btnGhost}>
          Отмена
        </Link>
      </div>
    </div>
  );
}
