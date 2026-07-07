"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function FloatingCta() {
  const { t } = useLang();
  const pathname = usePathname();
  if (pathname === "/contacts") return null;

  return (
    <Link
      href="/contacts"
      className="group fixed bottom-5 right-4 z-40 flex h-14 items-center rounded-full bg-gold pl-[13px] pr-[13px] text-onaccent shadow-[0_14px_34px_-10px_rgba(226,159,91,0.6)] transition-[padding] duration-300 hover:pr-6 md:bottom-8"
    >
      <span className="lic relative flex-none text-[24px]">
        <span className="absolute inset-0 rounded-full animate-pulse-dot" />
        <MessageCircle />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold tracking-[0.02em] opacity-0 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[160px] group-hover:opacity-100">
        {t.hero.cta2}
      </span>
    </Link>
  );
}
