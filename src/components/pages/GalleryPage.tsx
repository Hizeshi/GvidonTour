"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { GRID_IMAGES, GRID_SPANS, SLIDER_IMAGES } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

const SLIDES = SLIDER_IMAGES.length;

const gnav =
  "absolute top-1/2 z-[5] flex h-[54px] w-[54px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cream/25 bg-[rgba(0,16,36,0.5)] text-[22px] text-white backdrop-blur-[6px] transition-colors hover:border-gold hover:bg-gold hover:text-navy";

export default function GalleryPage() {
  const { t } = useLang();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % SLIDES), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <PageHead eyebrow={t.gallery.eyebrow} title={t.gallery.title} intro={t.gallery.intro} />

      <section className={cx(ui.sec, "pt-[30px]")}>
        <div className={ui.wrap}>
          <Reveal className="relative mt-[54px] h-[min(64vh,620px)] overflow-hidden rounded-[5px] bg-navy-2">
            {SLIDER_IMAGES.map((src, i) => (
              <div
                key={src}
                className={cx(
                  "absolute inset-0 transition-opacity duration-1000",
                  i === slide ? "z-[2] opacity-100" : "z-[1] opacity-0"
                )}
              >
                <Image
                  src={src}
                  alt={t.caps[i]}
                  fill
                  sizes="(max-width: 768px) 100vw, 1160px"
                  priority={i === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 z-[3] bg-[linear-gradient(0deg,rgba(0,16,36,0.78),transparent_46%)]" />
                <div className="absolute bottom-[38px] left-[42px] z-[4]">
                  <div className="text-[13px] font-bold tracking-[0.2em] text-gold">
                    {String(i + 1).padStart(2, "0")} / {String(SLIDES).padStart(2, "0")}
                  </div>
                  <div className={cx(ui.serif, "text-[clamp(26px,3vw,40px)]")}>{t.caps[i]}</div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className={cx(gnav, "left-6")}
              aria-label="Previous"
              onClick={() => setSlide((s) => (s + SLIDES - 1) % SLIDES)}
            >
              <span className="lic">
                <ChevronLeft />
              </span>
            </button>
            <button
              type="button"
              className={cx(gnav, "right-6")}
              aria-label="Next"
              onClick={() => setSlide((s) => (s + 1) % SLIDES)}
            >
              <span className="lic">
                <ChevronRight />
              </span>
            </button>
            <div className="absolute bottom-[46px] right-[42px] z-[5] flex gap-[9px]">
              {SLIDER_IMAGES.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={t.caps[i]}
                  className={cx(
                    "h-[9px] cursor-pointer rounded-full p-0 transition-all duration-300",
                    i === slide ? "w-[26px] rounded-[5px] bg-gold" : "w-[9px] bg-cream/35"
                  )}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          </Reveal>

          <Reveal
            className="mt-[18px] grid auto-rows-[170px] grid-cols-1 gap-[18px] sm:grid-cols-4 lg:grid-cols-6"
            delay={1}
          >
            {GRID_IMAGES.map((img, i) => (
              <div
                key={img.src + i}
                className={cx("group relative overflow-hidden rounded bg-navy-2", GRID_SPANS[i])}
              >
                <Image
                  src={img.src}
                  alt={t.caps[i]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  style={{ objectPosition: img.pos ?? "50% 50%" }}
                />
                <div className="absolute inset-x-0 bottom-0 z-[2] translate-y-2 bg-[linear-gradient(0deg,rgba(0,16,36,0.82),transparent)] px-[18px] pb-3.5 pt-[30px] text-[13px] font-semibold opacity-0 transition-all duration-[400ms] group-hover:translate-y-0 group-hover:opacity-100">
                  {t.caps[i]}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
