"use server";

import { db } from "@/db";
import { paymentQr } from "@/db/schema";

export async function savePaymentQr(url: string, uploadedBy?: string) {
  await db.delete(paymentQr); // Remove any existing QR (global)
  const [qr] = await db
    .insert(paymentQr)
    .values({
      url,
      uploadedBy,
      uploadedAt: new Date(),
    })
    .returning();
  return qr;
}

export async function getPaymentQr() {
  const [qr] = await db.select().from(paymentQr).limit(1);
  return qr || null;
}

export async function deletePaymentQr() {
  await db.delete(paymentQr);
}
