"use client";

import Link from "@/components/LocaleLink";
import { ArrowLeft, Calendar, Check, Clock, Lightbulb, MapPin, MessageCircle, Route, X } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import type { CatalogTour } from "@/lib/catalog-types";
import { WHATSAPP_BOOKING } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import ImageSlider from "@/components/ImageSlider";
import KazMap from "@/components/KazMap";
import Reveal from "@/components/Reveal";
import TourCard from "@/components/TourCard";

interface TourDetailPageProps {
  tour: CatalogTour;
  similar: CatalogTour[];
}

export default function TourDetailPage({ tour, similar }: TourDetailPageProps) {
  const { t, lang } = useLang();
  const d = tour.details;
  const gallery = d?.gallery && d.gallery.length > 0 ? d.gallery : [tour.image];

  const waHref = `https://wa.me/${WHATSAPP_BOOKING}?text=${encodeURIComponent(
    t.catalog.bookMsg.replace("{title}", tour.title[lang])
  )}`;

  const factRow = "flex items-start gap-3 border-b border-content/10 py-3.5 last:border-b-0";
  const factIcon = "lic mt-0.5 flex-none text-[18px] text-gold";
  const factLabel = "text-[11px] uppercase tracking-[0.12em] text-content/50";
  const factValue = "mt-0.5 text-[15px] font-semibold text-content";

  return (
    <main>
      <div className="bg-gradient-to-b from-panel to-surface pb-10 pt-32">
        <div className={ui.wrap}>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-content/60 transition-colors hover:text-gold"
          >
            <span className="lic">
              <ArrowLeft />
            </span>
            {t.tourPage.back}
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-[2px] bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
              {tour.region[lang]}
            </span>
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-content/70">
              <span className="lic">
                <Clock />
              </span>
              {tour.duration[lang]}
            </span>
          </div>
          <h1 className={cx(ui.serif, "mt-3 max-w-[20ch] text-[clamp(30px,4vw,52px)]")}>
            {tour.title[lang]}
          </h1>
        </div>
      </div>

      <section className={cx(ui.sec, "pt-12")}>
        <div className={cx(ui.wrap, "grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start")}>
          {/* main column */}
          <div>
            <Reveal immediate>
              <ImageSlider images={gallery} alt={tour.title[lang]} className="h-[min(52vh,460px)]" />
            </Reveal>

            {/* facts */}
            <Reveal className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {d?.route && (
                <div className={factRow}>
                  <span className={factIcon}>
                    <Route />
                  </span>
                  <div>
                    <div className={factLabel}>{t.tourPage.route}</div>
                    <div className={factValue}>{d.route[lang]}</div>
                  </div>
                </div>
              )}
              <div className={factRow}>
                <span className={factIcon}>
                  <Clock />
                </span>
                <div>
                  <div className={factLabel}>{t.tourPage.duration}</div>
                  <div className={factValue}>{tour.duration[lang]}</div>
                </div>
              </div>
              {d?.startPlace && (
                <div className={factRow}>
                  <span className={factIcon}>
                    <MapPin />
                  </span>
                  <div>
                    <div className={factLabel}>{t.tourPage.startPlace}</div>
                    <div className={factValue}>{d.startPlace[lang]}</div>
                  </div>
                </div>
              )}
            </Reveal>

            {/* about */}
            <Reveal className="mt-12">
              <h2 className={cx(ui.serif, "text-[26px]")}>{t.tourPage.about}</h2>
              <div className={cx(ui.divider, "mt-4")} />
              <p className="mt-6 text-[17px] leading-[1.7] text-content/82">
                {d?.about ? d.about[lang] : tour.desc[lang]}
              </p>
            </Reveal>

            {/* program timeline */}
            {d?.program && d.program.length > 0 && (
              <Reveal className="mt-14">
                <h2 className={cx(ui.serif, "text-[26px]")}>{t.tourPage.program}</h2>
                <div className={cx(ui.divider, "mt-4")} />
                <ol className="mt-8 border-l border-gold/25">
                  {d.program.map((step, i) => (
                    <li key={i} className="relative pb-8 pl-8 last:pb-0">
                      <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-gold bg-surface" />
                      <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-gold">
                        <span className="lic text-[15px]">
                          <Calendar />
                        </span>
                        {step.time}
                      </div>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-content/80">{step.text[lang]}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            {/* included / not included */}
            {(d?.included?.length || d?.notIncluded?.length) && (
              <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {d?.included && d.included.length > 0 && (
                  <Reveal>
                    <h2 className={cx(ui.serif, "text-[22px]")}>{t.tourPage.included}</h2>
                    <ul className="mt-5 space-y-3">
                      {d.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[15px] leading-snug text-content/80">
                          <span className="lic mt-0.5 flex-none text-[18px] text-gold">
                            <Check />
                          </span>
                          {item[lang]}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
                {d?.notIncluded && d.notIncluded.length > 0 && (
                  <Reveal delay={1}>
                    <h2 className={cx(ui.serif, "text-[22px]")}>{t.tourPage.notIncluded}</h2>
                    <ul className="mt-5 space-y-3">
                      {d.notIncluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[15px] leading-snug text-content/60">
                          <span className="lic mt-0.5 flex-none text-[18px] text-content/40">
                            <X />
                          </span>
                          {item[lang]}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </div>
            )}

            {/* tips */}
            {d?.tips && d.tips.length > 0 && (
              <Reveal className="mt-14 rounded border border-gold/25 bg-gold/5 p-7">
                <h2 className={cx(ui.serif, "flex items-center gap-3 text-[22px]")}>
                  <span className="lic text-gold">
                    <Lightbulb />
                  </span>
                  {t.tourPage.tips}
                </h2>
                <ul className="mt-5 space-y-3">
                  {d.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-content/80">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                      {tip[lang]}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          {/* sticky booking sidebar */}
          <Reveal className="lg:sticky lg:top-28" delay={1}>
            <div className="rounded border border-content/12 bg-panel p-7">
              <div className="text-[13px] uppercase tracking-[0.12em] text-content/50">
                {t.tourPage.priceTitle}
              </div>
              <div className="mt-1 text-[30px] font-bold text-gold">{tour.priceText[lang]}</div>

              {d?.priceTable && d.priceTable.length > 0 && (
                <table className="mt-6 w-full border-collapse text-[14px]">
                  <thead>
                    <tr className="border-b border-content/12 text-left text-[11px] uppercase tracking-[0.1em] text-content/50">
                      <th className="pb-2 font-semibold">{t.tourPage.priceGroup}</th>
                      <th className="pb-2 text-right font-semibold">{t.tourPage.pricePer}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.priceTable.map((row, i) => (
                      <tr key={i} className="border-b border-content/8 last:border-b-0">
                        <td className="py-2.5 text-content/80">{row.group[lang]}</td>
                        <td className="py-2.5 text-right font-semibold text-content">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <p className="mt-5 text-[13px] leading-relaxed text-content/55">{t.tourPage.priceNote}</p>

              <div className="mt-6 space-y-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(ui.btnGold, "w-full justify-center")}
                >
                  {t.catalog.book}
                  <span className="lic">
                    <MessageCircle />
                  </span>
                </a>
                <Link href="/contacts" className={cx(ui.btnGhost, "w-full justify-center")}>
                  {t.tourPage.request}
                </Link>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded border border-content/12">
              <KazMap />
            </div>
          </Reveal>
        </div>
      </section>

      {/* similar tours */}
      {similar.length > 0 && (
        <section className={cx(ui.sec, "bg-alt pt-16 text-altcontent")}>
          <div className={ui.wrap}>
            <Reveal className="max-w-[760px]">
              <h2 className={ui.sectionTitle}>{t.tourPage.similar}</h2>
              <div className={ui.divider} />
            </Reveal>
            <div className="mt-[46px] grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s, i) => (
                <TourCard key={s.slug} tour={s} details={t.toursPage.details} delay={i % 4} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
