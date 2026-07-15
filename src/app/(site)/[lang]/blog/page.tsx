import type { Metadata } from "next";
import BlogPage from "@/components/pages/BlogPage";
import { getBlogPosts } from "@/lib/catalog";
import { CONTENT } from "@/lib/content";
import { isLocale, pageMetadata, toLocale } from "@/lib/i18n";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = CONTENT[lang];
  return pageMetadata(lang, "/blog", t.blogPage.title, t.blogPage.intro);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const posts = await getBlogPosts();
  return <BlogPage posts={posts} lang={toLocale(lang)} />;
}
