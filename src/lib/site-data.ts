import type { Lang, NavKey } from "./content";

/** Everything about the site that isn't the translation dictionary: routes,
 *  photo lists, phone numbers, and the demo data the catalog falls back to when
 *  the database is down.
 *
 *  Split out of content.ts because client components need these — Header wants
 *  NAV_ROUTES, HomeHero wants HERO_SLIDES, ContactsPage wants PHONE — and any
 *  value import from content.ts drags CONTENT along with it. The bundler will
 *  not tree-shake a 62 KB object literal out of a module that is imported for
 *  one small constant, so asking for a phone number used to ship all three
 *  languages of every tour description to every visitor. Measured: the
 *  dictionary chunk was loading on the home page.
 *
 *  Rule: client components import from HERE. Only server components (and the
 *  type-only imports below) may touch content.ts. The types are imported as
 *  types on purpose — that is erased at compile time and creates no dependency
 *  on the dictionary at runtime. */

export const NAV_ROUTES: Record<NavKey, string> = {
  home: "/",
  about: "/about",
  tours: "/tours",
  gallery: "/gallery",
  services: "/services",
  agencies: "/agencies",
  blog: "/blog",
  contacts: "/contacts",
};

/** Sub-links shown in the "Tours" header dropdown — reuse the existing
 *  catalog filters (days=1, category=kids/mice) instead of new content types. */
export const TOURS_MENU_LINKS = [
  { key: "all", href: "/tours" },
  { key: "excursions", href: "/tours?days=1" },
  { key: "kids", href: "/tours?category=kids" },
  { key: "mice", href: "/tours?category=mice" },
] as const;

export const TOUR_IMAGES: { src: string; pos?: string }[] = [
  { src: "/images/tour-astana.jpg", pos: "50% 22%" },
  { src: "/images/tour-almaty.jpg" },
  { src: "/images/tour-charyn.jpg" },
  { src: "/images/tour-kolsai.jpg" },
  { src: "/images/tour-turkestan.jpg" },
  { src: "/images/tour-mangystau.jpg" },
];

/** Home hero slider — {src, capIndex} pairs into Dict.caps for localized alt text. */
export const HERO_SLIDES: { src: string; capIndex: number; pos?: string }[] = [
  { src: "/images/hero-astana.jpg", capIndex: 0 },
  { src: "/images/gal-bozzhyra.jpg", capIndex: 3 },
  { src: "/images/gal-charyn.jpg", capIndex: 1 },
  { src: "/images/cta-steppe.jpg", capIndex: 8 },
];

/** Gallery slider images (first six captions of Dict.caps). */
export const SLIDER_IMAGES: string[] = [
  "/images/hero-astana.jpg",
  "/images/gal-charyn.jpg",
  "/images/gal-kolsai.jpg",
  "/images/gal-bozzhyra.jpg",
  "/images/gal-shymbulak.jpg",
  "/images/gal-bao.jpg",
];

/** Gallery grid images, aligned with all nine captions of Dict.caps. */
export const GRID_IMAGES: { src: string; pos?: string }[] = [
  { src: "/images/gal-baiterek.jpg" },
  { src: "/images/gal-charyn.jpg" },
  { src: "/images/gal-kolsai.jpg" },
  { src: "/images/gal-bozzhyra.jpg" },
  { src: "/images/gal-shymbulak.jpg" },
  { src: "/images/gal-bao.jpg" },
  { src: "/images/gal-khanshatyr.jpg" },
  { src: "/images/gal-turkestan.jpg" },
  { src: "/images/cta-steppe.jpg" },
];

/** Tailwind span classes for the gallery mosaic, aligned with GRID_IMAGES. */
export const GRID_SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "sm:col-span-2",
  "",
  "sm:col-span-3",
  "",
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2",
  "sm:col-span-2",
];

export const PHONE = "+7 701 362 67 25";
export const PHONE_HREF = "tel:+77013626725";
export const PHONE_2 = "+7 775 944 31 36";
export const PHONE_2_HREF = "tel:+77759443136";
export const WHATSAPP_LINKS = [
  { label: "+7 701 362 67 25", href: "https://wa.me/77013626725" },
  { label: "+7 775 944 31 36", href: "https://wa.me/77759443136" },
];
export const EMAIL = "gvidontour.kz@gmail.com";
export const INSTAGRAM = "@gvidontour";

export const WHATSAPP_BOOKING = "77013626725";

/** Localized names shared by seed, fallbacks and the catalog filters. */
export type LocalizedName = Record<Lang, string>;

export const CITY_NAMES: Record<string, LocalizedName> = {
  astana: { ru: "Астана", en: "Astana", kk: "Астана" },
  almaty: { ru: "Алматы", en: "Almaty", kk: "Алматы" },
  burabay: { ru: "Бурабай", en: "Burabay", kk: "Бурабай" },
  charyn: { ru: "Чарын", en: "Charyn", kk: "Шарын" },
  baikonur: { ru: "Байконур", en: "Baikonur", kk: "Байқоңыр" },
  turkestan: { ru: "Туркестан", en: "Turkestan", kk: "Түркістан" },
  mangystau: { ru: "Мангистау", en: "Mangystau", kk: "Маңғыстау" },
};

export const CATEGORY_DATA = [
  { slug: "kids", icon: "backpack", name: { ru: "Детский туризм", en: "Kids tourism", kk: "Балалар туризмі" } },
  { slug: "industrial", icon: "factory", name: { ru: "Промышленный туризм", en: "Industrial tourism", kk: "Өнеркәсіптік туризм" } },
  { slug: "ethno", icon: "tent", name: { ru: "Этнотуры", en: "Ethno tours", kk: "Этнотурлар" } },
  { slug: "pilgrimage", icon: "landmark", name: { ru: "Паломнические туры", en: "Pilgrimage tours", kk: "Қажылық турлар" } },
  { slug: "vip", icon: "crown", name: { ru: "VIP", en: "VIP", kk: "VIP" } },
  { slug: "mice", icon: "briefcase", name: { ru: "MICE", en: "MICE", kk: "MICE" } },
];

export const DIRECTION_DATA = [
  { slug: "astana", image: "/images/tour-astana.jpg", name: CITY_NAMES.astana },
  { slug: "almaty", image: "/images/tour-almaty.jpg", name: CITY_NAMES.almaty },
  { slug: "burabay", image: "/images/dir-burabay.jpg", name: CITY_NAMES.burabay },
  { slug: "charyn", image: "/images/tour-charyn.jpg", name: CITY_NAMES.charyn },
  { slug: "baikonur", image: "/images/dir-baikonur.jpg", name: CITY_NAMES.baikonur },
  { slug: "turkestan", image: "/images/tour-turkestan.jpg", name: CITY_NAMES.turkestan },
];

/** Presentation-only crop hints for direction card images. */
export const DIRECTION_IMAGE_POS: Record<string, string> = {
  astana: "50% 22%",
};

/** Demo testimonials — the client replaces these with real reviews via the DB.
 *  videoUrl is optional (shows a "watch video review" link when present). */
export const REVIEW_DATA = [
  {
    author: "Анна Ковалёва",
    rating: 5,
    videoUrl: null as string | null,
    text: {
      ru: "Организовали нам тур по Астане и Боровому — всё до мелочей продумано, гид великолепный. Вернёмся ещё!",
      en: "They arranged a tour of Astana and Burabay for us — everything thought through to the last detail, a wonderful guide. We'll be back!",
      kk: "Астана мен Бурабай бойынша тур ұйымдастырды — бәрі майда-шүйдесіне дейін ойластырылған, гид тамаша. Тағы ораламыз!",
    },
  },
  {
    author: "Марат Сулейменов",
    rating: 5,
    videoUrl: null,
    text: {
      ru: "Ездили на Чарын и Кольсай. Трансфер вовремя, обеды вкусные, маршрут — огонь. Рекомендую GVIDON TOUR всем.",
      en: "We went to Charyn and Kolsai. Transfers on time, tasty meals, a fantastic route. I recommend GVIDON TOUR to everyone.",
      kk: "Шарын мен Көлсайға бардық. Трансфер уақытында, тамақ дәмді, маршрут керемет. GVIDON TOUR-ды бәріне ұсынамын.",
    },
  },
  {
    author: "Elena Fischer",
    rating: 5,
    videoUrl: null,
    text: {
      ru: "Приезжала из Германии на экспедицию в Мангистау. Профессиональная команда и незабываемые пейзажи Бозжыры.",
      en: "I came from Germany for the Mangystau expedition. A professional team and the unforgettable landscapes of Bozzhyra.",
      kk: "Германиядан Маңғыстау экспедициясына келдім. Кәсіби команда және Бозжыраның ұмытылмас пейзаждары.",
    },
  },
];

/** Achievement placeholders — the client provides real licence/award/partner
 *  images (kept in the office); until then these render as labelled icon tiles. */
export const ACHIEVEMENT_DATA = [
  { icon: "shield-check", name: { ru: "Лицензия туроператора", en: "Tour operator licence", kk: "Туроператор лицензиясы" } },
  { icon: "award", name: { ru: "Сертификаты качества", en: "Quality certificates", kk: "Сапа сертификаттары" } },
  { icon: "trophy", name: { ru: "Отраслевые награды", en: "Industry awards", kk: "Салалық марапаттар" } },
  { icon: "map-pin", name: { ru: "Visit Astana", en: "Visit Astana", kk: "Visit Astana" } },
  { icon: "handshake", name: { ru: "Надёжные партнёры", en: "Trusted partners", kk: "Сенімді серіктестер" } },
];

export const TOUR_META = [
  { slug: "astana-city", days: 2, priceFrom: 120_000, city: "astana", featured: true },
  { slug: "almaty-alatau", days: 3, priceFrom: 180_000, city: "almaty", featured: true },
  { slug: "charyn-canyon", days: 1, priceFrom: 45_000, city: "charyn", featured: true },
  { slug: "kolsai-kaindy", days: 2, priceFrom: 95_000, city: "almaty" },
  { slug: "turkestan", days: 2, priceFrom: 110_000, city: "turkestan" },
  { slug: "mangystau-bozzhyra", days: 4, priceFrom: 290_000, city: "mangystau" },
];

/** Demo blog posts — the client replaces these with real articles via the DB.
 *  Aligned with Dict.blogPosts by index. */
export const BLOG_META = [
  { slug: "top-5-places-kazakhstan", image: "/images/gal-bozzhyra.jpg", publishedAt: "2026-03-10" },
  { slug: "best-time-mangystau", image: "/images/tour-mangystau.jpg", publishedAt: "2026-02-18" },
  { slug: "packing-guide-kazakhstan", image: "/images/about-yurt.jpg", publishedAt: "2026-01-25" },
  { slug: "kazakhstan-visa-guide", image: "/images/hero-astana.jpg", publishedAt: "2026-01-05" },
];
