"use server";

import { uploadToCloudinary } from "@/actions/cloudinary";
import { db } from "@/db";
import { transactionWriting, writing } from "@/db/schema";

export async function submitCVWriting(data: {
  userId: string;
  writingTypeId: number;
  tierId: number;
  country: string;
  visaTypeId: number;
  price: number;
}) {
  const [writingRow] = await db
    .insert(writing)
    .values({
      userId: data.userId,
      writingTypeId: data.writingTypeId,
      tierId: data.tierId,
      country: data.country,
      visaTypeId: data.visaTypeId,
      price: String(data.price),
      status: "pending",
    })
    .returning();
  return writingRow;
}

export async function submitWritingTransaction(data: {
  writingId: number;
  userId: string;
  price: number;
  file?: File | null;
}) {
  let imageUrl: string | undefined = undefined;
  if (data.file) {
    const formData = new FormData();
    formData.append("file", data.file);
    const result = await uploadToCloudinary(formData, "writing-payments");
    if ("error" in result) throw new Error(result.error);
    imageUrl = result.url;
  }
  const [transactionRow] = await db
    .insert(transactionWriting)
    .values({
      writingId: data.writingId,
      userId: data.userId,
      price: String(data.price),
      imageUrl: imageUrl ?? "",
      status: "pending",
    })
    .returning();
  return transactionRow;
}
