"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "@/lib/ui";

const gnav =
  "absolute top-1/2 z-[5] flex h-[50px] w-[50px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-ondark/25 bg-[rgba(0,16,36,0.5)] text-[22px] text-white backdrop-blur-[6px] transition-colors hover:border-gold hover:bg-gold hover:text-onaccent";

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  autoPlayMs?: number;
}

export default function ImageSlider({ images, alt, className, autoPlayMs = 6000 }: ImageSliderProps) {
  const [slide, setSlide] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(() => setSlide((s) => (s + 1) % count), autoPlayMs);
    return () => clearInterval(timer);
  }, [count, autoPlayMs]);

  return (
    <div className={cx("relative overflow-hidden rounded-[5px] bg-panel", className)}>
      {images.map((src, i) => (
        <div
          key={src + i}
          className={cx(
            "absolute inset-0 transition-opacity duration-1000",
            i === slide ? "z-[2] opacity-100" : "z-[1] opacity-0"
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 760px"
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            className={cx(gnav, "left-4")}
            aria-label="Previous"
            onClick={() => setSlide((s) => (s + count - 1) % count)}
          >
            <span className="lic">
              <ChevronLeft />
            </span>
          </button>
          <button
            type="button"
            className={cx(gnav, "right-4")}
            aria-label="Next"
            onClick={() => setSlide((s) => (s + 1) % count)}
          >
            <span className="lic">
              <ChevronRight />
            </span>
          </button>
          <div className="absolute bottom-4 left-1/2 z-[5] flex -translate-x-1/2 gap-[9px]">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                aria-label={`${i + 1}`}
                className={cx(
                  "h-[9px] cursor-pointer rounded-full p-0 transition-all duration-300",
                  i === slide ? "w-[26px] rounded-[5px] bg-gold" : "w-[9px] bg-ondark/40"
                )}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
