import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { courseFaqItems, courseFaqs } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import {
  faqItemInsertSchema,
  faqItemUpdateSchema,
  faqsInsertSchema,
  faqsUpdateSchema,
  getFaq,
} from "./schema";

export const faqsRouter = createTRPCRouter({
  getOne: protectedProcedure.input(getFaq).query(async ({ input }) => {
    const result = await db.query.courseFaqs.findFirst({
      where: eq(courseFaqs.id, input.id),
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
          },
        },
      },
    });

    if (!result) {
      throw new TRPCError({ code: "NOT_FOUND", message: "" });
    }
    return result;
  }),
  createFAQ: protectedProcedure
    .input(faqsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdFAQ] = await db
        .insert(courseFaqs)
        .values({
          ...input,
          authorId: ctx.auth.user.id,
        })
        .returning();
      return createdFAQ;
    }),
  createFAQItem: protectedProcedure
    .input(faqItemInsertSchema)
    .mutation(async ({ input }) => {
      const [createdFAQItem] = await db
        .insert(courseFaqItems)
        .values({
          ...input,
          // authorId: ctx.auth.user.id,
        })
        .returning();
      return createdFAQItem;
    }),
  updateFAQ: protectedProcedure
    .input(faqsUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...payload } = input;
      const [updatedFAQ] = await db
        .update(courseFaqs)
        .set({
          ...payload,
          authorId: ctx.auth.user.id,
        })
        .where(eq(courseFaqs.id, id))
        .returning();
      return updatedFAQ;
    }),
  updateFAQItem: protectedProcedure
    .input(faqItemUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...payload } = input;
      const [updatedFAQItem] = await db
        .update(courseFaqItems)
        .set({
          ...payload,
          // authorId: ctx.auth.user.id,
        })
        .where(eq(courseFaqItems.id, id))
        .returning();
      return updatedFAQItem;
    }),
  removeFAQItem: protectedProcedure
    .input(getFaq)
    .mutation(async ({ input }) => {
      const [removedFAQItem] = await db
        .delete(courseFaqItems)
        .where(eq(courseFaqItems.id, input.id))
        .returning();

      if (!removedFAQItem) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }
      return removedFAQItem;
    }),
});
