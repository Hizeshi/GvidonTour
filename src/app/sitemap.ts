import type { MetadataRoute } from "next";
import { getBlogPosts, getTours } from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES = [
  "",
  "/about",
  "/tours",
  "/gallery",
  "/reviews",
  "/services",
  "/agencies",
  "/blog",
  "/contacts",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, posts] = await Promise.all([getTours(), getBlogPosts()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const tourEntries: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${SITE_URL}/tours/${tour.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...tourEntries, ...blogEntries];
}
