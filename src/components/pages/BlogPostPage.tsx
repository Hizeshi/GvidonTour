"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import type { CatalogBlogPost } from "@/lib/catalog-types";
import { cx, ui } from "@/lib/ui";
import BlogCard, { formatBlogDate } from "@/components/BlogCard";
import Reveal from "@/components/Reveal";

interface BlogPostPageProps {
  post: CatalogBlogPost;
  others: CatalogBlogPost[];
}

export default function BlogPostPage({ post, others }: BlogPostPageProps) {
  const { t, lang } = useLang();

  return (
    <main>
      <div className="bg-gradient-to-b from-panel to-surface pb-10 pt-32">
        <div className={ui.wrap}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-content/60 transition-colors hover:text-gold"
          >
            <span className="lic">
              <ArrowLeft />
            </span>
            {t.blogPage.back}
          </Link>
          <div className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-gold">
            {formatBlogDate(post.publishedAt, lang)}
          </div>
          <h1 className={cx(ui.serif, "mt-3 max-w-[26ch] text-[clamp(30px,4vw,52px)]")}>
            {post.title[lang]}
          </h1>
        </div>
      </div>

      <section className={cx(ui.sec, "pt-12")}>
        <div className={cx(ui.wrap, "mx-auto max-w-[820px]")}>
          <Reveal immediate className="relative h-[min(50vh,420px)] overflow-hidden rounded">
            <Image
              src={post.image}
              alt={post.title[lang]}
              fill
              sizes="(max-width: 820px) 100vw, 820px"
              className="object-cover"
            />
          </Reveal>

          <Reveal className="mt-10 space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-[17px] leading-[1.75] text-content/82">
                {paragraph[lang]}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {others.length > 0 && (
        <section className={cx(ui.sec, "bg-alt pt-16 text-altcontent")}>
          <div className={ui.wrap}>
            <Reveal className="max-w-[760px]">
              <h2 className={ui.sectionTitle}>{t.blogPage.similar}</h2>
              <div className={ui.divider} />
            </Reveal>
            <div className="mt-[46px] grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o, i) => (
                <BlogCard key={o.slug} post={o} readMore={t.blogPage.readMore} delay={i % 4} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
