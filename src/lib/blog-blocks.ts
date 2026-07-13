import type { BlogBlock, LText } from "./catalog-types";

export const emptyLText = (): LText => ({ ru: "", en: "", kk: "" });

function isLText(v: unknown): v is LText {
  const obj = v as Partial<LText> | null;
  return !!obj && typeof obj === "object" && typeof obj.ru === "string" && typeof obj.en === "string" && typeof obj.kk === "string";
}

/** Reads a BlogPost.content Json value into typed blocks. Posts saved
 *  before the block editor existed stored a bare array of {ru,en,kk}
 *  paragraphs (no `type` field) — those come back as text blocks. */
export function normalizeBlogContent(raw: unknown): BlogBlock[] {
  if (!Array.isArray(raw)) return [];
  const blocks: BlogBlock[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const obj = item as Record<string, unknown>;
    if (obj.type === "image" && typeof obj.url === "string") {
      blocks.push({ type: "image", url: obj.url, caption: isLText(obj.caption) ? obj.caption : emptyLText() });
    } else if (obj.type === "video" && typeof obj.url === "string") {
      blocks.push({ type: "video", url: obj.url, caption: isLText(obj.caption) ? obj.caption : emptyLText() });
    } else if (obj.type === "text" && isLText(obj.text)) {
      blocks.push({ type: "text", text: obj.text });
    } else if (isLText(obj)) {
      blocks.push({ type: "text", text: obj }); // legacy: bare paragraph, no `type`
    }
  }
  return blocks;
}

export function isBlockEmpty(block: BlogBlock): boolean {
  if (block.type === "text") return !block.text.ru.trim() && !block.text.en.trim() && !block.text.kk.trim();
  return !block.url.trim();
}
