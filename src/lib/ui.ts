/**
 * Shared Tailwind class recipes for recurring design patterns.
 * Tailwind's scanner picks these string literals up like any JSX class list.
 */
export const ui = {
  wrap: "mx-auto w-full max-w-[1240px] px-[22px] md:px-10",
  sec: "py-[108px]",
  eyebrow: "text-[12.5px] font-bold uppercase tracking-[0.28em] text-gold",
  serif: "font-serif font-semibold leading-[1.08]",
  sectionTitle:
    "font-serif font-semibold leading-[1.08] mt-3.5 text-[clamp(34px,4vw,58px)]",
  lead: "mt-5 text-[19px] leading-[1.55]",
  divider: "mt-[26px] h-0.5 w-[54px] bg-gold",

  btnGold:
    "inline-flex cursor-pointer items-center gap-[9px] whitespace-nowrap rounded-[2px] border border-transparent bg-gold px-[26px] py-[13px] text-sm font-bold tracking-[0.04em] text-onaccent transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-2 hover:shadow-[0_12px_30px_-12px_rgba(226,159,91,0.7)]",
  // Inherits the surrounding text colour (currentColor) so it reads correctly
  // both over dark hero photos and on solid light/dark sections.
  btnGhost:
    "inline-flex cursor-pointer items-center gap-[9px] whitespace-nowrap rounded-[2px] border border-current/30 px-[26px] py-[13px] text-sm font-bold tracking-[0.04em] text-current transition-all duration-300 hover:border-gold hover:text-gold",

  flabel:
    "mb-[9px] block text-[12.5px] font-bold uppercase tracking-[0.1em] text-content/60",
  finput:
    "w-full rounded-[2px] border border-content/20 bg-content/[0.04] px-4 py-3.5 text-[15px] text-content transition-colors focus:border-gold focus:bg-content/[0.06] focus:outline-none",
};

/** Joins class fragments, skipping falsy values. */
export function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}
