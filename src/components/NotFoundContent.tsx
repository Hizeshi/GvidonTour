"use client";

import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "@/components/LocaleLink";
import StatusPage from "@/components/pages/StatusPage";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { STATUS_TEXT } from "@/lib/status-text";
import { ui } from "@/lib/ui";

/** Just the 404 message — the header and footer around it are server-rendered
 *  by not-found.tsx.
 *
 *  The 404 shell is static (reading headers here made every public route
 *  dynamic — see CLAUDE.md), so the shell can't know the locale and this
 *  component derives it from the pathname in the browser. That makes it a
 *  client component, and a client component must never import CONTENT: this one
 *  sits in every page's tree, so its chunk loads everywhere. It used to render
 *  the header and footer too and pulled the whole dictionary along with them —
 *  measured, the 62 KB chunk was downloaded on the home page. Hence
 *  status-text.ts, which holds only these few strings. */
export default function NotFoundContent() {
  const pathname = usePathname();
  const candidate = pathname.split("/")[1] ?? "";
  const lang = isLocale(candidate) ? candidate : DEFAULT_LOCALE;
  const t = STATUS_TEXT[lang].notFound;

  return (
    <StatusPage code="404" eyebrow={t.eyebrow} title={t.title} text={t.text}>
      <Link href="/tours" className={ui.btnGold}>
        {t.tours}
        <span className="lic">
          <ArrowRight />
        </span>
      </Link>
      <Link href="/" className={ui.btnGhost}>
        {t.home}
      </Link>
    </StatusPage>
  );
}
