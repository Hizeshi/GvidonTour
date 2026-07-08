"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { cx, ui } from "@/lib/ui";
import Logo from "@/components/Logo";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-5">
      <div className="w-full max-w-[380px] rounded-[5px] border border-content/12 bg-panel p-8">
        <div className="mb-7 flex items-center gap-3.5">
          <div className="h-[42px] w-[42px] flex-none [&_svg]:block [&_svg]:h-full [&_svg]:w-full">
            <Logo />
          </div>
          <div>
            <div className="text-[15px] font-extrabold leading-none tracking-[0.18em]">GVIDON TOUR</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gold/85">Панель управления</div>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className={ui.flabel} htmlFor="login">
              Логин
            </label>
            <input id="login" name="login" autoComplete="username" required className={ui.finput} />
          </div>
          <div>
            <label className={ui.flabel} htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={ui.finput}
            />
          </div>

          {state?.error && <p className="text-[13.5px] font-semibold text-red-400">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className={cx(ui.btnGold, "w-full justify-center", pending && "pointer-events-none opacity-60")}
          >
            {pending ? "Вход..." : "Войти"}
            <span className="lic">
              <LogIn />
            </span>
          </button>
        </form>
      </div>
    </main>
  );
}
