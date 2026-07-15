"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import { ArrowRight, Clock, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import type { CatalogTour } from "@/lib/catalog-types";
import { WHATSAPP_BOOKING } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import { useReveal } from "./useReveal";

interface TourCardProps {
  tour: CatalogTour;
  details: string;
  delay?: number;
}

const badge =
  "absolute z-[3] rounded-[2px] bg-[rgba(0,16,36,0.7)] px-3 py-1.5 backdrop-blur-[4px]";

export default function TourCard({ tour, details, delay = 0 }: TourCardProps) {
  const { lang, t } = useLang();
  const { ref, cls } = useReveal<HTMLDivElement>();

  const waHref = `https://wa.me/${WHATSAPP_BOOKING}?text=${encodeURIComponent(
    t.catalog.bookMsg.replace("{title}", tour.title[lang])
  )}`;

  return (
    <div
      ref={ref}
      className={cx(
        "group flex flex-col overflow-hidden rounded border border-content/10 bg-panel transition-all duration-[450ms] hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_28px_50px_-28px_rgba(0,0,0,0.7)]",
        `reveal${delay ? ` d${delay}` : ""}${cls}`
      )}
    >
      <Link href={`/tours/${tour.slug}`} className="relative block h-[236px] overflow-hidden">
        <span className={cx(badge, "left-3.5 top-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold")}>
          {tour.region[lang]}
        </span>
        <span className={cx(badge, "bottom-3.5 right-3.5 flex items-center gap-1.5 text-xs font-semibold")}>
          <span className="lic">
            <Clock />
          </span>
          {tour.duration[lang]}
        </span>
        <Image
          src={tour.image}
          alt={tour.title[lang]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          style={{ objectPosition: tour.imagePos ?? "50% 50%" }}
        />
      </Link>
      <div className="flex flex-1 flex-col p-[26px] pb-[22px]">
        <h3 className={cx(ui.serif, "mb-3 text-[22px] leading-[1.16]")}>{tour.title[lang]}</h3>
        <p className="flex-1 text-[14.5px] leading-[1.55] text-content/60">{tour.desc[lang]}</p>
        <div className="mt-[22px] flex items-center justify-between border-t border-content/10 pt-[18px]">
          <span className="text-[17px] font-bold text-gold">{tour.priceText[lang]}</span>
          <Link
            href={`/tours/${tour.slug}`}
            className="flex items-center gap-[7px] text-[13px] font-bold tracking-[0.04em] text-content transition-all duration-300 hover:gap-3 hover:text-gold"
          >
            {details}
            <span className="lic">
              <ArrowRight />
            </span>
          </Link>
        </div>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cx(ui.btnGold, "mt-4 w-full justify-center py-2.5 text-[13px]")}
        >
          {t.catalog.book}
          <span className="lic">
            <MessageCircle />
          </span>
        </a>
      </div>
    </div>
  );
}
