"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, UploadCloud } from "lucide-react";
import { cx, ui } from "@/lib/ui";

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

interface UploadResult {
  ok: boolean;
  url?: string;
  error?: string;
}

export default function MediaUploader() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    if (!file) return;
    setPending(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/admin/media/upload", { method: "POST", body: formData });
      const data: UploadResult = await res.json();
      setResult(data);
      if (data.ok) {
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
        router.refresh();
      }
    } catch {
      setResult({ ok: false, error: "Сеть недоступна, попробуйте ещё раз" });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="rounded-[5px] border border-content/12 bg-panel p-5">
      <label
        htmlFor="media-file"
        className="flex cursor-pointer flex-col items-center gap-2 rounded-[4px] border border-dashed border-content/25 px-6 py-8 text-center transition-colors hover:border-gold/60"
      >
        <span className="lic text-[30px] text-gold">
          <UploadCloud />
        </span>
        <span className="text-[14px] font-semibold text-content/75">
          {file?.name ?? "Выберите фото (JPEG/PNG/WebP/AVIF) или видео MP4"}
        </span>
        <span className="text-[12px] text-content/45">до 4 МБ</span>
      </label>
      <input
        ref={inputRef}
        id="media-file"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,video/mp4"
        className="hidden"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null);
          setResult(null);
        }}
      />

      {result?.error && <p className="mt-3 text-[13.5px] font-semibold text-red-400">{result.error}</p>}
      {result?.ok && result.url && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-[13.5px] font-semibold text-gold">Загружено!</span>
          <code className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-content/60">
            {result.url}
          </code>
          <CopyUrlButton url={result.url} />
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={pending || !file}
        className={cx(ui.btnGold, "mt-4 w-full justify-center", (pending || !file) && "pointer-events-none opacity-50")}
      >
        {pending ? "Загрузка..." : "Загрузить"}
      </button>
    </div>
  );
}
