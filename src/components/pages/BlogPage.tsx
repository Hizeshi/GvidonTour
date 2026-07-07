"use client";

import { useLang } from "@/lib/LanguageContext";
import type { CatalogBlogPost } from "@/lib/catalog-types";
import { cx, ui } from "@/lib/ui";
import BlogCard from "@/components/BlogCard";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";

export default function BlogPage({ posts }: { posts: CatalogBlogPost[] }) {
  const { t } = useLang();
  return (
    <main>
      <PageHead eyebrow={t.blogPage.eyebrow} title={t.blogPage.title} intro={t.blogPage.intro} />

      <section className={cx(ui.sec, "pt-16")}>
        <div className={ui.wrap}>
          <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} readMore={t.blogPage.readMore} delay={i % 4} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand compact />
    </main>
  );
}
