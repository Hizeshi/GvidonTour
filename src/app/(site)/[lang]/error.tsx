"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import Link from "@/components/LocaleLink";
import StatusPage from "@/components/pages/StatusPage";
import { useLang } from "@/lib/LanguageContext";
import { cx, ui } from "@/lib/ui";

/** Runtime errors inside a site page (a failing render, an unexpected data
 *  shape) land here instead of showing a raw stack page. reset() re-renders
 *  the segment, which is enough for transient failures. */
export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useLang();

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
