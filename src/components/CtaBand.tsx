import Image from "next/image";
import Link from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import type { Dict } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import Reveal from "./Reveal";

export interface CtaBandLabels {
  slogan: string;
  ctaBand: Dict["ctaBand"];
  /** Alt text for the background photo. */
  alt: string;
}

/** Picks this band's strings out of the dictionary. Call it from a server
 *  component — it takes the dictionary rather than importing it, so that this
 *  module stays safe to import from a client page. */
export function ctaLabels(t: Dict): CtaBandLabels {
  return { slogan: t.slogan, ctaBand: t.ctaBand, alt: t.caps[8] };
}

/** Like TourCard: server-rendered from most pages, but ToursPage is a client
 *  component and importing this from there would compile it as one too. So it
 *  takes its strings as props rather than reading CONTENT — otherwise the whole
 *  dictionary follows it into the /tours bundle. */
export default function CtaBand({
  labels,
  compact = false,
  withEyebrow = false,
}: {
  labels: CtaBandLabels;
  compact?: boolean;
  withEyebrow?: boolean;
}) {
  return (
    <section className={cx("relative overflow-hidden text-center", compact ? "py-20" : "py-24")}>
      <div className="absolute inset-0 z-0">
        <Image src="/images/cta-steppe.jpg" alt={labels.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(0,16,36,0.82),rgba(0,16,36,0.9))]" />
      <Reveal className="relative z-[2] mx-auto max-w-[680px] px-[22px] text-ondark">
        {withEyebrow && <div className={ui.eyebrow}>{labels.slogan}</div>}
        <h2 className={cx(ui.serif, "mt-4 text-[clamp(32px,4vw,52px)]")}>{labels.ctaBand.title}</h2>
        <p className={cx(ui.lead, "text-ondark/60")}>{labels.ctaBand.sub}</p>
        <div className="mt-[38px] flex flex-wrap justify-center gap-4">
          <Link href="/contacts" className={ui.btnGold}>
            {labels.ctaBand.btn}
            <span className="lic">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
