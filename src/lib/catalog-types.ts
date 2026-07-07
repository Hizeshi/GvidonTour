// Shared shapes for DB-driven catalog data.
// Kept separate from catalog.ts so client components can import the types
// without pulling the Prisma/pg server code into the bundle.

import type { Lang } from "./content";

export type LText = Record<Lang, string>;

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
}

export interface CatalogGalleryItem {
  src: string;
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
