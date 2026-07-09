"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { LANGS } from "@/lib/content";
import { cx } from "@/lib/ui";

export default function LangSwitcher({ tone }: { tone: string }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
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
        className={cx(
          "absolute right-0 top-full z-10 mt-2 min-w-[86px] rounded-[3px] border border-content/10 bg-panel p-1.5 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)] transition-all duration-200",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => {
              setLang(code);
              setOpen(false);
            }}
            className={cx(
              "block w-full cursor-pointer rounded-[2px] px-3 py-2 text-left text-xs font-bold tracking-[0.08em] transition-colors",
              lang === code ? "bg-gold text-onaccent" : "text-content/75 hover:bg-gold/10 hover:text-gold"
            )}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
