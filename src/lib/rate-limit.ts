import { headers } from "next/headers";
import { prisma } from "./db";

/** Fixed-window counters, shared by every server instance.
 *
 *  These used to be in-memory Maps, which was wrong twice over. On Vercel each
 *  serverless instance keeps its own memory, so "3 reviews per IP per day"
 *  really meant "3 per day per instance" — the limit multiplied by however
 *  many instances happened to be warm, and reset on every deploy. And nothing
 *  ever evicted expired keys, so the Map grew by one entry per unique IP for
 *  the life of the process: a slow leak that a spam run could accelerate.
 *
 *  A single row per key in Postgres fixes both, and keeps working after the
 *  move to a VPS. */

/** The visitor's IP, as the platform reports it.
 *
 *  SECURITY: X-Forwarded-For is only trustworthy when the proxy in front of
 *  the app *overwrites* it. Vercel does. If this is ever served through an
 *  nginx of our own, it must set `proxy_set_header X-Forwarded-For $remote_addr`
 *  (not `$proxy_add_x_forwarded_for`, which appends to whatever the client
 *  sent) — otherwise anyone can spoof the header and every limit below becomes
 *  decorative. */
export function ipFromHeaders(h: Headers): string {
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return h.get("x-real-ip") ?? "local";
}

/** ipFromHeaders for callers with no Request in hand (server actions). */
export async function clientIp(): Promise<string> {
  return ipFromHeaders(await headers());
}

/** Counts one hit against `key` and reports whether it is still within `limit`.
 *
 *  Fails **open**: if the database is unreachable, the caller's own DB work is
 *  about to fail anyway, and a limiter that locks out every visitor during an
 *  outage does more damage than one that briefly stops counting. */
export async function allowHit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const seconds = windowMs / 1000;
  try {
    // Every timestamp here comes from NOW() — the database's clock — because
    // the window is *compared* against NOW() and mixing clocks silently
    // distorts it. Computing the expiry from the app's own Date.now() was off
    // by however far that server's clock drifts (half a second against this
    // Supabase instance while testing, and each Vercel instance would bring
    // its own); a badly set clock could stretch a 10-minute lockout into an
    // hour or collapse it to nothing.
    //
    // One statement, so two concurrent requests can't both read a stale count
    // and write limit+1. The CASE restarts an elapsed window in the same round
    // trip.
    const rows = await prisma.$queryRaw<{ count: number }[]>`
      INSERT INTO "RateLimit" ("key", "count", "expiresAt")
      VALUES (${key}, 1, NOW() + ${seconds}::double precision * INTERVAL '1 second')
      ON CONFLICT ("key") DO UPDATE SET
        "count" = CASE WHEN "RateLimit"."expiresAt" <= NOW()
                       THEN 1 ELSE "RateLimit"."count" + 1 END,
        "expiresAt" = CASE WHEN "RateLimit"."expiresAt" <= NOW()
                           THEN NOW() + ${seconds}::double precision * INTERVAL '1 second'
                           ELSE "RateLimit"."expiresAt" END
      RETURNING "count"
    `;
    sweepSometimes();
    return (rows[0]?.count ?? 1) <= limit;
  } catch (err) {
    console.error("[rate-limit] check failed, allowing through:", err);
    return true;
  }
}

/** Clears a counter — call after a hit that proves the client is legitimate,
 *  so a successful login doesn't leave earlier typos counting against it. */
export async function resetHits(key: string): Promise<void> {
  try {
    await prisma.rateLimit.deleteMany({ where: { key } });
  } catch {
    // Best-effort: a stale counter expires on its own.
  }
}

/** A key whose client never returns would sit in the table forever, so drop
 *  expired rows now and then. Cheap on average and never blocks the request.
 *  NOW() again rather than a JS date, for the same reason as in allowHit. */
function sweepSometimes(): void {
  if (Math.random() >= 0.02) return;
  prisma.$executeRaw`DELETE FROM "RateLimit" WHERE "expiresAt" <= NOW()`.catch(() => {});
}
