"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import type { CatalogBlogPost } from "@/lib/catalog-types";
import type { Lang } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import { useReveal } from "./useReveal";

export function formatBlogDate(iso: string, lang: Lang) {
  try {
    return new Intl.DateTimeFormat(lang === "kk" ? "kk-KZ" : lang, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

interface BlogCardProps {
  post: CatalogBlogPost;
  readMore: string;
  delay?: number;
}

export default function BlogCard({ post, readMore, delay = 0 }: BlogCardProps) {
  const { lang } = useLang();
  const { ref, cls } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(
        "group flex flex-col overflow-hidden rounded border border-content/10 bg-panel transition-all duration-[450ms] hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_28px_50px_-28px_rgba(0,0,0,0.7)]",
        `reveal${delay ? ` d${delay}` : ""}${cls}`
      )}
    >
      <Link href={`/blog/${post.slug}`} className="relative block h-[210px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title[lang]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-[26px] pb-[22px]">
        <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gold/80">
          {formatBlogDate(post.publishedAt, lang)}
        </div>
        <h3 className={cx(ui.serif, "mb-3 mt-2.5 text-[21px] leading-[1.2]")}>{post.title[lang]}</h3>
        <p className="flex-1 text-[14.5px] leading-[1.55] text-content/60">{post.excerpt[lang]}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-[22px] flex items-center gap-[7px] border-t border-content/10 pt-[18px] text-[13px] font-bold tracking-[0.04em] text-content transition-all duration-300 hover:gap-3 hover:text-gold"
        >
          {readMore}
          <span className="lic">
            <ArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
}
