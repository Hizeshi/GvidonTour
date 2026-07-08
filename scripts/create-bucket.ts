// One-off: creates the public "media" storage bucket via the storage schema.
// Usage: npx tsx scripts/create-bucket.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  }),
});

async function main() {
  await prisma.$executeRawUnsafe(`
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES ('media', 'media', true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/avif','video/mp4'])
    ON CONFLICT (id) DO UPDATE
      SET public = true,
          file_size_limit = 10485760,
          allowed_mime_types = ARRAY['image/jpeg','image/png','image/webp','image/avif','video/mp4']
  `);
  const rows = await prisma.$queryRawUnsafe<{ id: string; public: boolean }[]>(
    `SELECT id, public FROM storage.buckets WHERE id = 'media'`
  );
  console.log("bucket:", rows);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
