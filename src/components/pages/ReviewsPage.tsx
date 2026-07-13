"use client";

import { useLang } from "@/lib/LanguageContext";
import type { CatalogReview } from "@/lib/catalog-types";
import { cx, ui } from "@/lib/ui";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import ReviewSubmitForm from "@/components/ReviewSubmitForm";
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

      <section className={cx(ui.sec, "bg-alt pt-16 text-altcontent")}>
        <div className={cx(ui.wrap, "mx-auto max-w-[640px]")}>
          <Reveal className="text-center">
            <h2 className={cx(ui.serif, "text-[clamp(28px,3.4vw,42px)]")}>{t.reviewsPage.submitTitle}</h2>
            <div className={cx(ui.divider, "mx-auto")} />
          </Reveal>
          <div className="mt-10">
            <ReviewSubmitForm />
          </div>
        </div>
      </section>

      <CtaBand compact />
    </main>
  );
}
