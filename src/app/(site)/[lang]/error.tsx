"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import Link from "@/components/LocaleLink";
import StatusPage from "@/components/pages/StatusPage";
import { useLang } from "@/lib/LanguageContext";
import { STATUS_TEXT } from "@/lib/status-text";
import { cx, ui } from "@/lib/ui";

/** Runtime errors inside a site page (a failing render, an unexpected data
 *  shape) land here instead of showing a raw stack page. reset() re-renders
 *  the segment, which is enough for transient failures.
 *
 *  Its text comes from status-text.ts, not CONTENT: an error boundary sits in
 *  every page's client bundle, so importing the dictionary here would ship all
 *  three languages to every visitor. */
export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { lang } = useLang();
  const t = STATUS_TEXT[lang];

  useEffect(() => {
    console.error("[site] render error:", error);
  }, [error]);

  return (
    <StatusPage code="500" eyebrow={t.errorPage.eyebrow} title={t.errorPage.title} text={t.errorPage.text}>
      <button type="button" onClick={reset} className={cx(ui.btnGold, "cursor-pointer")}>
        {t.errorPage.retry}
        <span className="lic">
          <RotateCcw />
        </span>
      </button>
      <Link href="/" className={ui.btnGhost}>
        {t.errorPage.home}
      </Link>
    </StatusPage>
  );
}
