import type { Metadata } from "next";
import BlogPage from "@/components/pages/BlogPage";
import { getBlogPosts } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Блог",
  description: "Советы, гиды по направлениям и практическая информация для путешествий по Казахстану.",
};

export default async function Page() {
  const posts = await getBlogPosts();
  return <BlogPage posts={posts} />;
}
