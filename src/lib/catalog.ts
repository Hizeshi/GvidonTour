import { unstable_cache } from "next/cache";
import { cache } from "react";
import {
  ACHIEVEMENT_DATA,
  BLOG_META,
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
  CatalogAchievement,
  CatalogBlogPost,
  CatalogCategory,
  CatalogDirection,
  CatalogGalleryItem,
  CatalogReview,
  CatalogTour,
  LText,
  TourDetails,
} from "./catalog-types";
import { normalizeBlogContent } from "./blog-blocks";
import { TOUR_DETAILS } from "./tour-details";
import { prisma } from "./db";
import { CATALOG_REVALIDATE_SECONDS, CATALOG_TAGS } from "./catalog-cache";

export type {
  CatalogAchievement,
  CatalogBlogPost,
  CatalogCategory,
  CatalogDirection,
  CatalogGalleryItem,
  CatalogReview,
  CatalogTour,
  LText,
  TourDetails,
} from "./catalog-types";

/** Static content assembled from the i18n dictionary, served **only when the
 *  database is unreachable**, so an outage doesn't blank the site.
 *
 *  An *empty* table is not an outage: it means the admin unpublished or
 *  deleted everything, and that has to render as empty. Treating the two the
 *  same used to resurrect the six demo tours the moment the last real tour was
 *  hidden — the site contradicting its own admin panel. */
function fallbackTours(): CatalogTour[] {
  return CONTENT.ru.tours.map((ru, i) => {
    const en = CONTENT.en.tours[i];
    const kk = CONTENT.kk.tours[i];
    const img = TOUR_IMAGES[i];
    const meta = TOUR_META[i];
    return {
      slug: meta.slug,
      updatedAt: null,
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
      featured: meta.featured ?? false,
      details: TOUR_DETAILS[meta.slug] ?? null,
    };
  });
}

function fallbackGallery(): CatalogGalleryItem[] {
  return GRID_IMAGES.map((img, i) => ({
    kind: "PHOTO" as const,
    src: img.src,
    videoUrl: null,
    caption: {
      ru: CONTENT.ru.caps[i],
      en: CONTENT.en.caps[i],
      kk: CONTENT.kk.caps[i],
    },
    span: GRID_SPANS[i] || null,
  }));
}

const queryTours = unstable_cache(
  async (): Promise<CatalogTour[]> => {
    const rows = await prisma.tour.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: { category: { select: { slug: true } } },
    });
  return rows.map((r) => ({
    slug: r.slug,
    updatedAt: r.updatedAt.toISOString(),
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
      featured: r.featured,
      details: (r.details as TourDetails | null) ?? TOUR_DETAILS[r.slug] ?? null,
    }));
  },
  ["catalog-tours-v1"],
  { tags: [CATALOG_TAGS.tours], revalidate: CATALOG_REVALIDATE_SECONDS },
);

export const getTours = cache(async (): Promise<CatalogTour[]> => {
  try {
    return await queryTours();
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static tours:", err);
    return fallbackTours();
  }
});

/** Single tour by slug, for the detail page. */
export async function getTourBySlug(slug: string): Promise<CatalogTour | null> {
  const tours = await getTours();
  return tours.find((tour) => tour.slug === slug) ?? null;
}

const queryGalleryItems = unstable_cache(
  async (): Promise<CatalogGalleryItem[]> => {
    const rows = await prisma.galleryItem.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    return rows.map((r) => ({
      kind: r.kind,
      src: r.src,
      videoUrl: r.videoUrl,
      caption: r.caption as LText,
      span: r.span,
    }));
  },
  ["catalog-gallery-v1"],
  { tags: [CATALOG_TAGS.gallery], revalidate: CATALOG_REVALIDATE_SECONDS },
);

export const getGalleryItems = cache(async (): Promise<CatalogGalleryItem[]> => {
  try {
    return await queryGalleryItems();
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static gallery:", err);
    return fallbackGallery();
  }
});

const queryCategories = unstable_cache(async (): Promise<CatalogCategory[]> => {
  const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((r) => ({ slug: r.slug, name: r.name as LText, icon: r.icon }));
}, ["catalog-categories-v1"], {
  tags: [CATALOG_TAGS.categories],
  revalidate: CATALOG_REVALIDATE_SECONDS,
});

export const getCategories = cache(async (): Promise<CatalogCategory[]> => {
  try {
    return await queryCategories();
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static categories:", err);
    return CATEGORY_DATA;
  }
});

const queryDirections = unstable_cache(async (): Promise<CatalogDirection[]> => {
  const rows = await prisma.direction.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((r) => ({ slug: r.slug, name: r.name as LText, image: r.image }));
}, ["catalog-directions-v1"], {
  tags: [CATALOG_TAGS.directions],
  revalidate: CATALOG_REVALIDATE_SECONDS,
});

export const getDirections = cache(async (): Promise<CatalogDirection[]> => {
  try {
    return await queryDirections();
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static directions:", err);
    return DIRECTION_DATA;
  }
});

function fallbackReviews(): CatalogReview[] {
  return REVIEW_DATA.map((r) => ({
    author: r.author,
    rating: r.rating,
    text: r.text,
    photo: null,
    videoUrl: r.videoUrl,
  }));
}

const queryReviews = unstable_cache(
  async (): Promise<CatalogReview[]> => {
    const rows = await prisma.review.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
    });
    return rows.map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text as LText,
      photo: r.photo,
      videoUrl: r.videoUrl,
    }));
  },
  ["catalog-reviews-v1"],
  { tags: [CATALOG_TAGS.reviews], revalidate: CATALOG_REVALIDATE_SECONDS },
);

export const getReviews = cache(async (): Promise<CatalogReview[]> => {
  try {
    return await queryReviews();
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static reviews:", err);
    return fallbackReviews();
  }
});

function fallbackAchievements(): CatalogAchievement[] {
  return ACHIEVEMENT_DATA.map((a) => ({ title: a.name, image: null, icon: a.icon }));
}

const queryAchievements = unstable_cache(async (): Promise<CatalogAchievement[]> => {
  const rows = await prisma.achievement.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((r) => ({ title: r.title as LText, image: r.image, icon: null }));
}, ["catalog-achievements-v1"], {
  tags: [CATALOG_TAGS.achievements],
  revalidate: CATALOG_REVALIDATE_SECONDS,
});

export const getAchievements = cache(async (): Promise<CatalogAchievement[]> => {
  try {
    return await queryAchievements();
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static achievements:", err);
    return fallbackAchievements();
  }
});

function fallbackBlogPosts(): CatalogBlogPost[] {
  return BLOG_META.map((meta, i) => {
    const ru = CONTENT.ru.blogPosts[i];
    const en = CONTENT.en.blogPosts[i];
    const kk = CONTENT.kk.blogPosts[i];
    return {
      slug: meta.slug,
      title: { ru: ru.title, en: en.title, kk: kk.title },
      excerpt: { ru: ru.excerpt, en: en.excerpt, kk: kk.excerpt },
      content: ru.content.map((_, pi) => ({
        type: "text" as const,
        text: { ru: ru.content[pi], en: en.content[pi], kk: kk.content[pi] },
      })),
      image: meta.image,
      publishedAt: meta.publishedAt,
    };
  });
}

const queryBlogPosts = unstable_cache(
  async (): Promise<CatalogBlogPost[]> => {
    const rows = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    });
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title as LText,
      excerpt: r.excerpt as LText,
      content: normalizeBlogContent(r.content),
      image: r.image,
      publishedAt: r.publishedAt.toISOString(),
    }));
  },
  ["catalog-blog-v1"],
  { tags: [CATALOG_TAGS.blog], revalidate: CATALOG_REVALIDATE_SECONDS },
);

export const getBlogPosts = cache(async (): Promise<CatalogBlogPost[]> => {
  try {
    return await queryBlogPosts();
  } catch (err) {
    console.error("[catalog] DB unavailable, serving static blog posts:", err);
    return fallbackBlogPosts();
  }
});

export async function getBlogPostBySlug(slug: string): Promise<CatalogBlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
