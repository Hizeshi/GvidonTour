"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { deleteMedia, uploadMedia } from "@/lib/storage";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "video/mp4": "mp4",
};

export interface UploadState {
  ok: boolean;
  url?: string;
  error?: string;
}

export async function uploadMediaAction(_prev: UploadState | null, formData: FormData): Promise<UploadState> {
  if (!(await getSession())) return { ok: false, error: "Сессия истекла — войдите заново" };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Выберите файл" };
  if (file.size > MAX_BYTES) return { ok: false, error: "Файл больше 8 МБ" };
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) return { ok: false, error: "Поддерживаются JPEG, PNG, WebP, AVIF и MP4" };

  const date = new Date().toISOString().slice(0, 10);
  const path = `uploads/${date}-${randomBytes(5).toString("hex")}.${ext}`;
  const result = await uploadMedia(path, Buffer.from(await file.arrayBuffer()), file.type);

  if (!result.ok) {
    return {
      ok: false,
      error:
        result.error === "storage-not-configured"
          ? "Хранилище не настроено (нет SUPABASE_SERVICE_KEY)"
          : "Не удалось загрузить файл, попробуйте ещё раз",
    };
  }

  revalidatePath("/admin/media");
  return { ok: true, url: result.url };
}

export async function deleteMediaAction(path: string) {
  if (!(await getSession())) return;
  // Only files inside uploads/ are managed from this screen.
  if (!path.startsWith("uploads/") || path.includes("..")) return;
  await deleteMedia(path);
  revalidatePath("/admin/media");
}
