"use client";

import { useEffect, useRef, useState } from "react";
import { Plane } from "lucide-react";
import type { Dict } from "@/lib/content";
import { KZ_CITIES, KZ_FLIGHT_ORDER, KZ_OUTLINE_PATH, KZ_VIEWBOX, type KzCityPos } from "@/lib/kz-outline";
import { cx } from "@/lib/ui";

const CANVAS = { w: 1984.254, h: 1133.857 };
const ASPECT = CANVAS.w / CANVAS.h;

function cityPos(key: string): KzCityPos {
  return KZ_CITIES.find((c) => c.key === key) ?? KZ_CITIES[0];
}

function toPx(c: KzCityPos) {
  return { x: (c.xPct / 100) * CANVAS.w, y: (c.yPct / 100) * CANVAS.h };
}

/** Client island: an animated plane loops between the cities. It takes the
 *  city labels as a prop rather than reading the dictionary from context. */
export default function KazMap({ mapCities }: { mapCities: Dict["mapCities"] }) {
  const [activeCity, setActiveCity] = useState(-1);
  const planeRef = useRef<HTMLSpanElement | null>(null);

  const cities = mapCities.map((c) => ({ ...c, ...cityPos(c.key) }));
  const hub = cities.find((c) => c.hub) ?? cities[0];

  // Flies the plane through every city in a loop, at constant apparent
  // speed (keyframe offsets weighted by aspect-corrected leg distance) and
  // rotated to face the direction of travel.
  useEffect(() => {
    const el = planeRef.current;
    if (!el) return;

    const waypoints = KZ_FLIGHT_ORDER.map(cityPos);
    const legLengths: number[] = [];
    let total = 0;
    for (let i = 1; i < waypoints.length; i++) {
      const dx = waypoints[i].xPct - waypoints[i - 1].xPct;
      const dy = (waypoints[i].yPct - waypoints[i - 1].yPct) / ASPECT;
      const len = Math.hypot(dx, dy);
      legLengths.push(len);
      total += len;
    }

    const angleTo = (a: KzCityPos, b: KzCityPos) =>
      (Math.atan2((b.yPct - a.yPct) / ASPECT, b.xPct - a.xPct) * 180) / Math.PI;

    let cumulative = 0;
    const keyframes: Keyframe[] = waypoints.map((wp, i) => {
      if (i > 0) cumulative += legLengths[i - 1];
      const offset = total > 0 ? Math.min(cumulative / total, 1) : 0;
      const angle =
        i < waypoints.length - 1 ? angleTo(wp, waypoints[i + 1]) : angleTo(waypoints[i - 1], wp);
      return {
        offset,
        left: `${wp.xPct}%`,
        top: `${wp.yPct}%`,
        transform: `translate(-50%, -50%) rotate(${angle + 45}deg)`,
      };
    });

    const duration = Math.max(18000, Math.min(32000, total * 900));
    const animation = el.animate(keyframes, { duration, iterations: Infinity, easing: "ease-in-out" });
    return () => animation.cancel();
  }, []);

  return (
    <div
      className="kazmap relative mt-[34px] w-full overflow-hidden rounded-[5px] border border-current/10"
      style={{ aspectRatio: `${CANVAS.w} / ${CANVAS.h}` }}
    >
      <svg className="absolute inset-0 z-[1] h-full w-full" viewBox={KZ_VIEWBOX} aria-hidden="true">
        <path
          d={KZ_OUTLINE_PATH}
          fill="currentColor"
          fillOpacity="0.07"
          stroke="rgba(226,159,91,0.65)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {cities
          .filter((c) => !c.hub)
          .map((c) => {
            const from = toPx(hub);
            const to = toPx(c);
            return (
              <path
                key={c.key}
                d={`M${from.x},${from.y} L${to.x},${to.y}`}
                fill="none"
                stroke="rgba(226,159,91,0.45)"
                strokeWidth="3"
                strokeDasharray="10 8"
                className="animate-dash"
              />
            );
          })}
      </svg>
      <span
        ref={planeRef}
        className="lic absolute z-[5] text-lg text-gold"
        style={{ left: `${hub.xPct}%`, top: `${hub.yPct}%`, transform: "translate(-50%, -50%)" }}
      >
        <Plane />
      </span>
      {cities.map((c, i) => {
        const active = activeCity === i;
        return (
          <div
            key={c.key}
            className="group absolute z-[4] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${c.xPct}%`, top: `${c.yPct}%` }}
            onClick={() => setActiveCity(i)}
          >
            <span
              className={cx(
                "block rounded-full bg-gold transition-transform duration-300 group-hover:scale-150",
                c.hub ? "h-[15px] w-[15px] animate-pulse-dot" : "h-[11px] w-[11px]"
              )}
            />
            <span
              className={cx(
                "kazmap-label pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[3px] border border-gold/30 px-2.5 py-1 text-xs font-semibold tracking-[0.04em] transition-all duration-300 group-hover:bottom-[22px] group-hover:opacity-100",
                active ? "bottom-[22px] opacity-100" : "bottom-[18px] opacity-0"
              )}
            >
              {c.n}
            </span>
          </div>
        );
      })}
    </div>
  );
}
