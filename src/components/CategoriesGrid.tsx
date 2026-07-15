import Link from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import type { CatalogCategory } from "@/lib/catalog-types";
import type { Lang } from "@/lib/content";
import { cx } from "@/lib/ui";
import IconByName from "./IconByName";
import Reveal from "./Reveal";

export default function CategoriesGrid({ categories, lang }: { categories: CatalogCategory[]; lang: Lang }) {
  return (
    <div className="mt-[58px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c, i) => (
        <Reveal key={c.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
          <Link
            href={`/tours?category=${c.slug}`}
            className={cx(
              "group flex items-center gap-5 rounded border border-content/10 bg-gradient-to-b from-content/[0.035] to-transparent px-6 py-5",
              "transition-all duration-[400ms] hover:-translate-y-1 hover:border-gold/50 hover:from-gold/[0.07]"
            )}
          >
            <span className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-full border border-gold/50 text-[22px] text-gold">
              <IconByName name={c.icon} />
            </span>
            <span className="flex-1 text-[17px] font-bold">{c.name[lang]}</span>
            <span className="lic text-content/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold">
              <ArrowRight />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
