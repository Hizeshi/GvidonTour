import type { NextConfig } from "next";

/*
 * Content-Security-Policy notes:
 * - script-src/style-src need 'unsafe-inline' because Next.js inlines its
 *   hydration scripts and next/font injects inline styles. For a site with no
 *   user-generated content this is an accepted trade-off; a stricter
 *   nonce-based CSP would require dynamic rendering (middleware).
 * - connect-src allows open.er-api.com (client-side exchange-rate fetch in
 *   CurrencyTicker); frame-src allows YouTube/Vimeo embeds (Lightbox video
 *   items) — both fall back to 'self' via default-src otherwise and would be
 *   silently blocked.
 * - Everything else is served same-origin: fonts are self-hosted by
 *   next/font, all photos live in /public.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://open.er-api.com",
  "frame-src https://www.youtube.com https://player.vimeo.com",
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
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
