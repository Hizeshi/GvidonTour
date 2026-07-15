"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { CONTENT, type Dict, type Lang } from "./content";

interface LanguageContextValue {
  lang: Lang;
  t: Dict;
}

const LanguageContext = createContext<LanguageContextValue>({ lang: "ru", t: CONTENT.ru });

/** The language is part of the URL (/ru, /en, /kk), so it arrives as a prop
 *  from the [lang] route segment instead of being read from localStorage.
 *  That way the server renders the right language for each URL — which is
 *  what makes the EN/KK versions indexable. Switching language is a
 *  navigation (see LangSwitcher), not local state. */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  // The root layout renders a static <html lang>, so keep the attribute in
  // sync with the active locale for screen readers and browser translation.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, t: CONTENT[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
