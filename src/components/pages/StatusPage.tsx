"use client";

import type { ReactNode } from "react";
import { cx, ui } from "@/lib/ui";
import Reveal from "@/components/Reveal";

/** Shared layout for the 404 / error screens: same centred, branded block,
 *  different copy and actions. */
export default function StatusPage({
  code,
  eyebrow,
  title,
  text,
  children,
}: {
  code: string;
  eyebrow: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-[78vh] items-center py-24">
      <div className={cx(ui.wrap, "text-center")}>
        <Reveal immediate>
          <div
            aria-hidden="true"
            className={cx(
              ui.serif,
              "select-none text-[clamp(90px,18vw,190px)] leading-[0.9] text-gold/15"
            )}
          >
            {code}
          </div>
          <div className={cx(ui.eyebrow, "mt-2")}>{eyebrow}</div>
          <h1 className={cx(ui.serif, "mt-3.5 text-[clamp(30px,4.4vw,52px)]")}>{title}</h1>
          <div className={cx(ui.divider, "mx-auto")} />
          <p className="mx-auto mt-6 max-w-[52ch] text-[16.5px] leading-relaxed text-content/65">{text}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">{children}</div>
        </Reveal>
      </div>
    </main>
  );
}
