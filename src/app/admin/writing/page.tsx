"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  transactionWriting,
  user,
  visaTypes,
  writing,
  writingTiers,
  writingTypes,
} from "@/db/schema";
import { getAllWritingPrices } from "@/lib/writingPricingCrud";

import WritingPricingAdminClient from "./WritingPricingAdminClient";

export default async function WritingPricingAdmin() {
  const writingTypesList = await db.select().from(writingTypes);
  const tiers = await db.select().from(writingTiers);
  const prices = await getAllWritingPrices();
  const writings = await db
    .select({
      id: writing.id,
      userName: user.name,
      userEmail: user.email,
      writingTypeName: writingTypes.name,
      tierName: writingTiers.name,
      visaTypeName: visaTypes.name,
      country: writing.country,
      price: writing.price,
      status: writing.status,
      createdAt: writing.createdAt,
    })
    .from(writing)
    .leftJoin(user, eq(writing.userId, user.id))
    .leftJoin(writingTypes, eq(writing.writingTypeId, writingTypes.id))
    .leftJoin(writingTiers, eq(writing.tierId, writingTiers.id))
    .leftJoin(visaTypes, eq(writing.visaTypeId, visaTypes.id));

  // Fetch transactions with joins
  const transactions = await db
    .select({
      id: transactionWriting.id,
      writingId: transactionWriting.writingId,
      userName: user.name,
      userEmail: user.email,
      price: transactionWriting.price,
      imageUrl: transactionWriting.imageUrl,
      status: transactionWriting.status,
      createdAt: transactionWriting.createdAt,
      writingTypeName: writingTypes.name,
      tierName: writingTiers.name,
    })
    .from(transactionWriting)
    .leftJoin(user, eq(transactionWriting.userId, user.id))
    .leftJoin(writing, eq(transactionWriting.writingId, writing.id))
    .leftJoin(writingTypes, eq(writing.writingTypeId, writingTypes.id))
    .leftJoin(writingTiers, eq(writing.tierId, writingTiers.id));

  return (
    <WritingPricingAdminClient
      writingTypes={writingTypesList}
      tiers={tiers}
      initialPrices={prices}
      writings={writings}
      transactions={transactions}
    />
  );
}
