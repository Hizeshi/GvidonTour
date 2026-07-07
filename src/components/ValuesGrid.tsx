"use client";

import { useLang } from "@/lib/LanguageContext";
import { cx } from "@/lib/ui";
import IconByName from "./IconByName";
import Reveal from "./Reveal";

/** tone: "dark" for navy sections, "cream" for the light section on the home page. */
export default function ValuesGrid({ tone = "dark" }: { tone?: "dark" | "cream" }) {
  const { t } = useLang();
  const card =
    tone === "cream"
      ? "border-altcontent/10 bg-altpanel hover:border-gold/60"
      : "border-content/10 bg-gradient-to-b from-content/[0.035] to-transparent hover:border-gold/50 hover:from-gold/[0.07]";
  const desc = tone === "cream" ? "text-altcontent/60" : "text-content/60";

  return (
    <div className="mt-[60px] grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
      {t.values.map((v, i) => (
        <Reveal
          key={v.icon}
          className={cx(
            "rounded-[3px] border px-7 py-[34px] transition-all duration-[400ms] hover:-translate-y-1.5",
            card
          )}
          delay={(i % 4) as 0 | 1 | 2 | 3}
        >
          <div className="mb-[22px] flex h-[50px] w-[50px] items-center justify-center rounded-full border border-gold/50 text-[22px] text-gold">
            <IconByName name={v.icon} />
          </div>
          <h3 className="mb-2.5 text-xl font-bold">{v.t}</h3>
          <p className={cx("text-[14.5px] leading-[1.55]", desc)}>{v.d}</p>
        </Reveal>
      ))}
    </div>
  );
}
