"use client";

import { useLang } from "@/lib/LanguageContext";
import { TOUR_IMAGES } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import TourCard from "@/components/TourCard";

export default function ToursPage() {
  const { t } = useLang();
  return (
    <main>
      <PageHead eyebrow={t.toursPage.eyebrow} title={t.toursPage.title} intro={t.toursPage.intro} />

      <section className={cx(ui.sec, "pt-16")}>
        <div className={ui.wrap}>
          <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
            {t.tours.map((tour, i) => (
              <TourCard
                key={tour.title}
                tour={tour}
                image={TOUR_IMAGES[i]}
                details={t.toursPage.details}
                delay={i % 4}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand compact />
    </main>
  );
}
