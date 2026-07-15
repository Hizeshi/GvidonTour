"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Yandex Metrica + Google Analytics 4, mounted on the public site only —
 *  the admin panel is staff traffic and would skew the numbers.
 *
 *  Both are optional by config: with no IDs set nothing is injected and the
 *  site behaves exactly as before (same pattern as the media storage and the
 *  review captcha). IDs are NEXT_PUBLIC_* because the snippets run in the
 *  browser; they are public identifiers, not secrets. */
const YM_ID = process.env.NEXT_PUBLIC_YM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Next.js navigates on the client, so neither snippet sees anything past the
  // first page. Report every route change by hand; the snippets themselves
  // already sent the initial hit, hence the skip.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const url = window.location.pathname + window.location.search;
    // Guarded separately: a third-party counter throwing must never break the
    // page, nor stop the other one from reporting.
    if (YM_ID) {
      try {
        window.ym?.(Number(YM_ID), "hit", url);
      } catch (err) {
        console.error("[analytics] ym hit failed:", err);
      }
    }
    if (GA_ID) {
      try {
        window.gtag?.("event", "page_view", { page_path: url });
      } catch (err) {
        console.error("[analytics] ga page_view failed:", err);
      }
    }
  }, [pathname]);

  if (!YM_ID && !GA_ID) return null;

  return (
    <>
      {YM_ID && (
        <>
          <Script id="ym-init" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();for(var j=0;j<e.length;j++){if(e[j].src===r){return}}
            k=document.createElement(t),a=document.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window,document.scripts,"script","https://mc.yandex.ru/metrika/tag.js","ym");
            ym(${Number(YM_ID)}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });`}
          </Script>
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
            </div>
          </noscript>
        </>
      )}

      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
    </>
  );
}
