"use client";

import { cx, ui } from "@/lib/ui";
import Reveal from "./Reveal";

interface PageHeadProps {
  eyebrow: string;
  title: string;
  intro: string;
}

export default function PageHead({ eyebrow, title, intro }: PageHeadProps) {
  return (
    <div className="bg-gradient-to-b from-[#001833] to-navy pb-[70px] pt-40 text-center">
      <div className={ui.wrap}>
        <Reveal className={ui.eyebrow} immediate>
          {eyebrow}
        </Reveal>
        <Reveal as="h1" className={cx(ui.sectionTitle, "mx-auto")} delay={1} immediate>
          {title}
        </Reveal>
        <Reveal className={cx(ui.divider, "mx-auto")} delay={1} immediate />
        <Reveal
          as="p"
          className={cx(ui.lead, "mx-auto max-w-[62ch] text-content/60")}
          delay={2}
          immediate
        >
          {intro}
        </Reveal>
      </div>
    </div>
  );
}
