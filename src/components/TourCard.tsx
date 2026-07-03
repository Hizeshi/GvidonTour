"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { TourEntry } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import { useReveal } from "./useReveal";

interface TourCardProps {
  tour: TourEntry;
  image: { src: string; pos?: string };
  details: string;
  delay?: number;
}

const badge =
  "absolute z-[3] rounded-[2px] bg-[rgba(0,16,36,0.7)] px-3 py-1.5 backdrop-blur-[4px]";

export default function TourCard({ tour, image, details, delay = 0 }: TourCardProps) {
  const { ref, cls } = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      href="/contacts"
      className={cx(
        "group flex flex-col overflow-hidden rounded border border-cream/10 bg-navy-2 transition-all duration-[450ms] hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_28px_50px_-28px_rgba(0,0,0,0.7)]",
        `reveal${delay ? ` d${delay}` : ""}${cls}`
      )}
    >
      <div className="relative h-[236px] overflow-hidden">
        <span className={cx(badge, "left-3.5 top-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold")}>
          {tour.region}
        </span>
        <span className={cx(badge, "bottom-3.5 right-3.5 flex items-center gap-1.5 text-xs font-semibold")}>
          <span className="lic">
            <Clock />
          </span>
          {tour.dur}
        </span>
        <Image
          src={image.src}
          alt={tour.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          style={{ objectPosition: image.pos ?? "50% 50%" }}
        />
      </div>
      <div className="flex flex-1 flex-col p-[26px] pb-7">
        <h3 className={cx(ui.serif, "mb-3 text-[22px] leading-[1.16]")}>{tour.title}</h3>
        <p className="flex-1 text-[14.5px] leading-[1.55] text-cream/60">{tour.desc}</p>
        <div className="mt-[22px] flex items-center justify-between border-t border-cream/10 pt-[18px]">
          <span className="text-[17px] font-bold text-gold">{tour.price}</span>
          <span className="flex items-center gap-[7px] text-[13px] font-bold tracking-[0.04em] text-cream transition-all duration-300 group-hover:gap-3 group-hover:text-gold">
            {details}
            <span className="lic">
              <ArrowRight />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
