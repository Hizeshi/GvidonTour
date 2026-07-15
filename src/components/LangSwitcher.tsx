"use client";

// Plain next/link on purpose: these hrefs already carry their own locale
// prefix, so LocaleLink would double it.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { A11Y_LABELS } from "@/lib/a11y";
// LOCALES straight from i18n, not the LANGS alias re-exported by content.ts:
// importing anything by value from content.ts risks dragging the whole
// three-language dictionary into this client bundle, which is what the move to
// server components just removed. i18n.ts only type-imports content.
import { LOCALES, localeHref, stripLocale } from "@/lib/i18n";
import { cx } from "@/lib/ui";

export default function LangSwitcher({ tone }: { tone: string }) {
  const { lang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const a11y = A11Y_LABELS[lang];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Switching language keeps you on the same page, just in the other locale.
  const basePath = stripLocale(pathname);

  return (
    <div
      ref={ref}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`${a11y.languageSwitcher}: ${lang.toUpperCase()}`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="language-options"
        className={cx(
          "flex cursor-pointer items-center gap-1 rounded px-2 py-[5px] text-xs font-bold tracking-[0.08em] transition-colors",
          tone
        )}
      >
        {lang.toUpperCase()}
        <span className={cx("lic text-[12px] transition-transform duration-300", open && "rotate-180")}>
          <ChevronDown />
        </span>
      </button>
      <div
        id="language-options"
        aria-hidden={!open}
        inert={!open}
        className={cx(
          "absolute right-0 top-full z-10 mt-2 min-w-[86px] rounded-[3px] border border-content/10 bg-panel p-1.5 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)] transition-all duration-200",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        {LOCALES.map((code) => (
          <Link
            key={code}
            href={localeHref(basePath, code)}
            hrefLang={code}
            aria-current={lang === code ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={cx(
              "block w-full cursor-pointer rounded-[2px] px-3 py-2 text-left text-xs font-bold tracking-[0.08em] transition-colors",
              lang === code ? "bg-gold text-onaccent" : "text-content/75 hover:bg-gold/10 hover:text-gold"
            )}
          >
            {code.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
