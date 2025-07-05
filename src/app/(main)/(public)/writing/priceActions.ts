"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { writingTypeTierPricing } from "@/db/schema";

export async function getWritingPrice({
  writingTypeId,
  tierId,
}: {
  writingTypeId: number;
  tierId: number;
}) {
  const result = await db
    .select()
    .from(writingTypeTierPricing)
    .where(
      and(
        eq(writingTypeTierPricing.writingTypeId, writingTypeId),
        eq(writingTypeTierPricing.tierId, tierId)
      )
    );
  return result[0]?.price ? Number(result[0].price) : null;
}
