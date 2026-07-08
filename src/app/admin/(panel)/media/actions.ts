"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { deleteMedia } from "@/lib/storage";

export async function deleteMediaAction(path: string) {
  if (!(await getSession())) return;
  // Only files inside uploads/ are managed from this screen.
  if (!path.startsWith("uploads/") || path.includes("..")) return;
  await deleteMedia(path);
  revalidatePath("/admin/media");
}
