"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { cx, ui } from "@/lib/ui";
import Reveal from "./Reveal";

export default function CtaBand({ compact = false, withEyebrow = false }: { compact?: boolean; withEyebrow?: boolean }) {
  const { t } = useLang();
  return (
    <section className={cx("relative overflow-hidden text-center", compact ? "py-20" : "py-24")}>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-steppe.jpg"
          alt={t.caps[8]}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(0,16,36,0.82),rgba(0,16,36,0.9))]" />
      <Reveal className="relative z-[2] mx-auto max-w-[680px] px-[22px] text-ondark">
        {withEyebrow && <div className={ui.eyebrow}>{t.slogan}</div>}
        <h2 className={cx(ui.serif, "mt-4 text-[clamp(32px,4vw,52px)]")}>{t.ctaBand.title}</h2>
        <p className={cx(ui.lead, "text-ondark/60")}>{t.ctaBand.sub}</p>
        <div className="mt-[38px] flex flex-wrap justify-center gap-4">
          <Link href="/contacts" className={ui.btnGold}>
            {t.ctaBand.btn}
            <span className="lic">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
