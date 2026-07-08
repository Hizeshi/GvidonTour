import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Inbox, LayoutDashboard, LogOut, type LucideIcon } from "lucide-react";
import { getSession } from "@/lib/auth";
import { cx } from "@/lib/ui";
import Logo from "@/components/Logo";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: { default: "Панель управления", template: "%s — Админка GVIDON TOUR" },
  robots: { index: false, follow: false },
};

const NAV: { href: string; label: string; icon: LucideIcon; soon?: boolean }[] = [
  { href: "/admin", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/requests", label: "Заявки", icon: Inbox },
];

// Sections arriving in the next stages — shown greyed out so staff can see
// the shape of the finished panel.
const SOON = ["Туры", "Галерея", "Отзывы", "Блог", "Достижения"];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="flex w-[230px] flex-none flex-col border-r border-content/10 bg-panel max-md:w-[64px]">
        <Link href="/admin" className="flex items-center gap-3 border-b border-content/10 px-4 py-4">
          <div className="h-[34px] w-[34px] flex-none [&_svg]:block [&_svg]:h-full [&_svg]:w-full">
            <Logo />
          </div>
          <div className="max-md:hidden">
            <div className="text-[12px] font-extrabold leading-none tracking-[0.16em]">GVIDON TOUR</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-gold/85">Админка</div>
          </div>
        </Link>

        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.soon ? "#" : item.href}
              aria-disabled={item.soon}
              className={cx(
                "flex items-center gap-3 rounded-[3px] px-3 py-2.5 text-[14px] font-semibold transition-colors",
                item.soon
                  ? "pointer-events-none text-content/35"
                  : "text-content/75 hover:bg-gold/10 hover:text-gold"
              )}
            >
              <span className="lic text-[17px]">
                <item.icon />
              </span>
              <span className="max-md:hidden">{item.label}</span>
              {item.soon && (
                <span className="ml-auto rounded bg-content/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-content/45 max-md:hidden">
                  скоро
                </span>
              )}
            </Link>
          ))}
          <div className="pt-2 max-md:hidden">
            {SOON.map((label) => (
              <div key={label} className="flex items-center gap-3 px-3 py-2 text-[13.5px] text-content/30">
                {label}
                <span className="ml-auto rounded bg-content/8 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-content/35">
                  скоро
                </span>
              </div>
            ))}
          </div>
        </nav>

        <div className="border-t border-content/10 p-3">
          <div className="mb-2 px-3 text-[12px] text-content/50 max-md:hidden">{session.name}</div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-3 rounded-[3px] px-3 py-2.5 text-[14px] font-semibold text-content/60 transition-colors hover:bg-content/5 hover:text-content"
            >
              <span className="lic text-[17px]">
                <LogOut />
              </span>
              <span className="max-md:hidden">Выйти</span>
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-6 md:p-9">{children}</main>
    </div>
  );
}
