import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { uploadMedia } from "@/lib/storage";
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
const submissionsByIpDay = new Map<string, number>();

function tooManyToday(ip: string): boolean {
  const day = new Date().toISOString().slice(0, 10);
  const key = `${ip}:${day}`;
  const count = (submissionsByIpDay.get(key) ?? 0) + 1;
  submissionsByIpDay.set(key, count);
  return count > DAILY_LIMIT;
}

const MAX_PHOTO_BYTES = 3 * 1024 * 1024; // 3 MB — an avatar photo, not a gallery shot
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
const LANGS: Lang[] = ["ru", "en", "kk"];

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();

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

  if (tooManyToday(ip)) {
    return NextResponse.json({ ok: false, error: "limit" }, { status: 429 });
  }

  const token = String(formData.get("turnstileToken") ?? "");
  if (!(await verifyTurnstile(token, ip))) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
  }

  const author = String(formData.get("author") ?? "").trim().slice(0, 100);
  const text = String(formData.get("text") ?? "").trim().slice(0, 2000);
  const rating = Math.min(5, Math.max(1, Math.round(Number(formData.get("rating")) || 0)));
  const langRaw = String(formData.get("lang") ?? "ru");
  const lang: Lang = LANGS.includes(langRaw as Lang) ? (langRaw as Lang) : "ru";

  if (author.length < 2 || text.length < 10 || !rating) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  let photoUrl: string | null = null;
  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_PHOTO_BYTES) {
      return NextResponse.json({ ok: false, error: "photo-too-large" }, { status: 400 });
    }
    const ext = EXT_BY_TYPE[file.type];
    if (!ext) {
      return NextResponse.json({ ok: false, error: "photo-type" }, { status: 400 });
    }
    const date = new Date().toISOString().slice(0, 10);
    const path = `reviews/${date}-${randomBytes(5).toString("hex")}.${ext}`;
    const result = await uploadMedia(path, Buffer.from(await file.arrayBuffer()), file.type);
    if (result.ok) photoUrl = result.url;
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
    return NextResponse.json({ ok: false, error: "db" }, { status: 500 });
  }

  // Review is safely stored; notification failure must not surface to the visitor.
  await notifyReviewPendingViaTelegram({ author, rating, text });

  return NextResponse.json({ ok: true });
}
