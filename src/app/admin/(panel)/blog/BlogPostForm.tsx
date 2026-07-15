"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/admin/Toast";
import { useState } from "react";
import { ExternalLink, Save } from "lucide-react";
import type { BlogBlock, LText } from "@/lib/catalog-types";
import { addBtn, emptyLText, LTextField } from "@/components/admin/AdminFormFields";
import BlogBlockEditor from "@/components/admin/BlogBlockEditor";
import { cx, ui } from "@/lib/ui";
import { saveBlogPost, type BlogPostFormPayload } from "./actions";

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

interface BlogPostFormInitial {
  slug: string;
  title: LText;
  excerpt: LText;
  content: BlogBlock[];
  image: string;
  publishedAt: string; // yyyy-mm-dd
  sortOrder: number;
  published: boolean;
}

export default function BlogPostForm({ postId, initial }: { postId: string | null; initial?: BlogPostFormInitial }) {
  const router = useRouter();
  const toast = useToast();
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState<LText>(initial?.title ?? emptyLText());
  const [excerpt, setExcerpt] = useState<LText>(initial?.excerpt ?? emptyLText());
  const [content, setContent] = useState<BlogBlock[]>(initial?.content ?? []);
  const [image, setImage] = useState(initial?.image ?? "");
  const [publishedAt, setPublishedAt] = useState(initial?.publishedAt ?? new Date().toISOString().slice(0, 10));
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [published, setPublished] = useState(initial?.published ?? true);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setPending(true);
    setError(null);
    const payload: BlogPostFormPayload = {
      slug,
      title,
      excerpt,
      content,
      image,
      publishedAt,
      sortOrder: Number(sortOrder),
      published,
    };
    const result = await saveBlogPost(postId, payload);
    setPending(false);
    if (!result.ok) {
      setError(result.error ?? "Не удалось сохранить статью");
      return;
    }
    toast.success(postId ? "Статья сохранена" : "Статья добавлена");
    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <div className="max-w-[820px] space-y-6">
      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
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
            <label className={ui.flabel}>Изображение (URL)</label>
            <input className={ui.finput} value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <div>
            <label className={ui.flabel}>Дата публикации</label>
            <input
              type="date"
              className={ui.finput}
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
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
              Опубликована
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-5 rounded-[5px] border border-content/12 bg-panel p-5">
        <LTextField label="Заголовок" value={title} onChange={setTitle} />
        <LTextField label="Анонс (короткий)" value={excerpt} onChange={setExcerpt} multiline />
      </section>

      <section className="rounded-[5px] border border-content/12 bg-panel p-5">
        <div className="mb-3.5 flex items-center justify-between">
          <span className={ui.flabel}>Содержимое статьи</span>
          <Link
            href="/admin/media"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-content/60 hover:text-gold"
          >
            Медиа за ссылкой
            <span className="lic">
              <ExternalLink />
            </span>
          </Link>
        </div>
        <BlogBlockEditor blocks={content} onChange={setContent} />
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
        <Link href="/admin/blog" className={ui.btnGhost}>
          Отмена
        </Link>
      </div>
    </div>
  );
}
