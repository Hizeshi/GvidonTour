"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import { NAV_ROUTES, TOURS_MENU_LINKS, type NavKey } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import LangSwitcher from "./LangSwitcher";
import Logo from "./Logo";

const NAV_KEYS: NavKey[] = ["home", "about", "tours", "gallery", "services", "agencies", "blog", "contacts"];

const navBase =
  "relative cursor-pointer py-1 text-sm font-semibold tracking-[0.02em] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-gold after:transition-[width] after:duration-300 hover:after:w-full";

export default function Header() {
  const { t } = useLang();
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setToursOpen(false);
  }, [pathname]);

  const solid = !isHome || scrolled || open;

  // Over the hero photo the header text must stay light; once solid it follows
  // the active theme.
  const headText = solid ? "text-content" : "text-ondark";
  const navInactive = solid ? "text-content/80 hover:text-content" : "text-ondark/80 hover:text-ondark";
  const iconBtn = cx(
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[18px] transition-colors",
    solid ? "text-content/70 hover:text-gold" : "text-ondark/70 hover:text-gold"
  );
  const burgerBar = cx("block h-0.5 w-[22px] transition-all duration-300", solid ? "bg-content" : "bg-ondark");

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 border-b py-[22px] transition-all duration-[450ms]",
          solid ? "border-gold/15 bg-surface/95 py-3.5 backdrop-blur-[14px]" : "border-transparent"
        )}
      >
        <div className={cx(ui.wrap, "flex items-center justify-between gap-6")}>
          <Link href="/" className="-ml-1.5 flex items-center gap-[13px] md:-ml-2" aria-label="GVIDON TOUR">
            <div className="h-[42px] w-[42px] flex-none [&_svg]:block [&_svg]:h-full [&_svg]:w-full">
              <Logo />
            </div>
            <div className="hidden sm:block">
              <div className={cx("whitespace-nowrap text-lg font-extrabold leading-none tracking-[0.22em]", headText)}>
                GVIDON TOUR
              </div>
              <div className="mt-1 hidden max-w-[170px] text-[8.5px] uppercase tracking-[0.2em] text-gold/85 md:block">
                {t.brandTag}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-[30px] lg:flex">
            {NAV_KEYS.map((key) => {
              const active = pathname === NAV_ROUTES[key];
              if (key === "tours") {
                return (
                  <div key={key} className="group relative">
                    <Link
                      href={NAV_ROUTES[key]}
                      className={cx(navBase, "flex items-center gap-1", active ? "text-gold after:w-full" : navInactive)}
                    >
                      {t.nav[key]}
                      <span className="lic text-[13px] transition-transform duration-300 group-hover:rotate-180">
                        <ChevronDown />
                      </span>
                    </Link>
                    <div className="invisible absolute left-0 top-full z-10 min-w-[210px] rounded-[3px] border border-content/10 bg-panel p-2 opacity-0 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      {TOURS_MENU_LINKS.map((link) => (
                        <Link
                          key={link.key}
                          href={link.href}
                          className="block cursor-pointer rounded-[2px] px-3.5 py-2.5 text-[13.5px] font-semibold text-content/75 transition-colors hover:bg-gold/10 hover:text-gold"
                        >
                          {t.toursMenu[link.key]}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={key}
                  href={NAV_ROUTES[key]}
                  className={cx(navBase, active ? "text-gold after:w-full" : navInactive)}
                >
                  {t.nav[key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              className={iconBtn}
              aria-label={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
              onClick={toggle}
            >
              <span className="lic">{theme === "dark" ? <Sun /> : <Moon />}</span>
            </button>
            <LangSwitcher tone={navInactive} />
            <button
              type="button"
              className="flex h-11 w-11 flex-none cursor-pointer flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-label={t.nav.home}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={cx(burgerBar, open && "translate-y-[7px] rotate-45")} />
              <span className={cx(burgerBar, open && "opacity-0")} />
              <span className={cx(burgerBar, open && "-translate-y-[7px] -rotate-45")} />
            </button>
          </div>
        </div>
      </header>

      <nav
        className={cx(
          "fixed inset-x-0 top-0 z-40 flex flex-col gap-2 border-b border-gold/20 bg-surface/98 px-[26px] pb-[34px] pt-24 backdrop-blur-2xl transition-transform duration-[400ms] lg:hidden",
          open ? "translate-y-0" : "-translate-y-[102%]"
        )}
      >
        {NAV_KEYS.map((key) => {
          const active = pathname === NAV_ROUTES[key];
          const rowCls = cx(
            navBase,
            "py-3 text-lg",
            active ? "text-gold after:w-full" : "text-content/80 hover:text-content"
          );
          if (key === "tours") {
            return (
              <div key={key}>
                <div className="flex items-center justify-between">
                  <Link href={NAV_ROUTES[key]} className={rowCls} onClick={() => setOpen(false)}>
                    {t.nav[key]}
                  </Link>
                  <button
                    type="button"
                    aria-label={t.nav[key]}
                    aria-expanded={toursOpen}
                    onClick={() => setToursOpen((v) => !v)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center text-content/55"
                  >
                    <span
                      className={cx("lic text-[16px] transition-transform duration-300", toursOpen && "rotate-180")}
                    >
                      <ChevronDown />
                    </span>
                  </button>
                </div>
                <div
                  className={cx(
                    "grid transition-all duration-300",
                    toursOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="mb-1.5 ml-3.5 flex flex-col gap-0.5 border-l border-content/15 pl-3.5">
                      {TOURS_MENU_LINKS.map((link) => (
                        <Link
                          key={link.key}
                          href={link.href}
                          className="cursor-pointer py-2 text-[14.5px] font-semibold text-content/60 transition-colors hover:text-gold"
                          onClick={() => setOpen(false)}
                        >
                          {t.toursMenu[link.key]}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <Link key={key} href={NAV_ROUTES[key]} className={rowCls} onClick={() => setOpen(false)}>
              {t.nav[key]}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
