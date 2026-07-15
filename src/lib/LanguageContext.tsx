"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Lang } from "./content";

/** Carries **only the locale**, never the dictionary.
 *
 *  This provider used to import CONTENT and hand `t` to every consumer. Because
 *  it is a client component, that shipped all three languages — a 62 KB chunk —
 *  to every visitor, who then read one third of it. Worse, it forced every
 *  component that wanted a translated string to be a client component too, so
 *  practically the whole public site hydrated for nothing.
 *
 *  Now the dictionary stays on the server: server components read CONTENT[lang]
 *  directly and the text arrives as finished HTML. The interactive islands that
 *  genuinely need strings take them as props. What is left here is a two-letter
 *  locale, kept in context only so LocaleLink can prefix hrefs without every
 *  caller threading it through.
 *
 *  The locale comes from the [lang] URL segment (see (site)/[lang]/layout.tsx),
 *  which is what makes the EN/KK pages indexable. Switching language is a
 *  navigation (LangSwitcher), not state. */
const LanguageContext = createContext<{ lang: Lang }>({ lang: "ru" });

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LanguageContext.Provider value={{ lang }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
