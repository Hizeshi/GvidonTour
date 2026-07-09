import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// pg defaults to an unencrypted connection and Supabase's pooler accepts
// those unless SSL enforcement is switched on in its dashboard. Forcing
// sslmode here keeps DB traffic (credentials included) encrypted even if
// the env value forgets the parameter. uselibpqcompat gives `require` its
// libpq meaning — encrypt, don't demand a publicly-rooted cert chain
// (Supabase's pooler cert is signed by Supabase's own CA).
function withSslRequire(url: string): string {
  if (!url || /[?&]sslmode=/.test(url)) return url;
  return url + (url.includes("?") ? "&" : "?") + "sslmode=require&uselibpqcompat=true";
}

type PrismaClientInstance = InstanceType<typeof PrismaClient>;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClientInstance };

export const prisma: PrismaClientInstance =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: withSslRequire(process.env.DATABASE_URL ?? "") }),
  });

// Reuse the client across hot reloads in dev to avoid connection buildup.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
