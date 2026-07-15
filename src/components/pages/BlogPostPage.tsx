"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import type { CatalogBlogPost } from "@/lib/catalog-types";
import { toEmbedUrl } from "@/lib/video-embed";
import { cx, ui } from "@/lib/ui";
import BlogCard, { formatBlogDate } from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";

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
          <Breadcrumbs
            items={[
              { label: t.nav.home, href: "/" },
              { label: t.nav.blog, href: "/blog" },
              { label: post.title[lang] },
            ]}
          />
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

          <Reveal className="mt-10 space-y-8">
            {post.content.map((block, i) => {
              if (block.type === "text") {
                return (
                  <p key={i} className="text-[17px] leading-[1.75] text-content/82">
                    {block.text[lang]}
                  </p>
                );
              }
              if (block.type === "image") {
                return (
                  <figure key={i}>
                    <div className="relative aspect-video overflow-hidden rounded">
                      <Image
                        src={block.url}
                        alt={block.caption[lang] || post.title[lang]}
                        fill
                        sizes="(max-width: 820px) 100vw, 820px"
                        className="object-cover"
                      />
                    </div>
                    {block.caption[lang] && (
                      <figcaption className="mt-2.5 text-center text-[13px] text-content/50">
                        {block.caption[lang]}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              const embed = toEmbedUrl(block.url);
              return (
                <figure key={i}>
                  <div className="relative aspect-video overflow-hidden rounded bg-panel">
                    {embed.type === "iframe" ? (
                      <iframe
                        src={embed.src}
                        title={block.caption[lang] || post.title[lang]}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    ) : (
                      <video src={embed.src} controls className="h-full w-full" />
                    )}
                  </div>
                  {block.caption[lang] && (
                    <figcaption className="mt-2.5 text-center text-[13px] text-content/50">
                      {block.caption[lang]}
                    </figcaption>
                  )}
                </figure>
              );
            })}
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
