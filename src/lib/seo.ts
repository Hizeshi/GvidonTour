/** Canonical production URL — update if a custom domain is connected later.
 *  Used for metadataBase, sitemap.xml, robots.txt and JSON-LD "url" fields. */
export const SITE_URL = "https://gvidon-tour.vercel.app";

/** Absolute URL for an image reference. Local files are stored as "/images/x.jpg"
 *  and need the site prefix; anything uploaded through the admin media library
 *  is already an absolute Supabase URL and must be left alone — blindly
 *  prefixing produced "https://site...https://..." and broke the structured
 *  data for every uploaded photo. */
export function absoluteUrl(src: string): string {
  return /^https?:\/\//i.test(src) ? src : `${SITE_URL}${src}`;
}

/** Serializes JSON-LD for a <script> tag, escaping "<" so a "</script>" inside
 *  any string field (title, description, ...) can't break out of the tag.
 *  Matters once this data comes from the DB via a future admin panel instead
 *  of hand-written demo content. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
