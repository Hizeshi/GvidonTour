import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

/** Admin session: a signed JWT in an httpOnly cookie. Deliberately minimal —
 *  1-2 staff accounts, credentials only, no OAuth — so a full auth framework
 *  would be more surface than benefit. The same AUTH_SECRET is verified in
 *  proxy.ts (edge) and here (node). */
export const SESSION_COOKIE = "gv_admin";
const MAX_AGE_S = 60 * 60 * 24 * 7; // 7 days

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export interface AdminSession {
  userId: string;
  login: string;
  name: string;
}

export async function createSession(session: AdminSession) {
  const token = await new SignJWT({ login: session.login, name: session.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.userId)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_S}s`)
    .sign(secretKey());
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_S,
    path: "/",
  });
}

export async function getSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    return {
      userId: payload.sub ?? "",
      login: typeof payload.login === "string" ? payload.login : "",
      name: typeof payload.name === "string" ? payload.name : "",
    };
  } catch {
    return null;
  }
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}
