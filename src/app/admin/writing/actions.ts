"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { transactionWriting, writing } from "@/db/schema";

import { ALLOWED_STATUSES } from "./constants";

export async function updateWritingStatus(id: number, status: string) {
  if (!id || !ALLOWED_STATUSES.includes(status)) {
    throw new Error("Invalid id or status");
  }
  await db.update(writing).set({ status }).where(eq(writing.id, id));
}

export async function updateTransactionStatus(id: number, status: string) {
  if (!id || !ALLOWED_STATUSES.includes(status)) {
    throw new Error("Invalid id or status");
  }
  await db
    .update(transactionWriting)
    .set({ status })
    .where(eq(transactionWriting.id, id));
}
