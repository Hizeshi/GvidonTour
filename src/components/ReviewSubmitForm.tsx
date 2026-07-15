"use client";

import type { Dict, Lang } from "@/lib/content";
import { useRef, useState } from "react";
import { CheckCircle2, Send, Star, UploadCloud } from "lucide-react";
import { cx, ui } from "@/lib/ui";
import Reveal from "@/components/Reveal";
import Turnstile from "@/components/Turnstile";

interface SubmitResult {
  ok: boolean;
  error?: string;
}

const ERROR_KEY: Record<string, "errorInvalid" | "errorLimit" | "errorCaptcha" | "errorGeneric"> = {
  invalid: "errorInvalid",
  limit: "errorLimit",
  captcha: "errorCaptcha",
  "photo-too-large": "errorGeneric",
  "photo-type": "errorGeneric",
  db: "errorGeneric",
};

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null;

/** Client island: a form with a captcha. Takes the dictionary as a prop. */
export default function ReviewSubmitForm({ lang, t }: { lang: Lang; t: Dict }) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [captchaNonce, setCaptchaNonce] = useState(0);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  if (!TURNSTILE_SITE_KEY) {
    return (
      <Reveal className="rounded border border-content/10 bg-content/[0.02] p-8 text-center text-content/60">
        {t.reviewsPage.unavailable}
      </Reveal>
    );
  }

  if (result?.ok) {
    return (
      <Reveal className="rounded border border-gold/40 bg-gold/5 px-9 py-14 text-center">
        <span className="lic text-[46px] text-gold">
          <CheckCircle2 />
        </span>
        <p className="mx-auto mt-[18px] max-w-[46ch] text-content/75">{t.reviewsPage.success}</p>
      </Reveal>
    );
  }

  const handleSubmit = async () => {
    if (!token) return;
    setPending(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.set("author", author);
      formData.set("rating", String(rating));
      formData.set("text", text);
      formData.set("lang", lang);
      formData.set("turnstileToken", token);
      if (photo) formData.set("photo", photo);
      const res = await fetch("/api/reviews/submit", { method: "POST", body: formData });
      const data: SubmitResult = await res.json();
      setResult(data);
      // The token we just sent is spent either way. On failure the visitor
      // stays on the form and will retry, so hand them a fresh challenge —
      // replaying the used token would fail the captcha check forever.
      if (!data.ok) setCaptchaNonce((n) => n + 1);
    } catch {
      setResult({ ok: false, error: "network" });
      setCaptchaNonce((n) => n + 1);
    } finally {
      setPending(false);
    }
  };

  return (
    <Reveal className="rounded border border-content/10 bg-content/[0.02] p-7 sm:p-9">
      {/* Honeypot: hidden from humans, bots fill it and get silently ignored. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        onChange={() => {}}
      />

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <div>
          <label className={ui.flabel} htmlFor="rf-name">
            {t.reviewsPage.name}
          </label>
          <input
            id="rf-name"
            className={ui.finput}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label className={ui.flabel}>{t.reviewsPage.rating}</label>
          <div className="flex h-[52px] items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-label={`${n}`}
                className="cursor-pointer p-0.5 text-gold"
              >
                <span className={cx("lic text-[24px]", n > rating && "text-content/20")}>
                  <Star fill="currentColor" strokeWidth={0} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className={ui.flabel} htmlFor="rf-text">
          {t.reviewsPage.text}
        </label>
        <textarea
          id="rf-text"
          className={cx(ui.finput, "min-h-[120px] resize-y")}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="rf-photo"
          className="flex cursor-pointer items-center gap-2.5 rounded-[4px] border border-dashed border-content/25 px-5 py-3.5 text-[13.5px] font-semibold text-content/70 transition-colors hover:border-gold/60"
        >
          <span className="lic text-[18px] text-gold">
            <UploadCloud />
          </span>
          {photo?.name ?? t.reviewsPage.photo}
        </label>
        <input
          ref={fileRef}
          id="rf-photo"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
        />
      </div>

      <div className="mt-5">
        <Turnstile siteKey={TURNSTILE_SITE_KEY} onToken={setToken} resetKey={captchaNonce} />
      </div>

      {result && !result.ok && (
        <p className="mt-4 text-[13.5px] font-semibold text-red-400">
          {t.reviewsPage[ERROR_KEY[result.error ?? "generic"] ?? "errorGeneric"]}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={pending || !token || author.trim().length < 2 || text.trim().length < 10}
        className={cx(
          ui.btnGold,
          "mt-6 w-full justify-center",
          (pending || !token || author.trim().length < 2 || text.trim().length < 10) &&
            "pointer-events-none opacity-50"
        )}
      >
        {pending ? "..." : t.reviewsPage.send}
        <span className="lic">
          <Send />
        </span>
      </button>
    </Reveal>
  );
}
