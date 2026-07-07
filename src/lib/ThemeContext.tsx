"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "dark", toggle: () => {} });

const STORAGE_KEY = "gv_theme";

/** Applies the theme class the inline no-flash script (in layout head) already
 *  set on first paint, then keeps React state and <html> in sync. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial: Theme = document.documentElement.classList.contains("light") ? "light" : "dark";
    setTheme(initial);
  }, []);

  const apply = useCallback((next: Theme) => {
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    apply(theme === "dark" ? "light" : "dark");
  }, [theme, apply]);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
