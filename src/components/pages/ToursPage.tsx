"use client";

import Link from "@/components/LocaleLink";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { RotateCcw, SearchX } from "lucide-react";
import type { CatalogCategory, CatalogDirection, CatalogTour, LText } from "@/lib/catalog-types";
import type { Dict, Lang } from "@/lib/content";
import { CITY_NAMES } from "@/lib/site-data";
import { localeHref } from "@/lib/i18n";
import { cx, ui } from "@/lib/ui";
import CtaBand, { ctaLabels } from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import RangeSlider from "@/components/RangeSlider";
import Reveal from "@/components/Reveal";
import TourCard from "@/components/TourCard";

interface ToursPageProps {
  tours: CatalogTour[];
  categories: CatalogCategory[];
  directions: CatalogDirection[];
  lang: Lang;
  /** The filters keep their state in the URL, so this page can't be a server
   *  component; it takes the dictionary as a prop instead of importing it. */
  t: Dict;
}

type NumRange = [number, number];

interface Filters {
  city: string;
  category: string;
  price: NumRange;
  days: NumRange;
}

const select =
  "w-full cursor-pointer appearance-none rounded-[2px] border border-content/20 bg-content/[0.04] px-4 py-3 text-[14px] text-content transition-colors focus:border-gold focus:outline-none [&_option]:text-onaccent";

const PRICE_STEP = 1000;

function clamp(n: number, lo: number, hi: number) {
  return Math.min(Math.max(n, lo), hi);
}

/** Parses a "min-max" URL param, clamped into bounds; a single number
 *  ("1", from the header's "?days=1" excursions deep link) is treated as
 *  an exact-match range. Falls back to the full bounds if missing/malformed. */
function parseRange(raw: string | null, bounds: NumRange): NumRange {
  if (raw) {
    const parts = raw.split("-").map(Number);
    if (parts.length === 1 && Number.isFinite(parts[0])) {
      const n = clamp(parts[0], bounds[0], bounds[1]);
      return [n, n];
    }
    if (parts.length === 2 && parts.every(Number.isFinite)) {
      const [a, b] = parts;
      return [clamp(Math.min(a, b), bounds[0], bounds[1]), clamp(Math.max(a, b), bounds[0], bounds[1])];
    }
  }
  return bounds;
}

export default function ToursPage({ tours, categories, directions, lang, t }: ToursPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // City names come from the DB directions (with the static CITY_NAMES map as
  // a fallback), so cities added via the admin panel show up here correctly.
  const cityNames = useMemo(() => {
    const map: Record<string, LText> = { ...CITY_NAMES };
    for (const d of directions) map[d.slug] = d.name;
    return map;
  }, [directions]);

  // Slider bounds come from the actual catalog so they never let a visitor
  // pick a range that would always be empty (or always be everything).
  const priceBounds: NumRange = useMemo(() => {
    if (tours.length === 0) return [0, 300_000];
    const values = tours.map((tour) => tour.priceFrom);
    const lo = Math.floor(Math.min(...values) / PRICE_STEP) * PRICE_STEP;
    const hi = Math.ceil(Math.max(...values) / PRICE_STEP) * PRICE_STEP;
    return [lo, hi];
  }, [tours]);

  const daysBounds: NumRange = useMemo(() => {
    if (tours.length === 0) return [1, 7];
    const values = tours.map((tour) => tour.days);
    return [Math.min(...values), Math.max(...values)];
  }, [tours]);

  const [filters, setFilters] = useState<Filters>(() => ({
    city: searchParams.get("city") ?? "",
    category: searchParams.get("category") ?? "",
    price: parseRange(searchParams.get("price"), priceBounds),
    days: parseRange(searchParams.get("days"), daysBounds),
  }));

  const applyFilters = (next: Filters) => {
    setFilters(next);
    const qs = new URLSearchParams();
    if (next.city) qs.set("city", next.city);
    if (next.category) qs.set("category", next.category);
    if (next.price[0] !== priceBounds[0] || next.price[1] !== priceBounds[1]) {
      qs.set("price", `${next.price[0]}-${next.price[1]}`);
    }
    if (next.days[0] !== daysBounds[0] || next.days[1] !== daysBounds[1]) {
      qs.set("days", `${next.days[0]}-${next.days[1]}`);
    }
    router.replace(`${localeHref("/tours", lang)}${qs.size ? `?${qs}` : ""}`, { scroll: false });
  };

  const setFilter = (key: "city" | "category", value: string) => applyFilters({ ...filters, [key]: value });

  const reset = () => applyFilters({ city: "", category: "", price: priceBounds, days: daysBounds });

  const hasActiveFilters =
    Boolean(filters.city) ||
    Boolean(filters.category) ||
    filters.price[0] !== priceBounds[0] ||
    filters.price[1] !== priceBounds[1] ||
    filters.days[0] !== daysBounds[0] ||
    filters.days[1] !== daysBounds[1];

  // Cities present in the catalog plus one arriving via deep link (e.g. from
  // a direction card) so the select never shows an unnamed value.
  const cityOptions = useMemo(() => {
    const present = new Set(tours.map((tour) => tour.city).filter((c): c is string => !!c));
    if (filters.city) present.add(filters.city);
    return Object.keys(cityNames).filter((slug) => present.has(slug));
  }, [tours, filters.city, cityNames]);

  const priceFmt = useMemo(() => new Intl.NumberFormat(lang === "en" ? "en-US" : "ru-RU"), [lang]);
  const fmtPrice = (n: number) => `${priceFmt.format(n)} ₸`;
  const fmtDays = (n: number) => `${n} ${n === 1 ? t.catalog.dayOne : t.catalog.dayOther}`;

  const filtered = tours.filter(
    (tour) =>
      (!filters.city || tour.city === filters.city) &&
      (!filters.category || tour.category === filters.category) &&
      tour.priceFrom >= filters.price[0] &&
      tour.priceFrom <= filters.price[1] &&
      tour.days >= filters.days[0] &&
      tour.days <= filters.days[1]
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
                    {cityNames[slug][lang]}
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
              <div className="mb-[9px] flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <span className={cx(ui.flabel, "mb-0")}>{t.catalog.fPrice}</span>
                <span className="whitespace-nowrap text-[12px] font-bold text-gold">
                  {fmtPrice(filters.price[0])} – {fmtPrice(filters.price[1])}
                </span>
              </div>
              <RangeSlider
                min={priceBounds[0]}
                max={priceBounds[1]}
                step={PRICE_STEP}
                value={filters.price}
                onChange={(price) => applyFilters({ ...filters, price })}
                minLabel={t.catalog.fPrice}
                maxLabel={t.catalog.fPrice}
              />
            </div>
            <div>
              <div className="mb-[9px] flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <span className={cx(ui.flabel, "mb-0")}>{t.catalog.fDays}</span>
                <span className="whitespace-nowrap text-[12px] font-bold text-gold">
                  {fmtDays(filters.days[0])} – {fmtDays(filters.days[1])}
                </span>
              </div>
              <RangeSlider
                min={daysBounds[0]}
                max={daysBounds[1]}
                value={filters.days}
                onChange={(days) => applyFilters({ ...filters, days })}
                minLabel={t.catalog.fDays}
                maxLabel={t.catalog.fDays}
              />
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
                <TourCard key={tour.slug} tour={tour} details={t.toursPage.details} book={t.catalog.book} bookMsg={t.catalog.bookMsg} lang={lang} delay={(i % 4) as 0 | 1 | 2 | 3} />
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

      <CtaBand labels={ctaLabels(t)} compact />
    </main>
  );
}
