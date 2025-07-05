import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import {
  writingTiers,
  writingTypeTierPricing,
  writingTypes,
} from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const writingPricingRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    return db
      .select({
        id: writingTypeTierPricing.id,
        writingTypeId: writingTypeTierPricing.writingTypeId,
        tierId: writingTypeTierPricing.tierId,
        price: writingTypeTierPricing.price,
        isActive: writingTypeTierPricing.isActive,
        writingTypeName: writingTypes.name,
        tierName: writingTiers.name,
      })
      .from(writingTypeTierPricing)
      .leftJoin(
        writingTypes,
        eq(writingTypeTierPricing.writingTypeId, writingTypes.id)
      )
      .leftJoin(
        writingTiers,
        eq(writingTypeTierPricing.tierId, writingTiers.id)
      );
  }),
  getAllTypes: protectedProcedure.query(async () => {
    return db.select().from(writingTypes);
  }),
  getAllTiers: protectedProcedure.query(async () => {
    return db.select().from(writingTiers);
  }),
  create: protectedProcedure
    .input(
      z.object({
        writingTypeId: z.number(),
        tierId: z.number(),
        price: z.union([z.number(), z.string()]),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const [created] = await db
        .insert(writingTypeTierPricing)
        .values({
          writingTypeId: input.writingTypeId,
          tierId: input.tierId,
          price: String(input.price),
          isActive: input.isActive ?? true,
        })
        .returning();
      return created;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        price: z.union([z.number(), z.string()]),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const [updated] = await db
        .update(writingTypeTierPricing)
        .set({
          price: String(input.price),
          isActive: input.isActive,
        })
        .where(eq(writingTypeTierPricing.id, input.id))
        .returning();
      return updated;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const [deleted] = await db
        .delete(writingTypeTierPricing)
        .where(eq(writingTypeTierPricing.id, input.id))
        .returning();
      return deleted;
    }),
});
