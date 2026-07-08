import type { Metadata } from "next";
import { FileVideo, Trash2, TriangleAlert } from "lucide-react";
import { listMedia, storageConfigured } from "@/lib/storage";
import { cx, ui } from "@/lib/ui";
import MediaUploader, { CopyUrlButton } from "./MediaUploader";
import { deleteMediaAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Медиа" };

function formatSize(bytes: number | null): string {
  if (bytes === null) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

export default async function AdminMediaPage() {
  const configured = storageConfigured();
  const files = configured ? await listMedia() : null;

  return (
    <div>
      <h1 className={cx(ui.serif, "text-[28px]")}>Медиа</h1>
      <p className="mt-2 text-[14.5px] text-content/60">
        Загруженные фото и видео. Скопируйте URL файла, чтобы использовать его в турах, галерее или блоге.
      </p>

      {!configured ? (
        <div className="mt-8 flex items-start gap-4 rounded-[5px] border border-gold/40 bg-gold/5 p-6">
          <span className="lic mt-0.5 text-[24px] text-gold">
            <TriangleAlert />
          </span>
          <div className="text-[14px] leading-relaxed text-content/75">
            <p className="font-bold text-content">Хранилище не настроено.</p>
            <p className="mt-1.5">
              Нужен секретный ключ Supabase: панель Supabase → Project Settings → API Keys →
              скопировать ключ <code className="text-gold">service_role</code> и добавить его в переменную
              окружения <code className="text-gold">SUPABASE_SERVICE_KEY</code> (локально в .env и в Vercel).
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8 max-w-[560px]">
            <MediaUploader />
          </div>

          <h2 className="mt-10 text-[15px] font-bold uppercase tracking-[0.08em] text-content/55">
            Загруженные файлы {files ? `(${files.length})` : ""}
          </h2>

          {files === null ? (
            <p className="mt-4 text-content/60">Не удалось получить список файлов — обновите страницу.</p>
          ) : files.length === 0 ? (
            <p className="mt-4 text-content/50">Пока пусто. Загрузите первый файл выше.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {files.map((file) => (
                <div key={file.path} className="overflow-hidden rounded-[5px] border border-content/12 bg-panel">
                  <div className="flex h-[150px] items-center justify-center overflow-hidden bg-black/20">
                    {file.contentType?.startsWith("video/") ? (
                      <span className="lic text-[40px] text-content/40">
                        <FileVideo />
                      </span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={file.url} alt={file.name} className="h-full w-full object-cover" loading="lazy" />
                    )}
                  </div>
                  <div className="p-3.5">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] font-semibold text-content/75">
                      {file.name}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-content/45">{formatSize(file.sizeBytes)}</div>
                    <div className="mt-3 flex items-center gap-2">
                      <CopyUrlButton url={file.url} />
                      <form action={deleteMediaAction.bind(null, file.path)}>
                        <button
                          type="submit"
                          className="flex cursor-pointer items-center gap-1.5 rounded-[3px] border border-content/20 px-2.5 py-1.5 text-[12px] font-bold text-content/50 transition-colors hover:border-red-400 hover:text-red-400"
                        >
                          <span className="lic">
                            <Trash2 />
                          </span>
                          Удалить
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
