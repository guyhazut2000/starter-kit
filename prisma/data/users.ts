/**
 * Seed users for the database.
 * Loaded by prisma/seed.ts.
 */

export const SEED_USERS = [
  { name: "Guy Hazut", email: "guyhazut2000@gmail.com", password: "12341234" },
] as const;

export type SeedUser = (typeof SEED_USERS)[number];
