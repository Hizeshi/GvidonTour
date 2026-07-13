"use client";

import { ArrowDown, ArrowUp, Image as ImageIcon, Plus, Trash2, Type, Video } from "lucide-react";
import type { BlogBlock } from "@/lib/catalog-types";
import { emptyLText } from "@/lib/blog-blocks";
import { cx, ui } from "@/lib/ui";
import { addBtn, langTag } from "./AdminFormFields";

const iconBtn =
  "flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-[3px] text-content/50 transition-colors hover:bg-content/10 hover:text-gold disabled:pointer-events-none disabled:opacity-30";
const deleteIconBtn =
  "flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-[3px] text-content/40 transition-colors hover:bg-red-400/10 hover:text-red-400";

const BLOCK_LABELS: Record<BlogBlock["type"], string> = { text: "Текст", image: "Фото", video: "Видео" };
const BLOCK_ICONS = { text: Type, image: ImageIcon, video: Video };
const LANGS = ["ru", "en", "kk"] as const;

function moveBlock(blocks: BlogBlock[], index: number, dir: -1 | 1): BlogBlock[] {
  const target = index + dir;
  if (target < 0 || target >= blocks.length) return blocks;
  const next = [...blocks];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export default function BlogBlockEditor({
  blocks,
  onChange,
}: {
  blocks: BlogBlock[];
  onChange: (blocks: BlogBlock[]) => void;
}) {
  const update = (i: number, block: BlogBlock) => onChange(blocks.map((b, idx) => (idx === i ? block : b)));
  const remove = (i: number) => onChange(blocks.filter((_, idx) => idx !== i));
  const add = (type: BlogBlock["type"]) => {
    const block: BlogBlock = type === "text" ? { type, text: emptyLText() } : { type, url: "", caption: emptyLText() };
    onChange([...blocks, block]);
  };

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const Icon = BLOCK_ICONS[block.type];
        return (
          <div key={i} className="rounded-[3px] border border-content/12 p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-content/50">
                <span className="lic text-[13px] text-gold">
                  <Icon />
                </span>
                {BLOCK_LABELS[block.type]}
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => onChange(moveBlock(blocks, i, -1))}
                  disabled={i === 0}
                  className={iconBtn}
                  title="Переместить выше"
                >
                  <span className="lic text-[14px]">
                    <ArrowUp />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange(moveBlock(blocks, i, 1))}
                  disabled={i === blocks.length - 1}
                  className={iconBtn}
                  title="Переместить ниже"
                >
                  <span className="lic text-[14px]">
                    <ArrowDown />
                  </span>
                </button>
                <button type="button" onClick={() => remove(i)} className={deleteIconBtn} title="Удалить блок">
                  <span className="lic text-[14px]">
                    <Trash2 />
                  </span>
                </button>
              </div>
            </div>

            {block.type === "text" ? (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {LANGS.map((lang) => (
                  <div key={lang}>
                    <div className={langTag}>{lang}</div>
                    <textarea
                      className={cx(ui.finput, "min-h-[90px] resize-y")}
                      value={block.text[lang]}
                      onChange={(e) => update(i, { ...block, text: { ...block.text, [lang]: e.target.value } })}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2.5">
                <input
                  className={ui.finput}
                  placeholder={block.type === "image" ? "URL изображения (из Медиа)" : "Ссылка на YouTube или Vimeo"}
                  value={block.url}
                  onChange={(e) => update(i, { ...block, url: e.target.value })}
                />
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {LANGS.map((lang) => (
                    <div key={lang}>
                      <div className={langTag}>{lang} — подпись (необязательно)</div>
                      <input
                        className={ui.finput}
                        value={block.caption[lang]}
                        onChange={(e) => update(i, { ...block, caption: { ...block.caption, [lang]: e.target.value } })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {blocks.length === 0 && <p className="text-[13px] text-content/40">Пока пусто — добавьте первый блок.</p>}

      <div className="flex flex-wrap gap-2 pt-1">
        <button type="button" onClick={() => add("text")} className={addBtn}>
          <span className="lic">
            <Plus />
          </span>
          Текст
        </button>
        <button type="button" onClick={() => add("image")} className={addBtn}>
          <span className="lic">
            <Plus />
          </span>
          Фото
        </button>
        <button type="button" onClick={() => add("video")} className={addBtn}>
          <span className="lic">
            <Plus />
          </span>
          Видео
        </button>
      </div>
    </div>
  );
}
