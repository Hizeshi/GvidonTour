"use client";

import { useActionState, useRef, useState } from "react";
import { Check, Copy, UploadCloud } from "lucide-react";
import { cx, ui } from "@/lib/ui";
import { uploadMediaAction } from "./actions";

export function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="flex cursor-pointer items-center gap-1.5 rounded-[3px] border border-content/20 px-2.5 py-1.5 text-[12px] font-bold text-content/70 transition-colors hover:border-gold hover:text-gold"
    >
      <span className="lic">{copied ? <Check /> : <Copy />}</span>
      {copied ? "Скопировано" : "Копировать URL"}
    </button>
  );
}

export default function MediaUploader() {
  const [state, formAction, pending] = useActionState(uploadMediaAction, null);
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form ref={formRef} action={formAction} className="rounded-[5px] border border-content/12 bg-panel p-5">
      <label
        htmlFor="media-file"
        className="flex cursor-pointer flex-col items-center gap-2 rounded-[4px] border border-dashed border-content/25 px-6 py-8 text-center transition-colors hover:border-gold/60"
      >
        <span className="lic text-[30px] text-gold">
          <UploadCloud />
        </span>
        <span className="text-[14px] font-semibold text-content/75">
          {fileName ?? "Выберите фото (JPEG/PNG/WebP/AVIF) или видео MP4"}
        </span>
        <span className="text-[12px] text-content/45">до 8 МБ</span>
      </label>
      <input
        id="media-file"
        name="file"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,video/mp4"
        className="hidden"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
      />

      {state?.error && <p className="mt-3 text-[13.5px] font-semibold text-red-400">{state.error}</p>}
      {state?.ok && state.url && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-[13.5px] font-semibold text-gold">Загружено!</span>
          <code className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-content/60">
            {state.url}
          </code>
          <CopyUrlButton url={state.url} />
        </div>
      )}

      <button
        type="submit"
        disabled={pending || !fileName}
        className={cx(
          ui.btnGold,
          "mt-4 w-full justify-center",
          (pending || !fileName) && "pointer-events-none opacity-50"
        )}
      >
        {pending ? "Загрузка..." : "Загрузить"}
      </button>
    </form>
  );
}
