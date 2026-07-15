import Link from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { CONTENT, type Lang } from "@/lib/content";
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
import CtaBand, { ctaLabels } from "@/components/CtaBand";
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
  lang: Lang;
}

/** Server component: none of this page is interactive except the hero slider,
 *  the reviews "show more" and the scroll-reveal wrapper, each of which is its
 *  own client island. */
export default function HomePage({
  tours,
  categories,
  directions,
  reviews,
  achievements,
  lang,
}: HomePageProps) {
  const t = CONTENT[lang];

  // The Star toggle in the admin tour list picks what shows here. Falling back
  // to the first tours keeps the block populated if nothing is starred yet.
  const starred = tours.filter((tour) => tour.featured);
  const featuredTours = (starred.length > 0 ? starred : tours).slice(0, 3);

  return (
    <main>
      <HomeHero hero={t.hero} caps={t.caps} />

      <section className={cx(ui.sec, "bg-alt text-altcontent")}>
        <div className={ui.wrap}>
          <Reveal className="max-w-[760px]">
            <div className={ui.eyebrow}>{t.valuesHead.eyebrow}</div>
            <h2 className={ui.sectionTitle}>{t.valuesHead.title}</h2>
            <div className={ui.divider} />
          </Reveal>
          <ValuesGrid lang={lang} tone="cream" />
        </div>
      </section>

      {/* Each block hides itself when it has nothing to show: an empty table
          now renders as empty (no demo fallback), and a lone section heading
          over blank space looks broken. */}
      {categories.length > 0 && (
        <section className={ui.sec}>
          <div className={ui.wrap}>
            <Reveal className="max-w-[760px]">
              <div className={ui.eyebrow}>{t.homeCats.eyebrow}</div>
              <h2 className={ui.sectionTitle}>{t.homeCats.title}</h2>
              <div className={ui.divider} />
            </Reveal>
            <CategoriesGrid categories={categories} lang={lang} />
          </div>
        </section>
      )}

      {directions.length > 0 && (
        <section className={cx(ui.sec, "bg-alt text-altcontent")}>
          <div className={ui.wrap}>
            <Reveal className="max-w-[760px]">
              <div className={ui.eyebrow}>{t.homeDirs.eyebrow}</div>
              <h2 className={ui.sectionTitle}>{t.homeDirs.title}</h2>
              <div className={ui.divider} />
            </Reveal>
            <DirectionsGrid directions={directions} lang={lang} />
          </div>
        </section>
      )}

      {featuredTours.length > 0 && (
        <section className={ui.sec}>
          <div className={ui.wrap}>
            <Reveal className="max-w-[760px]">
              <div className={ui.eyebrow}>{t.featured.eyebrow}</div>
              <h2 className={ui.sectionTitle}>{t.featured.title}</h2>
              <div className={ui.divider} />
            </Reveal>
            <div className="mt-[58px] grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
              {featuredTours.map((tour, i) => (
                <TourCard key={tour.slug} tour={tour} details={t.toursPage.details} book={t.catalog.book} bookMsg={t.catalog.bookMsg} lang={lang} delay={(i % 4) as 0 | 1 | 2 | 3} />
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
      )}

      {reviews.length > 0 && (
        <section className={cx(ui.sec, "bg-alt text-altcontent")}>
          <div className={ui.wrap}>
            <Reveal className="max-w-[760px]">
              <div className={ui.eyebrow}>{t.homeReviews.eyebrow}</div>
              <h2 className={ui.sectionTitle}>{t.homeReviews.title}</h2>
              <div className={ui.divider} />
            </Reveal>
            <ReviewsGrid reviews={reviews} lang={lang} labels={t.homeReviews} />
          </div>
        </section>
      )}

      {achievements.length > 0 && (
        <section className={ui.sec}>
          <div className={ui.wrap}>
            <Reveal className="max-w-[760px]">
              <div className={ui.eyebrow}>{t.homeAch.eyebrow}</div>
              <h2 className={ui.sectionTitle}>{t.homeAch.title}</h2>
              <div className={ui.divider} />
            </Reveal>
            <AchievementsStrip achievements={achievements} lang={lang} />
            <Reveal className="mt-8 text-[13.5px] text-content/50">{t.homeAch.note}</Reveal>
          </div>
        </section>
      )}

      <CtaBand labels={ctaLabels(t)} withEyebrow />
    </main>
  );
}
