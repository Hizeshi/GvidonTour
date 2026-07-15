import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadMedia } from "@/lib/storage";

/** Plain REST endpoint for file uploads, deliberately NOT a Server Action.
 *  Server Actions re-render the route's layout tree to produce their
 *  response, and progressively-enhanced actions with a <input type="file">
 *  force multipart/form-data — that combination was redirecting every
 *  upload to /admin/login (the layout's session check firing on a stale
 *  read mid-render) despite a valid cookie and a passing proxy check.
 *  A Route Handler is a plain HTTP endpoint: no RSC re-render involved. */

/** Vercel caps a Function's request body at 4.5 MB and rejects anything bigger
 *  with a 413 before this handler ever runs — so promising more here just
 *  turns an oversized file into an unexplained failure. 4 MB leaves room for
 *  multipart overhead. (next.config's serverActions.bodySizeLimit does not
 *  apply: this is a Route Handler, not a Server Action.) Raise this once the
 *  site runs on its own server, where the platform limit no longer exists. */
const MAX_MB = 4;
const MAX_BYTES = MAX_MB * 1024 * 1024;

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "video/mp4": "mp4",
};

export async function POST(request: Request) {
  // Server Actions get an origin check from Next.js for free; this plain
  // endpoint does its own. SameSite=lax on the cookie already blocks
  // cross-site POSTs in modern browsers — this is a second layer.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "Недопустимый источник запроса" }, { status: 403 });
  }

  if (!(await getSession())) {
    return NextResponse.json({ ok: false, error: "Сессия истекла — войдите заново" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: "Выберите файл" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: `Файл больше ${MAX_MB} МБ` }, { status: 400 });
  }
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json(
      { ok: false, error: "Поддерживаются JPEG, PNG, WebP, AVIF и MP4" },
      { status: 400 }
    );
  }

  const date = new Date().toISOString().slice(0, 10);
  const path = `uploads/${date}-${randomBytes(5).toString("hex")}.${ext}`;
  const result = await uploadMedia(path, Buffer.from(await file.arrayBuffer()), file.type);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          result.error === "storage-not-configured"
            ? "Хранилище не настроено (нет SUPABASE_SERVICE_KEY)"
            : "Не удалось загрузить файл, попробуйте ещё раз",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, url: result.url });
}
