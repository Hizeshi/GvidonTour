"use client";

import { useLang } from "@/lib/LanguageContext";
import type { CatalogReview } from "@/lib/catalog-types";
import { cx, ui } from "@/lib/ui";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import ReviewsGrid from "@/components/ReviewsGrid";

export default function ReviewsPage({ reviews }: { reviews: CatalogReview[] }) {
  const { t } = useLang();
  return (
    <main>
      <PageHead eyebrow={t.reviewsPage.eyebrow} title={t.reviewsPage.title} intro={t.reviewsPage.intro} />

      <section className={cx(ui.sec, "pt-16")}>
        <div className={ui.wrap}>
          <ReviewsGrid reviews={reviews} expandable={false} />
        </div>
      </section>

      <CtaBand compact />
    </main>
  );
}
