"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { RotateCcw, SearchX } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import type { CatalogCategory, CatalogTour } from "@/lib/catalog-types";
import { CITY_NAMES } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import TourCard from "@/components/TourCard";

interface ToursPageProps {
  tours: CatalogTour[];
  categories: CatalogCategory[];
}

interface Filters {
  city: string;
  category: string;
  price: string;
  days: string;
}

const select =
  "w-full cursor-pointer appearance-none rounded-[2px] border border-content/20 bg-content/[0.04] px-4 py-3 text-[14px] text-content transition-colors focus:border-gold focus:outline-none [&_option]:text-onaccent";

function matchPrice(priceFrom: number, bucket: string) {
  if (bucket === "low") return priceFrom < 100_000;
  if (bucket === "mid") return priceFrom >= 100_000 && priceFrom < 200_000;
  if (bucket === "high") return priceFrom >= 200_000;
  return true;
}

function matchDays(days: number, bucket: string) {
  if (bucket === "1") return days === 1;
  if (bucket === "23") return days >= 2 && days <= 3;
  if (bucket === "4") return days >= 4;
  return true;
}

export default function ToursPage({ tours, categories }: ToursPageProps) {
  const { t, lang } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    city: searchParams.get("city") ?? "",
    category: searchParams.get("category") ?? "",
    price: searchParams.get("price") ?? "",
    days: searchParams.get("days") ?? "",
  });

  const setFilter = (key: keyof Filters, value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v) qs.set(k, v);
    router.replace(`/tours${qs.size ? `?${qs}` : ""}`, { scroll: false });
  };

  const reset = () => {
    setFilters({ city: "", category: "", price: "", days: "" });
    router.replace("/tours", { scroll: false });
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  // Cities present in the catalog plus one arriving via deep link (e.g. from
  // a direction card) so the select never shows an unnamed value.
  const cityOptions = useMemo(() => {
    const present = new Set(tours.map((tour) => tour.city).filter((c): c is string => !!c));
    if (filters.city) present.add(filters.city);
    return Object.keys(CITY_NAMES).filter((slug) => present.has(slug));
  }, [tours, filters.city]);

  const filtered = tours.filter(
    (tour) =>
      (!filters.city || tour.city === filters.city) &&
      (!filters.category || tour.category === filters.category) &&
      matchPrice(tour.priceFrom, filters.price) &&
      matchDays(tour.days, filters.days)
  );

  return (
    <main>
      <PageHead eyebrow={t.toursPage.eyebrow} title={t.toursPage.title} intro={t.toursPage.intro} />

      <section className={cx(ui.sec, "pt-16")}>
        <div className={ui.wrap}>
          <Reveal className="mb-10 grid grid-cols-1 items-end gap-[18px] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]" immediate>
            <div>
              <label className={ui.flabel} htmlFor="f-city">
                {t.catalog.fCity}
              </label>
              <select
                id="f-city"
                className={select}
                value={filters.city}
                onChange={(e) => setFilter("city", e.target.value)}
              >
                <option value="">{t.catalog.fAll}</option>
                {cityOptions.map((slug) => (
                  <option key={slug} value={slug}>
                    {CITY_NAMES[slug][lang]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={ui.flabel} htmlFor="f-category">
                {t.catalog.fCategory}
              </label>
              <select
                id="f-category"
                className={select}
                value={filters.category}
                onChange={(e) => setFilter("category", e.target.value)}
              >
                <option value="">{t.catalog.fAll}</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name[lang]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={ui.flabel} htmlFor="f-price">
                {t.catalog.fPrice}
              </label>
              <select
                id="f-price"
                className={select}
                value={filters.price}
                onChange={(e) => setFilter("price", e.target.value)}
              >
                <option value="">{t.catalog.fAll}</option>
                <option value="low">{t.catalog.priceLow}</option>
                <option value="mid">{t.catalog.priceMid}</option>
                <option value="high">{t.catalog.priceHigh}</option>
              </select>
            </div>
            <div>
              <label className={ui.flabel} htmlFor="f-days">
                {t.catalog.fDays}
              </label>
              <select
                id="f-days"
                className={select}
                value={filters.days}
                onChange={(e) => setFilter("days", e.target.value)}
              >
                <option value="">{t.catalog.fAll}</option>
                <option value="1">{t.catalog.days1}</option>
                <option value="23">{t.catalog.days23}</option>
                <option value="4">{t.catalog.days4}</option>
              </select>
            </div>
            <button
              type="button"
              onClick={reset}
              disabled={!hasActiveFilters}
              className={cx(
                "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[2px] border border-content/30 px-5 py-3 text-[13px] font-bold tracking-[0.04em] text-content transition-all duration-300 hover:border-gold hover:text-gold",
                !hasActiveFilters && "cursor-default opacity-40 hover:border-content/30 hover:text-content"
              )}
            >
              <span className="lic">
                <RotateCcw />
              </span>
              {t.catalog.fReset}
            </button>
          </Reveal>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tour, i) => (
                <TourCard key={tour.slug} tour={tour} details={t.toursPage.details} delay={i % 4} />
              ))}
            </div>
          ) : (
            <Reveal
              className="mx-auto max-w-[560px] rounded border border-content/10 bg-content/[0.02] px-8 py-16 text-center"
              immediate
            >
              <span className="lic mx-auto text-[44px] text-gold/70">
                <SearchX />
              </span>
              <p className="mt-5 text-[16px] leading-relaxed text-content/70">{t.catalog.empty}</p>
              <div className="mt-8 flex justify-center">
                <Link href="/contacts" className={ui.btnGold}>
                  {t.catalog.emptyCta}
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand compact />
    </main>
  );
}
