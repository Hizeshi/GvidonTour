import { CONTENT, type Lang } from "@/lib/content";
import type { CatalogBlogPost } from "@/lib/catalog-types";
import { cx, ui } from "@/lib/ui";
import BlogCard from "@/components/BlogCard";
import CtaBand, { ctaLabels } from "@/components/CtaBand";
import PageHead from "@/components/PageHead";

export default function BlogPage({ posts, lang }: { posts: CatalogBlogPost[]; lang: Lang }) {
  const t = CONTENT[lang];
  return (
    <main>
      <PageHead eyebrow={t.blogPage.eyebrow} title={t.blogPage.title} intro={t.blogPage.intro} />

      <section className={cx(ui.sec, "pt-16")}>
        <div className={ui.wrap}>
          <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} readMore={t.blogPage.readMore} lang={lang} delay={(i % 4) as 0 | 1 | 2 | 3} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand labels={ctaLabels(t)} compact />
    </main>
  );
}
