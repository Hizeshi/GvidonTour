"use client";

import Link from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import type {
  CatalogAchievement,
  CatalogCategory,
  CatalogDirection,
  CatalogReview,
  CatalogTour,
} from "@/lib/catalog-types";
import { cx, ui } from "@/lib/ui";
import AchievementsStrip from "@/components/AchievementsStrip";
import CategoriesGrid from "@/components/CategoriesGrid";
import CtaBand from "@/components/CtaBand";
import DirectionsGrid from "@/components/DirectionsGrid";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import ReviewsGrid from "@/components/ReviewsGrid";
import TourCard from "@/components/TourCard";
import ValuesGrid from "@/components/ValuesGrid";

interface HomePageProps {
  tours: CatalogTour[];
  categories: CatalogCategory[];
  directions: CatalogDirection[];
  reviews: CatalogReview[];
  achievements: CatalogAchievement[];
}

export default function HomePage({ tours, categories, directions, reviews, achievements }: HomePageProps) {
  const { t } = useLang();
  return (
    <main>
      <HomeHero />

      <section className={cx(ui.sec, "bg-alt text-altcontent")}>
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
            <div className={ui.eyebrow}>{t.homeCats.eyebrow}</div>
            <h2 className={ui.sectionTitle}>{t.homeCats.title}</h2>
            <div className={ui.divider} />
          </Reveal>
          <CategoriesGrid categories={categories} />
        </div>
      </section>

      <section className={cx(ui.sec, "bg-alt text-altcontent")}>
        <div className={ui.wrap}>
          <Reveal className="max-w-[760px]">
            <div className={ui.eyebrow}>{t.homeDirs.eyebrow}</div>
            <h2 className={ui.sectionTitle}>{t.homeDirs.title}</h2>
            <div className={ui.divider} />
          </Reveal>
          <DirectionsGrid directions={directions} />
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

      {reviews.length > 0 && (
        <section className={cx(ui.sec, "bg-alt text-altcontent")}>
          <div className={ui.wrap}>
            <Reveal className="max-w-[760px]">
              <div className={ui.eyebrow}>{t.homeReviews.eyebrow}</div>
              <h2 className={ui.sectionTitle}>{t.homeReviews.title}</h2>
              <div className={ui.divider} />
            </Reveal>
            <ReviewsGrid reviews={reviews} />
          </div>
        </section>
      )}

      <section className={ui.sec}>
        <div className={ui.wrap}>
          <Reveal className="max-w-[760px]">
            <div className={ui.eyebrow}>{t.homeAch.eyebrow}</div>
            <h2 className={ui.sectionTitle}>{t.homeAch.title}</h2>
            <div className={ui.divider} />
          </Reveal>
          <AchievementsStrip achievements={achievements} />
          <Reveal className="mt-8 text-[13.5px] text-content/50">{t.homeAch.note}</Reveal>
        </div>
      </section>

      <CtaBand withEyebrow />
    </main>
  );
}
