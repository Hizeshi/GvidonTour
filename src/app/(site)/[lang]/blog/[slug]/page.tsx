import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/catalog";
import { CONTENT } from "@/lib/content";
import { DEFAULT_LOCALE, isLocale, localeAlternates, localeHref } from "@/lib/i18n";
import { absoluteUrl, breadcrumbJsonLd, jsonLdScript, SITE_URL } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const title = post.title[lang];
  const description = post.excerpt[lang];
  return {
    title,
    description,
    alternates: localeAlternates(`/blog/${slug}`, lang),
    openGraph: {
      title: `${title} — GVIDON TOUR`,
      description,
      url: `${SITE_URL}${localeHref(`/blog/${slug}`, lang)}`,
      locale: lang,
      images: [{ url: post.image }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const [post, all] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);
  if (!post) notFound();

  const others = all.filter((candidate) => candidate.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[lang],
    description: post.excerpt[lang],
    image: absoluteUrl(post.image),
    datePublished: post.publishedAt,
    inLanguage: lang,
    author: { "@type": "Organization", name: "GVIDON TOUR" },
    publisher: {
      "@type": "Organization",
      name: "GVIDON TOUR",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: `${SITE_URL}${localeHref(`/blog/${slug}`, lang)}`,
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "GVIDON TOUR", url: `${SITE_URL}${localeHref("/", lang)}` },
    { name: CONTENT[lang].nav.blog, url: `${SITE_URL}${localeHref("/blog", lang)}` },
    { name: post.title[lang], url: `${SITE_URL}${localeHref(`/blog/${slug}`, lang)}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbs) }} />
      <BlogPostPage post={post} others={others} lang={lang} />
    </>
  );
}
