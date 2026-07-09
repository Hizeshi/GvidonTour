// Restores tables from a JSON file produced by scripts/backup.ts.
// Upserts by id — adds missing rows and overwrites matching ones,
// but never deletes rows that aren't present in the backup file.
// Usage: npx tsx scripts/restore.ts <путь-к-backup.json>
import "dotenv/config";
import { readFileSync } from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../src/generated/prisma/client";

const [file] = process.argv.slice(2);
if (!file) {
  console.error("Usage: npx tsx scripts/restore.ts <путь-к-backup.json>");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  }),
});

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
function reviveDates(_key: string, value: unknown) {
  return typeof value === "string" && ISO_DATE.test(value) ? new Date(value) : value;
}

async function main() {
  const raw = readFileSync(file, "utf-8");
  const dump = JSON.parse(raw, reviveDates) as Record<string, Record<string, unknown>[]>;

  for (const c of dump.categories ?? []) {
    await prisma.category.upsert({ where: { id: c.id as string }, update: c, create: c as never });
  }
  for (const d of dump.directions ?? []) {
    await prisma.direction.upsert({ where: { id: d.id as string }, update: d, create: d as never });
  }
  for (const t of dump.tours ?? []) {
    const data = { ...t, details: t.details === null ? Prisma.JsonNull : t.details };
    await prisma.tour.upsert({ where: { id: t.id as string }, update: data, create: data as never });
  }
  for (const r of dump.reviews ?? []) {
    await prisma.review.upsert({ where: { id: r.id as string }, update: r, create: r as never });
  }
  for (const g of dump.galleryItems ?? []) {
    await prisma.galleryItem.upsert({ where: { id: g.id as string }, update: g, create: g as never });
  }
  for (const a of dump.achievements ?? []) {
    await prisma.achievement.upsert({ where: { id: a.id as string }, update: a, create: a as never });
  }
  for (const b of dump.blogPosts ?? []) {
    await prisma.blogPost.upsert({ where: { id: b.id as string }, update: b, create: b as never });
  }
  for (const l of dump.leads ?? []) {
    await prisma.lead.upsert({ where: { id: l.id as string }, update: l, create: l as never });
  }
  for (const u of dump.adminUsers ?? []) {
    await prisma.adminUser.upsert({ where: { id: u.id as string }, update: u, create: u as never });
  }

  console.log(`Восстановлено из ${file}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
