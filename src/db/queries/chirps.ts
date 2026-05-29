import { chirps, NewChirp } from "../schema.js";
import { db } from "../index.js";

export async function createChirp(chirp: NewChirp) {
  const [result] = await db
    .insert(chirps)
    .values(chirp)
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function getChirpList() {
  const result = await db
    .select()
    .from(chirps);
  return result;
}