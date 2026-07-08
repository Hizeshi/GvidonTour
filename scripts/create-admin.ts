// Creates or updates an admin panel account.
// Usage: npx tsx scripts/create-admin.ts <login> <password> [name]
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const [login, password, name] = process.argv.slice(2);
if (!login || !password) {
  console.error("Usage: npx tsx scripts/create-admin.ts <login> <password> [name]");
  process.exit(1);
}
if (password.length < 10) {
  console.error("Password must be at least 10 characters.");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  }),
});

async function main() {
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { login: login.toLowerCase() },
    update: { passwordHash, name: name ?? login },
    create: { login: login.toLowerCase(), passwordHash, name: name ?? login },
  });
  console.log(`Admin user "${login.toLowerCase()}" is ready.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
