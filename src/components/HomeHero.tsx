"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { cx, ui } from "@/lib/ui";
import Reveal from "./Reveal";

export default function HomeHero() {
  const { t } = useLang();
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const hero = heroRef.current;
      const bg = bgRef.current;
      if (hero && bg) {
        const top = hero.getBoundingClientRect().top;
        bg.style.transform = `translateY(${-top * 0.18}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative flex h-screen min-h-[640px] items-end overflow-hidden" ref={heroRef}>
      <div className="absolute inset-x-0 -top-[10%] -bottom-[10%] z-0 will-change-transform" ref={bgRef}>
        <Image
          src="/images/hero-astana.jpg"
          alt={t.caps[0]}
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,16,36,0.62)_0%,rgba(0,16,36,0.32)_38%,rgba(0,16,36,0.86)_88%,#00152F_100%)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(120%_80%_at_18%_90%,rgba(0,21,47,0.7),transparent_60%)]" />
      <div className={cx(ui.wrap, "relative z-[2] pb-[9vh]")}>
        <Reveal className={ui.eyebrow} immediate>
          {t.hero.eyebrow}
        </Reveal>
        <Reveal
          as="h1"
          className={cx(
            ui.serif,
            "mt-[18px] max-w-[15ch] text-balance text-[clamp(44px,6.6vw,104px)] [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]"
          )}
          delay={1}
          immediate
        >
          {t.hero.title}
        </Reveal>
        <Reveal
          as="p"
          className="mt-6 max-w-[54ch] text-[clamp(16px,1.35vw,20px)] text-cream/85"
          delay={2}
          immediate
        >
          {t.hero.sub}
        </Reveal>
        <Reveal className="mt-[38px] flex flex-wrap gap-4" delay={3} immediate>
          <Link href="/tours" className={ui.btnGold}>
            {t.hero.cta1}
            <span className="lic">
              <ArrowRight />
            </span>
          </Link>
          <Link href="/contacts" className={ui.btnGhost}>
            {t.hero.cta2}
          </Link>
        </Reveal>
      </div>
      <div className="absolute bottom-[26px] left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-[9px] text-[10.5px] uppercase tracking-[0.26em] text-cream/60 [@media(max-height:760px)]:hidden">
        <span>{t.hero.scroll}</span>
        <span className="h-[46px] w-px animate-scrolln bg-gradient-to-b from-gold/90 to-transparent" />
      </div>
    </section>
  );
}
