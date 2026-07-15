"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Dict } from "@/lib/content";
import { HERO_SLIDES } from "@/lib/site-data";
import { cx, ui } from "@/lib/ui";
import Reveal from "./Reveal";
import { useSwipe } from "./useSwipe";

const SLIDE_MS = 7000;

/** Client island: auto-advancing slider, parallax and swipe.
 *
 *  It takes the handful of strings it needs as props. `Dict` is imported as a
 *  type only — a value import of the dictionary here would undo the point of
 *  the refactor and pull all three languages back into the browser. */
export default function HomeHero({ hero, caps }: { hero: Dict["hero"]; caps: Dict["caps"] }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [slide, setSlide] = useState(0);
  // Only the first slide is rendered during initial load; the hidden ones
  // (full-viewport images each) mount shortly after so they don't compete
  // with the LCP image for bandwidth.
  const [warm, setWarm] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setWarm(true), 2500);
    return () => clearTimeout(id);
  }, []);

  const goTo = (n: number) => {
    setWarm(true);
    setSlide(n);
  };

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const section = heroRef.current;
      const bg = bgRef.current;
      if (section && bg) {
        const top = section.getBoundingClientRect().top;
        bg.style.transform = `translateY(${-top * 0.18}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (HERO_SLIDES.length < 2) return;
    const timer = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, []);

  const swipe = useSwipe({
    onSwipeLeft: () => goTo((slide + 1) % HERO_SLIDES.length),
    onSwipeRight: () => goTo((slide + HERO_SLIDES.length - 1) % HERO_SLIDES.length),
  });

  return (
    <section
      className="relative flex h-screen min-h-[640px] items-end overflow-hidden"
      ref={heroRef}
      {...swipe}
    >
      <div className="absolute inset-x-0 -top-[10%] -bottom-[10%] z-0 will-change-transform" ref={bgRef}>
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.src}
            className={cx(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
              i === slide ? "opacity-100" : "opacity-0"
            )}
          >
            {(i === 0 || warm) && (
              <Image
                src={s.src}
                alt={caps[s.capIndex]}
                fill
                priority={i === 0}
                sizes="100vw"
                className="animate-kenburns object-cover"
                style={{ objectPosition: s.pos ?? "50% 50%" }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,16,36,0.62)_0%,rgba(0,16,36,0.32)_38%,rgba(0,16,36,0.86)_88%,#00152F_100%)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(120%_80%_at_18%_90%,rgba(0,21,47,0.7),transparent_60%)]" />
      <div className={cx(ui.wrap, "relative z-[2] pb-[9vh] text-ondark")}>
        <Reveal className={ui.eyebrow} immediate>
          {hero.eyebrow}
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
          {hero.title}
        </Reveal>
        <Reveal
          as="p"
          className="mt-6 max-w-[54ch] text-[clamp(16px,1.35vw,20px)] text-ondark/85"
          delay={2}
          immediate
        >
          {hero.sub}
        </Reveal>
        <Reveal className="mt-[38px] flex flex-wrap gap-4" delay={3} immediate>
          <Link href="/tours" className={ui.btnGold}>
            {hero.cta1}
            <span className="lic">
              <ArrowRight />
            </span>
          </Link>
          <Link href="/contacts" className={ui.btnGhost}>
            {hero.cta2}
          </Link>
        </Reveal>
      </div>

      {HERO_SLIDES.length > 1 && (
        <div className="absolute bottom-[22px] left-1/2 z-[3] flex -translate-x-1/2 sm:left-auto sm:right-20 sm:translate-x-0">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`${caps[s.capIndex]} (${i + 1})`}
              onClick={() => goTo(i)}
              className="group/dot flex h-6 min-w-6 cursor-pointer items-center justify-center p-0"
            >
              <span
                className={cx(
                  "h-[9px] rounded-full transition-all duration-300",
                  i === slide
                    ? "w-[26px] rounded-[5px] bg-gold"
                    : "w-[9px] bg-ondark/40 group-hover/dot:bg-ondark/70"
                )}
              />
            </button>
          ))}
        </div>
      )}

      <div className="absolute bottom-[26px] left-1/2 z-[3] hidden -translate-x-1/2 flex-col items-center gap-[9px] text-[10.5px] uppercase tracking-[0.26em] text-ondark/60 sm:flex [@media(max-height:760px)]:hidden">
        <span>{hero.scroll}</span>
        <span className="h-[46px] w-px animate-scrolln bg-gradient-to-b from-gold/90 to-transparent" />
      </div>
    </section>
  );
}
