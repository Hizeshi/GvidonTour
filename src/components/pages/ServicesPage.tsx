"use client";

import { useLang } from "@/lib/LanguageContext";
import { cx, ui } from "@/lib/ui";
import CtaBand from "@/components/CtaBand";
import IconByName from "@/components/IconByName";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

export default function ServicesPage() {
  const { t } = useLang();
  return (
    <main>
      <PageHead eyebrow={t.services.eyebrow} title={t.services.title} intro={t.services.intro} />

      <section className={cx(ui.sec, "pt-[54px]")}>
        <div className={ui.wrap}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-content/10 bg-content/10 sm:grid-cols-2 lg:grid-cols-3">
            {t.servicesItems.map((s, i) => (
              <Reveal
                key={s.icon}
                className="bg-surface px-9 py-[42px] transition-colors duration-[400ms] hover:bg-panel"
                delay={(i % 4) as 0 | 1 | 2 | 3}
              >
                <div className="mb-6 text-[30px] text-gold">
                  <IconByName name={s.icon} />
                </div>
                <h3 className="mb-3 text-[21px] font-bold">{s.t}</h3>
                <p className="text-[14.5px] leading-relaxed text-content/60">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand compact />
    </main>
  );
}
