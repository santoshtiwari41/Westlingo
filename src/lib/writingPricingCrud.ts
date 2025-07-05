"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  writingTiers,
  writingTypeTierPricing,
  writingTypes,
} from "@/db/schema";

export async function getAllWritingPrices() {
  return db
    .select({
      id: writingTypeTierPricing.id,
      writingTypeId: writingTypeTierPricing.writingTypeId,
      tierId: writingTypeTierPricing.tierId,
      price: writingTypeTierPricing.price,
      writingTypeName: writingTypes.name,
      tierName: writingTiers.name,
    })
    .from(writingTypeTierPricing)
    .leftJoin(
      writingTypes,
      eq(writingTypeTierPricing.writingTypeId, writingTypes.id)
    )
    .leftJoin(writingTiers, eq(writingTypeTierPricing.tierId, writingTiers.id));
}

export async function createWritingPrice({
  writingTypeId,
  tierId,
  price,
}: {
  writingTypeId: number;
  tierId: number;
  price: number;
}) {
  return db
    .insert(writingTypeTierPricing)
    .values({ writingTypeId, tierId, price: String(price) })
    .returning();
}

export async function updateWritingPrice({
  id,
  price,
}: {
  id: number;
  price: number;
}) {
  return db
    .update(writingTypeTierPricing)
    .set({ price: String(price) })
    .where(eq(writingTypeTierPricing.id, id))
    .returning();
}

export async function deleteWritingPrice({ id }: { id: number }) {
  return db
    .delete(writingTypeTierPricing)
    .where(eq(writingTypeTierPricing.id, id))
    .returning();
}

export async function fetchWritingPricesServer() {
  return await getAllWritingPrices();
}
