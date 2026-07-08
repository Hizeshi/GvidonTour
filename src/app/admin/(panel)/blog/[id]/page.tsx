import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import BlogPostForm from "../BlogPostForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Редактирование статьи" };

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>{(post.title as LText).ru || "Редактирование статьи"}</h1>
      <BlogPostForm
        postId={post.id}
        initial={{
          slug: post.slug,
          title: post.title as LText,
          excerpt: post.excerpt as LText,
          content: post.content as LText[],
          image: post.image,
          publishedAt: post.publishedAt.toISOString().slice(0, 10),
          sortOrder: post.sortOrder,
          published: post.published,
        }}
      />
    </div>
  );
}
