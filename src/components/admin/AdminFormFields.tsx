"use client";

import { Plus, Trash2 } from "lucide-react";
import { LANGS } from "@/lib/content";
import type { LText } from "@/lib/catalog-types";
import { cx, ui } from "@/lib/ui";

export const emptyLText = (): LText => ({ ru: "", en: "", kk: "" });

export const removeBtn =
  "flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-[3px] text-content/40 transition-colors hover:bg-red-400/10 hover:text-red-400";
export const addBtn =
  "flex cursor-pointer items-center gap-1.5 rounded-[3px] border border-content/20 px-3 py-1.5 text-[12.5px] font-bold text-content/70 transition-colors hover:border-gold hover:text-gold";
export const langTag = "mb-1 text-[10px] font-bold uppercase tracking-wide text-content/40";

export function LTextField({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: LText;
  onChange: (v: LText) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className={ui.flabel}>{label}</label>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {LANGS.map((lang) =>
          multiline ? (
            <div key={lang}>
              <div className={langTag}>{lang}</div>
              <textarea
                className={cx(ui.finput, "min-h-[90px] resize-y")}
                value={value[lang]}
                onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
              />
            </div>
          ) : (
            <div key={lang}>
              <div className={langTag}>{lang}</div>
              <input
                className={ui.finput}
                value={value[lang]}
                onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export function LTextListEditor({
  label,
  items,
  onChange,
  addLabel = "Добавить",
  multiline,
}: {
  label: string;
  items: LText[];
  onChange: (items: LText[]) => void;
  addLabel?: string;
  multiline?: boolean;
}) {
  const Field = multiline ? "textarea" : "input";
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <span className={ui.flabel}>{label}</span>
        <button type="button" onClick={() => onChange([...items, emptyLText()])} className={addBtn}>
          <span className="lic">
            <Plus />
          </span>
          {addLabel}
        </button>
      </div>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5 rounded-[3px] border border-content/12 p-2.5">
            <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3">
              {LANGS.map((lang) => (
                <Field
                  key={lang}
                  className={cx(ui.finput, multiline && "min-h-[80px] resize-y")}
                  placeholder={lang.toUpperCase()}
                  value={item[lang]}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], [lang]: e.target.value };
                    onChange(next);
                  }}
                />
              ))}
            </div>
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className={removeBtn}>
              <span className="lic">
                <Trash2 />
              </span>
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-[13px] text-content/40">Пока пусто.</p>}
      </div>
    </div>
  );
}
