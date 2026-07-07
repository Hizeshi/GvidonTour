"use client";

import { useLang } from "@/lib/LanguageContext";
import { ACHIEVEMENT_DATA } from "@/lib/content";
import IconByName from "./IconByName";
import Reveal from "./Reveal";

/** Placeholder achievement tiles. The client's real licence / award / partner
 *  images will replace these icon tiles once provided. */
export default function AchievementsStrip() {
  const { lang } = useLang();
  return (
    <div className="mt-[54px] grid grid-cols-2 gap-[18px] sm:grid-cols-3 lg:grid-cols-5">
      {ACHIEVEMENT_DATA.map((a, i) => (
        <Reveal
          key={a.icon}
          className="flex flex-col items-center gap-3 rounded border border-content/10 bg-content/[0.02] px-4 py-8 text-center transition-colors duration-300 hover:border-gold/40"
          delay={(i % 4) as 0 | 1 | 2 | 3}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-[26px] text-gold">
            <IconByName name={a.icon} />
          </span>
          <span className="text-[13.5px] font-semibold leading-snug text-content/80">{a.name[lang]}</span>
        </Reveal>
      ))}
    </div>
  );
}
