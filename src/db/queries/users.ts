import { db } from "../index.js";
import { NewUser, users } from "../schema.js";
import { sql } from "drizzle-orm";

export async function createUser(user: NewUser) {
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function truncateUsers() {
  await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`);
}