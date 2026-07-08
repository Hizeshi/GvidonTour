import type { Metadata } from "next";
import { cx, ui } from "@/lib/ui";
import BlogPostForm from "../BlogPostForm";

export const metadata: Metadata = { title: "Новая статья" };

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>Новая статья</h1>
      <BlogPostForm postId={null} />
    </div>
  );
}
