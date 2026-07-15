import type { Lang } from "./content";

interface A11yLabels {
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  languageSwitcher: string;
  lightTheme: string;
  darkTheme: string;
  close: string;
  previous: string;
  next: string;
  breadcrumbs: string;
}

export const A11Y_LABELS: Record<Lang, A11yLabels> = {
  ru: {
    skipToContent: "Перейти к содержимому",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    languageSwitcher: "Выбрать язык",
    lightTheme: "Включить светлую тему",
    darkTheme: "Включить тёмную тему",
    close: "Закрыть",
    previous: "Предыдущее",
    next: "Следующее",
    breadcrumbs: "Навигационная цепочка",
  },
  en: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageSwitcher: "Choose language",
    lightTheme: "Use light theme",
    darkTheme: "Use dark theme",
    close: "Close",
    previous: "Previous",
    next: "Next",
    breadcrumbs: "Breadcrumbs",
  },
  kk: {
    skipToContent: "Мазмұнға өту",
    openMenu: "Мәзірді ашу",
    closeMenu: "Мәзірді жабу",
    languageSwitcher: "Тілді таңдау",
    lightTheme: "Ашық тақырыпты қосу",
    darkTheme: "Қараңғы тақырыпты қосу",
    close: "Жабу",
    previous: "Алдыңғы",
    next: "Келесі",
    breadcrumbs: "Навигациялық тізбек",
  },
};
