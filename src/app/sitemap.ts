import type { MetadataRoute } from "next";
import { getBlogPosts, getTours } from "@/lib/catalog";
import { localeHref, LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/tours",
  "/gallery",
  "/reviews",
  "/services",
  "/agencies",
  "/blog",
  "/contacts",
];

/** Every page is listed once per locale, since /ru/tours, /en/tours and
 *  /kk/tours are three separate indexable URLs. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, posts] = await Promise.all([getTours(), getBlogPosts()]);
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    for (const path of STATIC_ROUTES) {
      entries.push({
        url: `${SITE_URL}${localeHref(path, lang)}`,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.7,
      });
    }
    for (const tour of tours) {
      entries.push({
        url: `${SITE_URL}${localeHref(`/tours/${tour.slug}`, lang)}`,
        ...(tour.updatedAt ? { lastModified: tour.updatedAt } : {}),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    for (const post of posts) {
      entries.push({
        url: `${SITE_URL}${localeHref(`/blog/${post.slug}`, lang)}`,
        lastModified: post.publishedAt,
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
