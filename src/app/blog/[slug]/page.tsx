import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/catalog";

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

  return <BlogPostPage post={post} others={others} />;
}
