"use client";

import Link from "@/components/LocaleLink";
import { useState } from "react";
import { ChevronDown, PlayCircle, Star } from "lucide-react";
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

// Home page: 3 reviews, "read more" reveals up to 9, then "read more" again
// links out to the full /reviews page instead of expanding further.
const STEP = 3;
const CAP = 9;

interface ReviewsGridProps {
  reviews: CatalogReview[];
  /** Full /reviews page passes false to render every review, no cap/button. */
  expandable?: boolean;
}

export default function ReviewsGrid({ reviews, expandable = true }: ReviewsGridProps) {
  const { t, lang } = useLang();
  const [visible, setVisible] = useState(STEP);

  const shown = expandable ? reviews.slice(0, visible) : reviews;
  const canExpand = expandable && visible < CAP && visible < reviews.length;
  const linkToAll = expandable && visible >= CAP && reviews.length > CAP;

  return (
    <div>
      <div className="mt-[54px] grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((review, i) => (
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
              “{review.text[lang] || review.text.ru || review.text.en || review.text.kk}”
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
              {review.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={review.photo}
                  alt=""
                  className="h-11 w-11 flex-none rounded-full border border-gold/40 object-cover"
                />
              ) : (
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-gold/40 text-[15px] font-bold text-gold">
                  {initials(review.author)}
                </span>
              )}
              <span className="text-[15px] font-semibold text-content">{review.author}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {(canExpand || linkToAll) && (
        <div className="mt-10 flex justify-center">
          {canExpand ? (
            <button type="button" onClick={() => setVisible(Math.min(CAP, reviews.length))} className={ui.btnGhost}>
              {t.homeReviews.more}
              <span className="lic">
                <ChevronDown />
              </span>
            </button>
          ) : (
            <Link href="/reviews" className={ui.btnGhost}>
              {t.homeReviews.more}
              <span className="lic">
                <ChevronDown />
              </span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
