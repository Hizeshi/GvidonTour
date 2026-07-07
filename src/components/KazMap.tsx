"use client";

import { useState } from "react";
import { Plane } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { cx } from "@/lib/ui";

export default function KazMap() {
  const { t } = useLang();
  const [activeCity, setActiveCity] = useState(-1);

  return (
    <div className="kazmap relative mt-[34px] h-[430px] overflow-hidden rounded-[5px] border border-current/10">
      <div className="absolute left-1/2 top-1/2 h-[64%] w-[78%] -translate-x-1/2 -translate-y-1/2 -rotate-3 rounded-[46%_54%_60%_40%/50%_46%_54%_50%] border border-dashed border-gold/30 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(226,159,91,0.05),transparent_70%)]" />
      <svg
        className="absolute inset-0 z-[2] h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {["M55 28 Q70 40 72 68", "M55 28 Q44 52 46 73", "M55 28 Q28 38 9 60", "M55 28 Q60 22 64 22"].map(
          (d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="rgba(226,159,91,0.55)"
              strokeWidth="0.5"
              strokeDasharray="2.5 2.5"
              className="animate-dash"
            />
          )
        )}
      </svg>
      <span className="lic absolute z-[5] animate-fly text-lg text-gold">
        <Plane />
      </span>
      {t.mapCities.map((c, i) => {
        const active = activeCity === i;
        return (
          <div
            key={c.n}
            className="group absolute z-[4] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
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
