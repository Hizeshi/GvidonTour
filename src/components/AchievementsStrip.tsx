import type { CatalogAchievement } from "@/lib/catalog-types";
import type { Lang } from "@/lib/content";
import IconByName from "./IconByName";
import Reveal from "./Reveal";

/** Renders real licence/award/partner photos once the client provides them
 *  (via the admin panel); falls back to labelled icon placeholders. */
export default function AchievementsStrip({
  achievements,
  lang,
}: {
  achievements: CatalogAchievement[];
  lang: Lang;
}) {
  return (
    <div className="mt-[54px] grid grid-cols-2 gap-[18px] sm:grid-cols-3 lg:grid-cols-5">
      {achievements.map((a, i) => (
        <Reveal
          key={a.title[lang] + i}
          className="flex flex-col items-center gap-3 rounded border border-content/10 bg-content/[0.02] px-4 py-8 text-center transition-colors duration-300 hover:border-gold/40"
          delay={(i % 4) as 0 | 1 | 2 | 3}
        >
          {a.image ? (
            // Plain <img>: the admin can paste a URL from any host, and next/image
            // throws at runtime for hostnames missing from images.remotePatterns.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={a.image}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-[26px] text-gold">
              <IconByName name={a.icon ?? "award"} />
            </span>
          )}
          <span className="text-[13.5px] font-semibold leading-snug text-content/80">{a.title[lang]}</span>
        </Reveal>
      ))}
    </div>
  );
}
