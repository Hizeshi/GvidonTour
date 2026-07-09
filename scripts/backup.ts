// Dumps every table to a timestamped JSON file under backups/.
// Usage: npx tsx scripts/backup.ts  (or: npm run db:backup)
import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  }),
});

async function main() {
  const [tours, categories, directions, reviews, galleryItems, achievements, blogPosts, leads, adminUsers] =
    await Promise.all([
      prisma.tour.findMany(),
      prisma.category.findMany(),
      prisma.direction.findMany(),
      prisma.review.findMany(),
      prisma.galleryItem.findMany(),
      prisma.achievement.findMany(),
      prisma.blogPost.findMany(),
      prisma.lead.findMany(),
      prisma.adminUser.findMany(),
    ]);

  const dump = {
    createdAt: new Date().toISOString(),
    tours,
    categories,
    directions,
    reviews,
    galleryItems,
    achievements,
    blogPosts,
    leads,
    adminUsers,
  };

  const dir = join(__dirname, "..", "backups");
  mkdirSync(dir, { recursive: true });
  const stamp = dump.createdAt.replace(/[:.]/g, "-");
  const file = join(dir, `backup-${stamp}.json`);
  writeFileSync(file, JSON.stringify(dump, null, 2), "utf-8");

  console.log(`Бэкап сохранён: ${file}`);
  console.log(
    `Туры: ${tours.length}, категории: ${categories.length}, направления: ${directions.length}, ` +
      `отзывы: ${reviews.length}, фото/видео: ${galleryItems.length}, достижения: ${achievements.length}, ` +
      `статьи: ${blogPosts.length}, заявки: ${leads.length}, админ-аккаунты: ${adminUsers.length}`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
