import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/catalog";
import { jsonLdScript, SITE_URL } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Блог" };
  return {
    title: post.title.ru,
    description: post.excerpt.ru,
    openGraph: {
      title: `${post.title.ru} — GVIDON TOUR`,
      description: post.excerpt.ru,
      images: [{ url: post.image }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);
  if (!post) notFound();

  const others = all.filter((candidate) => candidate.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.ru,
    description: post.excerpt.ru,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "GVIDON TOUR" },
    publisher: {
      "@type": "Organization",
      name: "GVIDON TOUR",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <BlogPostPage post={post} others={others} />
    </>
  );
}
