"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { cx, ui } from "@/lib/ui";

/** Most admin pages read straight from the DB with no fallback, so a database
 *  hiccup surfaces here — with a retry — rather than as a raw stack page. */
export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[admin] render error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-[460px] rounded-[5px] border border-content/12 bg-panel px-8 py-14 text-center">
        <span className="lic mx-auto text-[42px] text-red-400/80">
          <TriangleAlert />
        </span>
        <h1 className={cx(ui.serif, "mt-5 text-[24px]")}>Не удалось загрузить страницу</h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-content/60">
          Скорее всего, база данных временно недоступна. Попробуйте ещё раз — обычно это помогает.
        </p>
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={reset} className={cx(ui.btnGold, "cursor-pointer")}>
            Попробовать снова
            <span className="lic">
              <RotateCcw />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
