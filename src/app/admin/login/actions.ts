"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { allowHit, clientIp, resetHits } from "@/lib/rate-limit";

export interface LoginState {
  error: string;
}

// Brute-force brake: 5 failed attempts per IP per 10 minutes.
//
// Keyed by IP, NOT by login. Keying by login handed anyone a lockout button:
// the admin login is guessable ("admin"), so five deliberate wrong passwords
// locked the real admin out of their own panel for ten minutes, repeatable
// forever. Keyed by IP, an attacker can only lock themselves out.
//
// A distributed attack sidesteps any IP counter; what stops that one is bcrypt
// at cost 12 (~0.25s per guess), which is why the compare below always runs.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILURES = 5;

// Compared against when the login doesn't exist, so unknown and known
// logins take the same time to reject (no user enumeration via timing).
const DUMMY_HASH = "$2b$12$v0w.9yqSVBAwEXZp5Lzk5uVJePHB7eBQT0.KbnuTFS2GPj46X.tdO";

export async function loginAction(_prev: LoginState | null, formData: FormData): Promise<LoginState> {
  const login = String(formData.get("login") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!login || !password) return { error: "Введите логин и пароль" };

  const limitKey = `login:${await clientIp()}`;
  if (!(await allowHit(limitKey, MAX_FAILURES, WINDOW_MS))) {
    return { error: "Слишком много попыток. Подождите 10 минут." };
  }

  let user;
  try {
    user = await prisma.adminUser.findUnique({ where: { login } });
  } catch {
    return { error: "База данных недоступна, попробуйте позже" };
  }

  const passwordOk = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !passwordOk) {
    return { error: "Неверный логин или пароль" };
  }

  // Only a correct password clears the counter, so a burst of guesses that
  // happens to include the right one still leaves the attacker throttled.
  await resetHits(limitKey);
  await createSession({ userId: user.id, login: user.login, name: user.name });
  redirect("/admin");
}
