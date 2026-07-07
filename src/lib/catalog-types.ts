// Shared shapes for DB-driven catalog data.
// Kept separate from catalog.ts so client components can import the types
// without pulling the Prisma/pg server code into the bundle.

import type { Lang } from "./content";

export type LText = Record<Lang, string>;

export interface ProgramStep {
  time: string;
  text: LText;
}

export interface PriceRow {
  group: LText;
  price: string;
}

/** Rich content for the tour/excursion detail page, stored in Tour.details (Json). */
export interface TourDetails {
  route?: LText;
  startPlace?: LText;
  about?: LText;
  gallery?: string[];
  program?: ProgramStep[];
  included?: LText[];
  notIncluded?: LText[];
  tips?: LText[];
  priceTable?: PriceRow[];
}

export interface CatalogTour {
  slug: string;
  region: LText;
  title: LText;
  desc: LText;
  duration: LText;
  priceText: LText;
  image: string;
  imagePos: string | null;
  days: number;
  priceFrom: number;
  city: string | null;
  category: string | null;
  details: TourDetails | null;
}

export interface CatalogGalleryItem {
  kind: "PHOTO" | "VIDEO";
  src: string; // photo, or video poster/thumbnail when kind === "VIDEO"
  videoUrl: string | null;
  caption: LText;
  span: string | null;
}

export interface CatalogCategory {
  slug: string;
  name: LText;
  icon: string;
}

export interface CatalogDirection {
  slug: string;
  name: LText;
  image: string | null;
}

export interface CatalogReview {
  author: string;
  rating: number;
  text: LText;
  photo: string | null;
  videoUrl: string | null;
}

export interface CatalogBlogPost {
  slug: string;
  title: LText;
  excerpt: LText;
  content: LText[];
  image: string;
  publishedAt: string; // ISO date
}
