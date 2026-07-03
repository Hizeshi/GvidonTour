"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal: returns a ref plus a " in" class suffix once the element
 * enters the viewport (or immediately for above-the-fold content).
 */
export function useReveal<T extends HTMLElement>(immediate = false) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(immediate);

  useEffect(() => {
    if (immediate || inView) return;
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const vh = window.innerHeight || 800;
    if (el.getBoundingClientRect().top < vh * 0.94) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  return { ref, cls: inView ? " in" : "" };
}
