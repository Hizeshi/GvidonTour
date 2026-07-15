import Link from "next/link";
import { SearchX } from "lucide-react";
import { cx, ui } from "@/lib/ui";

/** Editing a record that was deleted (or a mistyped id) lands here, inside
 *  the panel shell, instead of on a bare system page. */
export default function AdminNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-[440px] rounded-[5px] border border-content/12 bg-panel px-8 py-14 text-center">
        <span className="lic mx-auto text-[42px] text-gold/70">
          <SearchX />
        </span>
        <h1 className={cx(ui.serif, "mt-5 text-[24px]")}>Запись не найдена</h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-content/60">
          Возможно, её удалили, или ссылка устарела.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/admin" className={ui.btnGold}>
            В панель управления
          </Link>
        </div>
      </div>
    </div>
  );
}
