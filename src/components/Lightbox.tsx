"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, PlayCircle, X } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { A11Y_LABELS } from "@/lib/a11y";
import type { CatalogGalleryItem } from "@/lib/catalog-types";
import { toEmbedUrl } from "@/lib/video-embed";
import { cx } from "@/lib/ui";

const navBtn =
  "absolute top-1/2 z-[5] flex h-[50px] w-[50px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[rgba(0,16,36,0.55)] text-[22px] text-white backdrop-blur-[6px] transition-colors hover:border-gold hover:bg-gold hover:text-onaccent";

interface LightboxProps {
  items: CatalogGalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const { lang } = useLang();
  const a11y = A11Y_LABELS[lang];
  const item = items[index];
  const count = items.length;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const captionId = useId();

  useLayoutEffect(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index + count - 1) % count);
      if (e.key === "ArrowRight") onNavigate((index + 1) % count);
      if (e.key === "Tab") {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], iframe, video[controls], [tabindex]:not([tabindex="-1"])'
          ) ?? []
        ).filter((element) => element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;
        if (!dialogRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, count, onClose, onNavigate]);

  if (!item) return null;
  const embed = item.videoUrl ? toEmbedUrl(item.videoUrl, { autoplay: true }) : null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={captionId}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label={a11y.close}
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
            aria-label={a11y.previous}
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
            aria-label={a11y.next}
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
          <span id={captionId} className="text-[15px] font-semibold">{item.caption[lang]}</span>
          <span className="text-[13px] text-ondark/60">
            {index + 1} / {count}
          </span>
        </div>
      </div>
    </div>
  );
}
