/** The ONLY integration point with the media storage backend.
 *
 *  Currently Supabase Storage over its plain REST API (no SDK). If the
 *  project moves to a VPS, reimplement these four functions against MinIO
 *  or a disk folder and nothing else in the codebase changes.
 *
 *  Env: SUPABASE_URL + SUPABASE_SERVICE_KEY (secret, server-only). The
 *  "media" bucket is public-read; all writes go through these helpers. */

const BUCKET = "media";

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/+$/, ""), key };
}

export function storageConfigured(): boolean {
  return config() !== null;
}

export function publicMediaUrl(path: string): string | null {
  const cfg = config();
  return cfg ? `${cfg.url}/storage/v1/object/public/${BUCKET}/${path}` : null;
}

export async function uploadMedia(
  path: string,
  body: Buffer,
  contentType: string
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const cfg = config();
  if (!cfg) return { ok: false, error: "storage-not-configured" };
  try {
    const res = await fetch(`${cfg.url}/storage/v1/object/${BUCKET}/${path}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${cfg.key}`,
        apikey: cfg.key,
        "content-type": contentType,
        "cache-control": "max-age=31536000",
      },
      body: new Uint8Array(body),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) {
      console.error("[storage] upload failed:", res.status, await res.text());
      return { ok: false, error: `upload-failed-${res.status}` };
    }
    return { ok: true, url: publicMediaUrl(path)! };
  } catch (err) {
    console.error("[storage] upload error:", err);
    return { ok: false, error: "upload-error" };
  }
}

export async function deleteMedia(path: string): Promise<boolean> {
  const cfg = config();
  if (!cfg) return false;
  try {
    const res = await fetch(`${cfg.url}/storage/v1/object/${BUCKET}/${path}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${cfg.key}`, apikey: cfg.key },
      signal: AbortSignal.timeout(15_000),
    });
    return res.ok;
  } catch (err) {
    console.error("[storage] delete error:", err);
    return false;
  }
}

export interface MediaObject {
  /** File name inside the uploads/ folder. */
  name: string;
  /** Full object path within the bucket (uploads/<name>). */
  path: string;
  url: string;
  createdAt: string | null;
  sizeBytes: number | null;
  contentType: string | null;
}

/** Lists uploaded files, newest first. Returns null when storage is not
 *  configured or unreachable (the admin UI shows setup instructions). */
export async function listMedia(limit = 100): Promise<MediaObject[] | null> {
  const cfg = config();
  if (!cfg) return null;
  try {
    const res = await fetch(`${cfg.url}/storage/v1/object/list/${BUCKET}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${cfg.key}`,
        apikey: cfg.key,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        prefix: "uploads",
        limit,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.error("[storage] list failed:", res.status, await res.text());
      return null;
    }
    const rows = (await res.json()) as {
      name: string;
      created_at?: string;
      metadata?: { size?: number; mimetype?: string } | null;
    }[];
    return rows
      .filter((row) => row.metadata) // folders come back without metadata
      .map((row) => ({
        name: row.name,
        path: `uploads/${row.name}`,
        url: publicMediaUrl(`uploads/${row.name}`)!,
        createdAt: row.created_at ?? null,
        sizeBytes: row.metadata?.size ?? null,
        contentType: row.metadata?.mimetype ?? null,
      }));
  } catch (err) {
    console.error("[storage] list error:", err);
    return null;
  }
}
