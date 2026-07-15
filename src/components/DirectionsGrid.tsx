"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import type { CatalogDirection } from "@/lib/catalog-types";
import type { Lang } from "@/lib/content";
import { DIRECTION_IMAGE_POS } from "@/lib/site-data";
import { cx, ui } from "@/lib/ui";
import { useReveal } from "./useReveal";

/** Stays a client component: useReveal puts its ref straight on the <Link>, so
 *  the card can't be wrapped in <Reveal> without adding a div that would become
 *  the grid item and change the layout. It takes `lang` as a prop, which is all
 *  it ever needed from context. */
function DirectionCard({ direction, delay, lang }: { direction: CatalogDirection; delay: number; lang: Lang }) {
  const { ref, cls } = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      href={`/tours?city=${direction.slug}`}
      className={cx(
        "group relative block h-[220px] overflow-hidden rounded border border-altcontent/10",
        `reveal${delay ? ` d${delay}` : ""}${cls}`
      )}
    >
      {direction.image ? (
        <Image
          src={direction.image}
          alt={direction.name[lang]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          style={{ objectPosition: DIRECTION_IMAGE_POS[direction.slug] ?? "50% 50%" }}
        />
      ) : (
        <div className="absolute inset-0 bg-panel" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,16,36,0.78),transparent_55%)] transition-colors duration-300 group-hover:bg-[linear-gradient(0deg,rgba(0,16,36,0.85),rgba(0,16,36,0.15))]" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
        <span className={cx(ui.serif, "text-[24px] text-ondark")}>{direction.name[lang]}</span>
        <span className="lic text-ondark/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold">
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}

export default function DirectionsGrid({
  directions,
  lang,
}: {
  directions: CatalogDirection[];
  lang: Lang;
}) {
  return (
    <div className="mt-[58px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
      {directions.map((d, i) => (
        <DirectionCard key={d.slug} direction={d} delay={i % 4} lang={lang} />
      ))}
    </div>
  );
}
