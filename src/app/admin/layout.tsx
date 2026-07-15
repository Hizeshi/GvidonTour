import type { Metadata, Viewport } from "next";
import RootHtml from "@/components/RootHtml";
import { SITE_URL } from "@/lib/seo";

/** Root layout for the admin branch — the panel and the login page both sit
 *  under it. Separate from the site's root layout only because <html lang>
 *  differs: the panel is Russian-only, while the site takes its language from
 *  the URL. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Панель управления", template: "%s — Админка GVIDON TOUR" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#00152F",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="ru">{children}</RootHtml>;
}
