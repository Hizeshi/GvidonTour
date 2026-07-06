import { CONTENT, GRID_IMAGES, GRID_SPANS, TOUR_IMAGES } from "./content";
import type { CatalogGalleryItem, CatalogTour, LText } from "./catalog-types";
import { prisma } from "./db";

export type { CatalogGalleryItem, CatalogTour, LText } from "./catalog-types";

/** Static content assembled from the i18n dictionary — used when the DB is
 *  empty or unreachable so the site never renders blank. */
function fallbackTours(): CatalogTour[] {
  return CONTENT.ru.tours.map((ru, i) => {
    const en = CONTENT.en.tours[i];
    const kk = CONTENT.kk.tours[i];
    const img = TOUR_IMAGES[i];
    return {
      slug: `tour-${i + 1}`,
      region: { ru: ru.region, en: en.region, kk: kk.region },
      title: { ru: ru.title, en: en.title, kk: kk.title },
      desc: { ru: ru.desc, en: en.desc, kk: kk.desc },
      duration: { ru: ru.dur, en: en.dur, kk: kk.dur },
      priceText: { ru: ru.price, en: en.price, kk: kk.price },
      image: img.src,
      imagePos: img.pos ?? null,
    };
  });
}

function fallbackGallery(): CatalogGalleryItem[] {
  return GRID_IMAGES.map((img, i) => ({
    src: img.src,
    caption: {
      ru: CONTENT.ru.caps[i],
      en: CONTENT.en.caps[i],
      kk: CONTENT.kk.caps[i],
    },
    span: GRID_SPANS[i] || null,
  }));
}

export async function getTours(): Promise<CatalogTour[]> {
  try {
    const rows = await prisma.tour.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length === 0) return fallbackTours();
    return rows.map((r) => ({
      slug: r.slug,
      region: r.region as LText,
      title: r.title as LText,
      desc: r.desc as LText,
      duration: r.duration as LText,
      priceText: r.priceText as LText,
      image: r.image,
      imagePos: r.imagePos,
    }));
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static tours:", err);
    return fallbackTours();
  }
}

export async function getGalleryItems(): Promise<CatalogGalleryItem[]> {
  try {
    const rows = await prisma.galleryItem.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length === 0) return fallbackGallery();
    return rows.map((r) => ({
      src: r.src,
      caption: r.caption as LText,
      span: r.span,
    }));
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static gallery:", err);
    return fallbackGallery();
  }
}
