"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, PlayCircle, X } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import type { CatalogGalleryItem } from "@/lib/catalog-types";
import { cx } from "@/lib/ui";

const navBtn =
  "absolute top-1/2 z-[5] flex h-[50px] w-[50px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[rgba(0,16,36,0.55)] text-[22px] text-white backdrop-blur-[6px] transition-colors hover:border-gold hover:bg-gold hover:text-onaccent";

/** Turns a YouTube/Vimeo page URL into its embeddable iframe src.
 *  Direct media file URLs (mp4 etc.) pass through unchanged for <video>. */
function toEmbedUrl(url: string): { type: "iframe" | "video"; src: string } {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/);
  if (yt) return { type: "iframe", src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1` };
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` };
  return { type: "video", src: url };
}

interface LightboxProps {
  items: CatalogGalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const { lang } = useLang();
  const item = items[index];
  const count = items.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index + count - 1) % count);
      if (e.key === "ArrowRight") onNavigate((index + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, count, onClose, onNavigate]);

  if (!item) return null;
  const embed = item.videoUrl ? toEmbedUrl(item.videoUrl) : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-[6] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[rgba(0,16,36,0.55)] text-xl text-white transition-colors hover:border-gold hover:bg-gold hover:text-onaccent"
      >
        <span className="lic">
          <X />
        </span>
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            className={cx(navBtn, "left-2 md:left-6")}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + count - 1) % count);
            }}
          >
            <span className="lic">
              <ChevronLeft />
            </span>
          </button>
          <button
            type="button"
            aria-label="Next"
            className={cx(navBtn, "right-2 md:right-6")}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % count);
            }}
          >
            <span className="lic">
              <ChevronRight />
            </span>
          </button>
        </>
      )}

      <div
        className="relative flex max-h-full max-w-[1100px] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video max-h-[78vh] w-[92vw] overflow-hidden rounded bg-panel md:w-[80vw]">
          {embed?.type === "iframe" ? (
            <iframe
              src={embed.src}
              title={item.caption[lang]}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : embed?.type === "video" ? (
            <video src={embed.src} controls autoPlay poster={item.src} className="h-full w-full" />
          ) : (
            <Image
              src={item.src}
              alt={item.caption[lang]}
              fill
              sizes="92vw"
              className="object-contain"
            />
          )}
        </div>
        <div className="mt-4 flex items-center gap-3 text-center text-ondark">
          {item.kind === "VIDEO" && (
            <span className="lic text-gold">
              <PlayCircle />
            </span>
          )}
          <span className="text-[15px] font-semibold">{item.caption[lang]}</span>
          <span className="text-[13px] text-ondark/60">
            {index + 1} / {count}
          </span>
        </div>
      </div>
    </div>
  );
}
