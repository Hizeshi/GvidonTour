"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import type { CatalogTour } from "@/lib/catalog-types";
import { cx, ui } from "@/lib/ui";
import CtaBand from "@/components/CtaBand";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import TourCard from "@/components/TourCard";
import ValuesGrid from "@/components/ValuesGrid";

export default function HomePage({ tours }: { tours: CatalogTour[] }) {
  const { t } = useLang();
  return (
    <main>
      <HomeHero />

      <section className={cx(ui.sec, "bg-cream-2 text-ink")}>
        <div className={ui.wrap}>
          <Reveal className="max-w-[760px]">
            <div className={ui.eyebrow}>{t.valuesHead.eyebrow}</div>
            <h2 className={ui.sectionTitle}>{t.valuesHead.title}</h2>
            <div className={ui.divider} />
          </Reveal>
          <ValuesGrid tone="cream" />
        </div>
      </section>

      <section className={ui.sec}>
        <div className={ui.wrap}>
          <Reveal className="max-w-[760px]">
            <div className={ui.eyebrow}>{t.featured.eyebrow}</div>
            <h2 className={ui.sectionTitle}>{t.featured.title}</h2>
            <div className={ui.divider} />
          </Reveal>
          <div className="mt-[58px] grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
            {tours.slice(0, 3).map((tour, i) => (
              <TourCard key={tour.slug} tour={tour} details={t.toursPage.details} delay={i % 4} />
            ))}
          </div>
          <Reveal className="mt-[54px] flex justify-center">
            <Link href="/tours" className={ui.btnGhost}>
              {t.featured.viewAll}
              <span className="lic">
                <ArrowRight />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand withEyebrow />
    </main>
  );
}
