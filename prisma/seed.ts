import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SEED_USERS = [
  { name: "Guy Hazut", email: "guyhazut2000@gmail.com", password: "12341234" },
] as const;

async function main() {
  console.log("Seeding users...");

  for (const user of SEED_USERS) {
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existing) {
      console.log(`User ${user.email} already exists, skipping.`);
      continue;
    }

    const hashedPassword = await hashPassword(user.password);
    const userId = randomUUID();

    await prisma.user.create({
      data: {
        id: userId,
        name: user.name,
        email: user.email,
        emailVerified: false,
      },
    });

    await prisma.account.create({
      data: {
        id: randomUUID(),
        accountId: user.email,
        providerId: "credential",
        userId,
        password: hashedPassword,
      },
    });

    console.log(`Created user ${user.email}`);
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
