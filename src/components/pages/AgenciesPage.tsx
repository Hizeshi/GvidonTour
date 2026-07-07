"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { WHATSAPP_BOOKING } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import IconByName from "@/components/IconByName";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

export default function AgenciesPage() {
  const { t } = useLang();
  const a = t.agencies;
  const waHref = `https://wa.me/${WHATSAPP_BOOKING}?text=${encodeURIComponent(a.bookMsg)}`;

  return (
    <main>
      <PageHead eyebrow={a.eyebrow} title={a.title} intro={a.intro} />

      <section className={cx(ui.sec, "pt-[54px]")}>
        <div className={ui.wrap}>
          <Reveal className="text-center" immediate>
            <div className={ui.eyebrow}>{a.benefitsEyebrow}</div>
            <h2 className={cx(ui.sectionTitle, "mx-auto max-w-[46ch]")}>{a.benefitsTitle}</h2>
            <div className={cx(ui.divider, "mx-auto")} />
          </Reveal>
          <div className="mt-[54px] grid grid-cols-1 gap-px overflow-hidden rounded border border-content/10 bg-content/10 sm:grid-cols-2 lg:grid-cols-4">
            {a.benefits.map((b, i) => (
              <Reveal
                key={b.icon}
                className="bg-surface px-7 py-[38px] transition-colors duration-[400ms] hover:bg-panel"
                delay={(i % 4) as 0 | 1 | 2 | 3}
              >
                <div className="mb-6 text-[28px] text-gold">
                  <IconByName name={b.icon} />
                </div>
                <h3 className="mb-3 text-[18px] font-bold">{b.t}</h3>
                <p className="text-[14px] leading-relaxed text-content/60">{b.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={cx(ui.sec, "bg-alt pt-[54px] text-altcontent")}>
        <div className={ui.wrap}>
          <Reveal className="text-center" immediate>
            <div className={ui.eyebrow}>{a.stepsEyebrow}</div>
            <h2 className={cx(ui.sectionTitle, "mx-auto max-w-[46ch]")}>{a.stepsTitle}</h2>
            <div className={cx(ui.divider, "mx-auto")} />
          </Reveal>
          <div className="mt-[54px] grid grid-cols-1 gap-[34px] sm:grid-cols-3">
            {a.steps.map((s, i) => (
              <Reveal key={s.n} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="font-serif text-[52px] font-semibold leading-none text-gold/35">{s.n}</div>
                <h3 className="mt-4 text-[19px] font-bold">{s.t}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-altcontent/65">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 text-center">
        <div className="absolute inset-0 z-0">
          <Image src="/images/cta-steppe.jpg" alt={t.caps[8]} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(0,16,36,0.82),rgba(0,16,36,0.9))]" />
        <Reveal className="relative z-[2] mx-auto max-w-[680px] px-[22px] text-ondark">
          <h2 className={cx(ui.serif, "text-[clamp(32px,4vw,52px)]")}>{a.ctaTitle}</h2>
          <p className={cx(ui.lead, "text-ondark/60")}>{a.ctaSub}</p>
          <div className="mt-[38px] flex flex-wrap justify-center gap-4">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className={ui.btnGold}>
              {a.ctaBtn}
              <span className="lic">
                <MessageCircle />
              </span>
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
