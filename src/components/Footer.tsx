"use client";

import Link from "@/components/LocaleLink";
import { useLang } from "@/lib/LanguageContext";
import { EMAIL, NAV_ROUTES, PHONE, PHONE_2, PHONE_2_HREF, PHONE_HREF, type NavKey } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import CurrencyTicker from "./CurrencyTicker";
import Logo from "./Logo";

const NAV_KEYS: NavKey[] = ["home", "about", "tours", "gallery", "services", "agencies", "blog", "contacts"];

const footLink =
  "block cursor-pointer py-1.5 text-[14.5px] text-content/70 transition-colors hover:text-gold";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-gold/15 bg-footer pb-[34px] pt-[74px]">
      <div className={ui.wrap}>
        <div className="grid grid-cols-1 gap-[34px] md:grid-cols-[1.5fr_1fr_1fr] md:gap-[54px]">
          <div>
            <Link href="/" className="flex items-center gap-[13px]">
              <div className="h-[42px] w-[42px] flex-none [&_svg]:block [&_svg]:h-full [&_svg]:w-full">
                <Logo />
              </div>
              <div>
                <div className="whitespace-nowrap text-lg font-extrabold leading-none tracking-[0.22em]">
                  GVIDON TOUR
                </div>
                <div className="mt-1 max-w-[170px] text-[8.5px] uppercase tracking-[0.2em] text-gold/85">
                  {t.brandTag}
                </div>
              </div>
            </Link>
            <p className="mt-[22px] max-w-[38ch] text-[14.5px] leading-relaxed text-content/55">
              {t.about.intro}
            </p>
          </div>
          <div>
            <div className="mb-5 text-[13px] uppercase tracking-[0.16em] text-gold">
              {t.footer.nav}
            </div>
            {NAV_KEYS.map((key) => (
              <Link key={key} href={NAV_ROUTES[key]} className={footLink}>
                {t.nav[key]}
              </Link>
            ))}
          </div>
          <div>
            <div className="mb-5 text-[13px] uppercase tracking-[0.16em] text-gold">
              {t.footer.contacts}
            </div>
            <span className={footLink}>{t.contacts.address}</span>
            <a className={footLink} href={PHONE_HREF}>
              {PHONE}
            </a>
            <a className={footLink} href={PHONE_2_HREF}>
              {PHONE_2}
            </a>
            <a className={cx(footLink, "break-all")} href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
        </div>
        <div className="mt-[54px] border-t border-content/10 pt-[26px]">
          <CurrencyTicker />
        </div>
        <div className="mt-[22px] flex flex-wrap items-center justify-between gap-3.5 text-[13px] text-content/60">
          <span>© 2026 GVIDON TOUR. {t.footer.rights}</span>
          <span className="font-serif text-[15px] italic text-gold/85">{t.slogan}</span>
        </div>
      </div>
    </footer>
  );
}
