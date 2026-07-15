import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { EXT_BY_SNIFFED, sniffFileType, type SniffedType } from "@/lib/file-type";
import { allowHit, ipFromHeaders } from "@/lib/rate-limit";
import { deleteMedia, uploadMedia } from "@/lib/storage";
import { notifyReviewPendingViaTelegram } from "@/lib/telegram";
import { verifyTurnstile } from "@/lib/turnstile";
import type { Lang } from "@/lib/content";

/** Public review submissions. Deliberately NOT a Server Action — this
 *  accepts an optional photo upload, and file uploads in this app always
 *  go through a Route Handler (see media/upload/route.ts). Admin-created
 *  reviews (ReviewForm.tsx -> saveReview) are session-gated and never
 *  touch this endpoint, so they skip the captcha/rate-limit below by
 *  construction. */

const DAILY_LIMIT = 3;
const DAY_MS = 24 * 60 * 60 * 1000;

const MAX_PHOTO_BYTES = 3 * 1024 * 1024; // 3 MB — an avatar photo, not a gallery shot
/** Stills only: this is the little round avatar next to the review. MP4 passes
 *  sniffFileType, so it has to be excluded here rather than left to it. */
const PHOTO_TYPES: SniffedType[] = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const LANGS: Lang[] = ["ru", "en", "kk"];

export async function POST(request: Request) {
  const ip = ipFromHeaders(request.headers);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    // Malformed/empty body (a bot poking the endpoint) — not a server fault.
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website") ?? "") !== "") {
    return NextResponse.json({ ok: true }); // pretend success, don't tip off the bot
  }

  const token = String(formData.get("turnstileToken") ?? "");
  if (!(await verifyTurnstile(token, ip))) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
  }

  const author = String(formData.get("author") ?? "").trim().slice(0, 100);
  const text = String(formData.get("text") ?? "").trim().slice(0, 2000);
  const rating = Number(formData.get("rating"));
  const langRaw = String(formData.get("lang") ?? "ru");
  const lang: Lang = LANGS.includes(langRaw as Lang) ? (langRaw as Lang) : "ru";

  if (author.length < 2 || text.length < 10 || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Count actual valid submission attempts, not typos and failed captchas.
  if (!(await allowHit(`review:${ip}`, DAILY_LIMIT, DAY_MS))) {
    return NextResponse.json({ ok: false, error: "limit" }, { status: 429 });
  }

  let photoUrl: string | null = null;
  let photoPath: string | null = null;
  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_PHOTO_BYTES) {
      return NextResponse.json({ ok: false, error: "photo-too-large" }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const type = sniffFileType(bytes);
    if (!type || !PHOTO_TYPES.includes(type)) {
      return NextResponse.json({ ok: false, error: "photo-type" }, { status: 400 });
    }
    const date = new Date().toISOString().slice(0, 10);
    const path = `reviews/${date}-${randomBytes(5).toString("hex")}.${EXT_BY_SNIFFED[type]}`;
    const result = await uploadMedia(path, bytes, type);
    if (result.ok) {
      photoUrl = result.url;
      photoPath = path;
    }
    // A failed avatar upload isn't fatal — the review still gets posted,
    // it just falls back to the initials avatar on render.
  }

  const textByLang = { ru: "", en: "", kk: "", [lang]: text };

  try {
    await prisma.review.create({
      data: {
        author,
        rating,
        text: textByLang,
        photo: photoUrl,
        published: false, // moderation queue — admin must publish it in /admin/reviews
      },
    });
  } catch (err) {
    console.error("[reviews/submit] DB write failed:", err);
    if (photoPath) await deleteMedia(photoPath);
    return NextResponse.json({ ok: false, error: "db" }, { status: 500 });
  }

  // Review is safely stored; notification failure must not surface to the visitor.
  await notifyReviewPendingViaTelegram({ author, rating, text });

  return NextResponse.json({ ok: true });
}
