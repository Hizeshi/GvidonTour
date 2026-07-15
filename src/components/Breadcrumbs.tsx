"use client";

import { ChevronRight } from "lucide-react";
import Link from "@/components/LocaleLink";
import { A11Y_LABELS } from "@/lib/a11y";
import { useLang } from "@/lib/LanguageContext";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { lang } = useLang();

  return (
    <nav aria-label={A11Y_LABELS[lang].breadcrumbs}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-content/60">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${item.href ?? "current"}-${item.label}`} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && (
                <span className="lic flex-none text-[12px] text-content/30" aria-hidden="true">
                  <ChevronRight />
                </span>
              )}
              {item.href && !current ? (
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={current ? "page" : undefined} className="max-w-[34ch] truncate text-content/80">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
