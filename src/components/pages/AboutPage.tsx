"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { cx, ui } from "@/lib/ui";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import ValuesGrid from "@/components/ValuesGrid";

export default function AboutPage() {
  const { t } = useLang();
  return (
    <main>
      <PageHead eyebrow={t.about.eyebrow} title={t.about.title} intro={t.about.intro} />

      <section className={ui.sec}>
        <div className={cx(ui.wrap, "grid grid-cols-1 items-center gap-[38px] md:grid-cols-2 md:gap-[70px]")}>
          <Reveal>
            <div className={ui.eyebrow}>{t.about.storyEyebrow}</div>
            <h2 className={cx(ui.serif, "mb-7 mt-3.5 text-[clamp(28px,3vw,42px)]")}>
              {t.about.storyTitle}
            </h2>
            <p className="mb-5 text-[17px] leading-[1.7] text-content/80">{t.about.p1}</p>
            <p className="mb-5 text-[17px] leading-[1.7] text-content/80">{t.about.p2}</p>
          </Reveal>
          <Reveal className="relative h-[300px] overflow-hidden rounded md:h-[480px]" delay={1}>
            <Image
              src="/images/about-yurt.jpg"
              alt={t.about.storyTitle}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section>
        <div className={cx(ui.wrap, "pb-[90px] pt-[30px]")}>
          <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
            {t.stats.map((s, i) => (
              <Reveal key={s.l} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="font-serif text-[54px] font-semibold leading-none text-gold">
                  {s.n}
                </div>
                <div className="mt-2.5 text-sm tracking-[0.02em] text-content/60">{s.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={cx(ui.sec, "bg-alt text-altcontent")}>
        <div className={ui.wrap}>
          <Reveal className="max-w-[760px]">
            <div className={ui.eyebrow}>{t.about.dirEyebrow}</div>
          </Reveal>
          <div className="mt-[46px] grid grid-cols-1 items-center gap-[38px] md:grid-cols-[300px_1fr] md:gap-[54px]">
            <Reveal className="relative flex h-[300px] items-center justify-center overflow-hidden rounded bg-gradient-to-br from-panel to-[#00132B] md:h-[380px]">
              <div className="font-serif text-8xl leading-none text-gold/85">
                Т.В.
                <small className="mt-[18px] block text-center font-sans text-[11px] uppercase tracking-[0.3em] text-content/45">
                  GVIDON TOUR
                </small>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <span className="lic text-[38px] text-gold">
                <Quote />
              </span>
              <p className={cx(ui.serif, "mb-[26px] mt-[18px] font-medium italic leading-[1.32] text-[clamp(24px,2.6vw,36px)]")}>
                {t.about.dirQuote}
              </p>
              <div className="text-xl font-bold">{t.about.dirName}</div>
              <div className="mt-[5px] text-[13px] uppercase tracking-[0.18em] text-gold">
                {t.about.dirRole}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={ui.sec}>
        <div className={ui.wrap}>
          <Reveal className="max-w-[760px]">
            <div className={ui.eyebrow}>{t.valuesHead.eyebrow}</div>
            <h2 className={ui.sectionTitle}>{t.valuesHead.title}</h2>
            <div className={ui.divider} />
          </Reveal>
          <ValuesGrid />
        </div>
      </section>
    </main>
  );
}
