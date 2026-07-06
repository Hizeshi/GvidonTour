import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // CLI operations (db push, migrations, seed) go through the session
    // pooler (5432) — the transaction pooler (6543) does not support DDL.
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
