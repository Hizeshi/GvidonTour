import type { NextConfig } from "next";

/*
 * Content-Security-Policy notes:
 * - script-src/style-src need 'unsafe-inline' because Next.js inlines its
 *   hydration scripts and next/font injects inline styles. For a site with no
 *   user-generated content this is an accepted trade-off; a stricter
 *   nonce-based CSP would require dynamic rendering (middleware).
 * - connect-src allows open.er-api.com (client-side exchange-rate fetch in
 *   CurrencyTicker); frame-src allows YouTube/Vimeo embeds (Lightbox video
 *   items, blog video blocks) and Cloudflare Turnstile (review-form
 *   captcha) — all fall back to 'self' via default-src otherwise and would
 *   be silently blocked. script-src also allows Turnstile's widget script.
 * - img-src/media-src allow the Supabase Storage host: admin-uploaded photos
 *   and videos are served from the public "media" bucket there.
 * - The analytics hosts (Yandex Metrica, GA4) need script-src to load their
 *   snippets, connect-src to report hits, img-src for their tracking pixels
 *   and, for Metrica's webvisor, frame-src. Miss any one of these and the
 *   counter fails silently — which is exactly how analytics dies unnoticed.
 * - Everything else is served same-origin: fonts are self-hosted by
 *   next/font, all photos live in /public.
 */
const SUPABASE_HOST = "https://hkozmvhdzuegihwhmeyl.supabase.co";
const YANDEX_HOSTS = "https://mc.yandex.ru https://mc.yandex.com https://yastatic.net";
const GA_HOSTS = "https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com ${YANDEX_HOSTS} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${SUPABASE_HOST} ${YANDEX_HOSTS} ${GA_HOSTS}`,
  `media-src 'self' ${SUPABASE_HOST}`,
  "font-src 'self'",
  `connect-src 'self' https://open.er-api.com https://challenges.cloudflare.com ${YANDEX_HOSTS} ${GA_HOSTS}`,
  `frame-src https://www.youtube.com https://player.vimeo.com https://challenges.cloudflare.com ${YANDEX_HOSTS}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Ignored over plain HTTP; takes effect once the site is served via HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first (25-40% smaller than WebP for photos); WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // Photos are effectively immutable (new uploads get new names), so let
    // optimized variants live in the CDN cache for 31 days.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hkozmvhdzuegihwhmeyl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Only the admin forms' RPC-style payloads (tour programmes, blog blocks
      // in three languages) come through server actions — file uploads go
      // through a Route Handler, which this setting does not affect. Modest
      // headroom over the 1 MB default is all these JSON bodies need.
      bodySizeLimit: "2mb",
    },
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
