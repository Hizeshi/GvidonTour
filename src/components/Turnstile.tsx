"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

/** Renders the Turnstile widget and reports its token (or null once it
 *  expires/errors) back to the parent form via onToken.
 *
 *  Turnstile tokens are single-use: once a submission has been sent, that
 *  token is spent whether the request succeeded or not. Bump `resetKey` after
 *  a failed submit to issue a fresh challenge — otherwise the retry replays
 *  the used token and the server rejects it as a captcha failure forever. */
export default function Turnstile({
  siteKey,
  onToken,
  resetKey = 0,
}: {
  siteKey: string;
  onToken: (token: string | null) => void;
  resetKey?: number;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);

  // The widget outlives any one render, so its callbacks read the handler from
  // a ref rather than closing over the render that created them. Assigning in
  // an effect rather than during render keeps the render pure.
  useEffect(() => {
    onTokenRef.current = onToken;
  });

  useEffect(() => {
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !boxRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(boxRef.current, {
        sitekey: siteKey,
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(null),
        "error-callback": () => onTokenRef.current(null),
      });
    };

    let stopWaiting: (() => void) | undefined;
    if (window.turnstile) {
      renderWidget();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
      const script = existing ?? document.createElement("script");
      script.addEventListener("load", renderWidget);
      stopWaiting = () => script.removeEventListener("load", renderWidget);
      if (!existing) {
        script.src = SCRIPT_SRC;
        script.async = true;
        document.head.appendChild(script);
      }
    }

    // Every path needs this cleanup, and the early `return` on the
    // already-loaded path used to skip it entirely: the widget was left
    // registered with Cloudflare after unmount, and `cancelled` was set up but
    // never assigned, so the guard above could never fire. Remounting the form
    // then stacked a second widget on the first.
    return () => {
      cancelled = true;
      stopWaiting?.();
      if (widgetIdRef.current !== null) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetKey === 0 || !window.turnstile || widgetIdRef.current === null) return;
    onTokenRef.current(null);
    window.turnstile.reset(widgetIdRef.current);
  }, [resetKey]);

  return <div ref={boxRef} />;
}
