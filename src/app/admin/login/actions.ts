"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";

export interface LoginState {
  error: string;
}

// Per-instance brute-force brake: 5 failures per login per 10 minutes.
// Serverless instances each keep their own map — combined with bcrypt cost
// that is enough friction for a two-account admin panel.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILURES = 5;
const failures = new Map<string, { count: number; since: number }>();

export async function loginAction(_prev: LoginState | null, formData: FormData): Promise<LoginState> {
  const login = String(formData.get("login") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!login || !password) return { error: "Введите логин и пароль" };

  const rec = failures.get(login);
  if (rec && Date.now() - rec.since < WINDOW_MS && rec.count >= MAX_FAILURES) {
    return { error: "Слишком много попыток. Подождите 10 минут." };
  }

  let user;
  try {
    user = await prisma.adminUser.findUnique({ where: { login } });
  } catch {
    return { error: "База данных недоступна, попробуйте позже" };
  }

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    const cur = failures.get(login);
    if (cur && Date.now() - cur.since < WINDOW_MS) cur.count += 1;
    else failures.set(login, { count: 1, since: Date.now() });
    return { error: "Неверный логин или пароль" };
  }

  failures.delete(login);
  await createSession({ userId: user.id, login: user.login, name: user.name });
  redirect("/admin");
}
