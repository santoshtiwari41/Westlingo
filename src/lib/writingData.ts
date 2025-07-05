import { db } from "@/db";
import { writingTiers, writingTypes } from "@/db/schema";

export async function getAllWritingTypes() {
  return db.select().from(writingTypes);
}

export async function getAllWritingTiers() {
  return db.select().from(writingTiers);
}
