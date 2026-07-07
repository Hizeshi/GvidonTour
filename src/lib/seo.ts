/** Canonical production URL — update if a custom domain is connected later.
 *  Used for metadataBase, sitemap.xml, robots.txt and JSON-LD "url" fields. */
export const SITE_URL = "https://gvidon-tour.vercel.app";

/** Serializes JSON-LD for a <script> tag, escaping "<" so a "</script>" inside
 *  any string field (title, description, ...) can't break out of the tag.
 *  Matters once this data comes from the DB via a future admin panel instead
 *  of hand-written demo content. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
