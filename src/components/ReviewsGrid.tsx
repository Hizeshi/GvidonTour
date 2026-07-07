"use client";

import { PlayCircle, Star } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import type { CatalogReview } from "@/lib/catalog-types";
import { cx, ui } from "@/lib/ui";
import Reveal from "./Reveal";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ReviewsGrid({ reviews }: { reviews: CatalogReview[] }) {
  const { t, lang } = useLang();
  return (
    <div className="mt-[54px] grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review, i) => (
        <Reveal
          key={review.author + i}
          className="flex flex-col rounded border border-content/10 bg-content/[0.02] p-7"
          delay={(i % 4) as 0 | 1 | 2 | 3}
        >
          <div className="flex gap-0.5 text-gold">
            {Array.from({ length: 5 }).map((_, s) => (
              <span key={s} className={cx("lic text-[17px]", s >= review.rating && "text-content/20")}>
                <Star fill="currentColor" strokeWidth={0} />
              </span>
            ))}
          </div>

          <p className="mt-5 flex-1 text-[15.5px] leading-relaxed text-content/80">
            “{review.text[lang]}”
          </p>

          {review.videoUrl && (
            <a
              href={review.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-gold transition-opacity hover:opacity-80"
            >
              <span className="lic text-[18px]">
                <PlayCircle />
              </span>
              {t.homeReviews.video}
            </a>
          )}

          <div className="mt-6 flex items-center gap-3 border-t border-content/10 pt-5">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-gold/40 text-[15px] font-bold text-gold">
              {initials(review.author)}
            </span>
            <span className="text-[15px] font-semibold text-content">{review.author}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
