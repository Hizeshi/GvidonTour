import {
  CATEGORY_DATA,
  CONTENT,
  DIRECTION_DATA,
  GRID_IMAGES,
  GRID_SPANS,
  REVIEW_DATA,
  TOUR_IMAGES,
  TOUR_META,
} from "./content";
import type {
  CatalogCategory,
  CatalogDirection,
  CatalogGalleryItem,
  CatalogReview,
  CatalogTour,
  LText,
  TourDetails,
} from "./catalog-types";
import { TOUR_DETAILS } from "./tour-details";
import { prisma } from "./db";

export type {
  CatalogCategory,
  CatalogDirection,
  CatalogGalleryItem,
  CatalogReview,
  CatalogTour,
  LText,
  TourDetails,
} from "./catalog-types";

/** Static content assembled from the i18n dictionary — used when the DB is
 *  empty or unreachable so the site never renders blank. */
function fallbackTours(): CatalogTour[] {
  return CONTENT.ru.tours.map((ru, i) => {
    const en = CONTENT.en.tours[i];
    const kk = CONTENT.kk.tours[i];
    const img = TOUR_IMAGES[i];
    const meta = TOUR_META[i];
    return {
      slug: meta.slug,
      region: { ru: ru.region, en: en.region, kk: kk.region },
      title: { ru: ru.title, en: en.title, kk: kk.title },
      desc: { ru: ru.desc, en: en.desc, kk: kk.desc },
      duration: { ru: ru.dur, en: en.dur, kk: kk.dur },
      priceText: { ru: ru.price, en: en.price, kk: kk.price },
      image: img.src,
      imagePos: img.pos ?? null,
      days: meta.days,
      priceFrom: meta.priceFrom,
      city: meta.city,
      category: null,
      details: TOUR_DETAILS[meta.slug] ?? null,
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
      include: { category: { select: { slug: true } } },
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
      days: r.days,
      priceFrom: r.priceFrom,
      city: r.city,
      category: r.category?.slug ?? null,
      details: (r.details as TourDetails | null) ?? TOUR_DETAILS[r.slug] ?? null,
    }));
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static tours:", err);
    return fallbackTours();
  }
}

/** Single tour by slug, for the detail page. */
export async function getTourBySlug(slug: string): Promise<CatalogTour | null> {
  const tours = await getTours();
  return tours.find((tour) => tour.slug === slug) ?? null;
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

export async function getCategories(): Promise<CatalogCategory[]> {
  try {
    const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return CATEGORY_DATA;
    return rows.map((r) => ({ slug: r.slug, name: r.name as LText, icon: r.icon }));
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static categories:", err);
    return CATEGORY_DATA;
  }
}

export async function getDirections(): Promise<CatalogDirection[]> {
  try {
    const rows = await prisma.direction.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return DIRECTION_DATA;
    return rows.map((r) => ({ slug: r.slug, name: r.name as LText, image: r.image }));
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static directions:", err);
    return DIRECTION_DATA;
  }
}

function fallbackReviews(): CatalogReview[] {
  return REVIEW_DATA.map((r) => ({
    author: r.author,
    rating: r.rating,
    text: r.text,
    photo: null,
    videoUrl: r.videoUrl,
  }));
}

export async function getReviews(): Promise<CatalogReview[]> {
  try {
    const rows = await prisma.review.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
    });
    if (rows.length === 0) return fallbackReviews();
    return rows.map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text as LText,
      photo: r.photo,
      videoUrl: r.videoUrl,
    }));
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static reviews:", err);
    return fallbackReviews();
  }
}
