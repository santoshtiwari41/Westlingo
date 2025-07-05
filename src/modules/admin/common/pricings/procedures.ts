import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import {
  coursePricingItems,
  coursePricings,
  courseTypePricing,
  courses,
  reservationSlots,
  reservations,
  transactions,
  user,
} from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import {
  getPricing,
  pricingItemInsertSchema,
  pricingItemUpdateSchema,
  pricingsInsertSchema,
  pricingsUpdateSchema,
} from "./schema";

export const pricingsRouter = createTRPCRouter({
  getOne: protectedProcedure.input(getPricing).query(async ({ input }) => {
    const result = await db.query.coursePricings.findFirst({
      where: eq(coursePricings.id, input.id),
      columns: {
        id: true,
        title: true,
        description: true,
        isActive: true,
      },
      with: {
        items: {
          columns: {
            id: true,
            title: true,
            description: true,
            price: true,
            features: true,
            isActive: true,
          },
        },
      },
    });

    if (!result) {
      throw new TRPCError({ code: "NOT_FOUND", message: "" });
    }
    return result;
  }),

  createPricings: protectedProcedure
    .input(pricingsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const [insertedItem] = await db
          .insert(coursePricings)
          .values({
            ...input,
            authorId: ctx.auth.user.id,
          })
          .returning();
        return insertedItem;
      } catch (err: any) {
        if (err.code === "23505") {
          if (err.detail?.includes("test_booking_id")) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A pricing already exists for this test booking.",
            });
          }
          if (err.detail?.includes("mock_test_id")) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A pricing already exists for this mock test.",
            });
          }
          if (err.detail?.includes("preparation_class_id")) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A pricing already exists for this preparation class.",
            });
          }
        }
        console.error("Error inserting course pricing:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: err.message,
        });
      }
    }),
  updatePricings: protectedProcedure
    .input(pricingsUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...payload } = input;
      const [updatedItem] = await db
        .update(coursePricings)
        .set({
          ...payload,
          authorId: ctx.auth.user.id,
        })
        .where(eq(coursePricings.id, id))
        .returning();
      return updatedItem;
    }),
  createPricingItem: protectedProcedure
    .input(pricingItemInsertSchema)
    .mutation(async ({ input }) => {
      const [insertedItem] = await db
        .insert(coursePricingItems)
        .values({
          ...input,
          price: String(input.price),
        })
        .returning();
      return insertedItem;
    }),
  updatePricingItem: protectedProcedure
    .input(pricingItemUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...payload } = input;
      const [updatedItem] = await db
        .update(coursePricingItems)
        .set({
          ...payload,
          price: String(input.price),
        })
        .where(eq(coursePricingItems.id, id))
        .returning();
      return updatedItem;
    }),
  removePricingItem: protectedProcedure
    .input(getPricing)
    .mutation(async ({ input }) => {
      const [removedItem] = await db
        .delete(coursePricingItems)
        .where(eq(coursePricingItems.id, input.id))
        .returning();

      if (!removedItem) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }
      return removedItem;
    }),
  getPricingItemById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const item = await db.query.coursePricingItems.findFirst({
        where: eq(coursePricingItems.id, input.id),
      });
      if (!item)
        throw new TRPCError({ code: "NOT_FOUND", message: "Not found" });
      return item;
    }),
  createTransaction: protectedProcedure
    .input(
      z.object({
        reservationId: z.string(),
        amount: z.string(),
        imageUrl: z.string(),
        paymentMethod: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [created] = await db
        .insert(transactions)
        .values({
          reservationId: input.reservationId,
          amount: input.amount,
          imageUrl: input.imageUrl,
          paymentMethod: input.paymentMethod,
          userId: ctx.auth.user.id,
          name: ctx.auth.user.name || "User",
        })
        .returning();
      return created;
    }),
  getAllTransactions: protectedProcedure.query(async () => {
    const txs = await db
      .select({
        id: transactions.id,
        userId: transactions.userId,
        name: transactions.name,
        amount: transactions.amount,
        paymentMethod: transactions.paymentMethod,
        imageUrl: transactions.imageUrl,
        createdAt: transactions.createdAt,
        reservationId: transactions.reservationId,
        status: transactions.status,
        email: user.email,
        courseName: courses.title,
        testTypeName: reservationSlots.type,
      })
      .from(transactions)
      .leftJoin(user, eq(transactions.userId, user.id))
      .leftJoin(reservations, eq(transactions.reservationId, reservations.id))
      .leftJoin(reservationSlots, eq(reservations.slotId, reservationSlots.id))
      .leftJoin(courses, eq(reservationSlots.courseId, courses.id))
      .orderBy(desc(transactions.createdAt));
    return { items: txs };
  }),
  updateTransactionStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["pending", "paid", "failed", "refunded"]),
      })
    )
    .mutation(async ({ input }) => {
      const [updated] = await db
        .update(transactions)
        .set({ status: input.status })
        .where(eq(transactions.id, input.id))
        .returning();
      if (!updated)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Transaction not found",
        });
      return updated;
    }),
  getUserTransactions: protectedProcedure.query(async ({ ctx }) => {
    const txs = await db
      .select({
        id: transactions.id,
        amount: transactions.amount,
        status: transactions.status,
        createdAt: transactions.createdAt,
        reservationId: transactions.reservationId,
        paymentMethod: transactions.paymentMethod,
        imageUrl: transactions.imageUrl,
        courseName: courses.title,
        testTypeName: reservationSlots.type,
      })
      .from(transactions)
      .leftJoin(reservations, eq(transactions.reservationId, reservations.id))
      .leftJoin(reservationSlots, eq(reservations.slotId, reservationSlots.id))
      .leftJoin(courses, eq(reservationSlots.courseId, courses.id))
      .where(eq(transactions.userId, ctx.auth.user.id))
      .orderBy(desc(transactions.createdAt));
    return { items: txs };
  }),
});

export const courseTypePricingInsertSchema = z.object({
  courseId: z.string(),
  type: z.string(),
  tier: z.string(),
  price: z.string(),
  features: z.array(z.string()),
  isActive: z.boolean().optional(),
});

export const courseTypePricingUpdateSchema =
  courseTypePricingInsertSchema.extend({
    id: z.string(),
  });

export const courseTypePricingRouter = createTRPCRouter({
  getAllByCourse: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input }) => {
      return db
        .select()
        .from(courseTypePricing)
        .where(eq(courseTypePricing.courseId, input.courseId));
    }),
  create: protectedProcedure
    .input(courseTypePricingInsertSchema)
    .mutation(async ({ input }) => {
      const [created] = await db
        .insert(courseTypePricing)
        .values({
          ...input,
          isActive: input.isActive ?? true,
        })
        .returning();
      return created;
    }),
  update: protectedProcedure
    .input(courseTypePricingUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...payload } = input;
      const [updated] = await db
        .update(courseTypePricing)
        .set(payload)
        .where(eq(courseTypePricing.id, id))
        .returning();
      return updated;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const [deleted] = await db
        .delete(courseTypePricing)
        .where(eq(courseTypePricing.id, input.id))
        .returning();
      return deleted;
    }),
});
