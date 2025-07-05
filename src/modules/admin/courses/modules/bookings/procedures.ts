import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { courseTestBookings, courses } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import {
  bookingInsertSchema,
  bookingUpdateSchema,
  getBookingSchema,
} from "./schema";

export const bookingRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(getBookingSchema)
    .query(async ({ input }) => {
      const result = await db.query.courseTestBookings.findFirst({
        where: eq(courseTestBookings.id, input.id),
        with: {
          faq: {
            with: {
              items: true,
            },
          },
          pricing: {
            with: {
              items: true,
            },
          },
          carousel: {
            with: {
              items: true,
            },
          },
        },
      });
      if (!result) {
        throw new TRPCError({ code: "NOT_FOUND", message: "" });
      }
      return result;
    }),

  create: protectedProcedure
    .input(bookingInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdBookingClass] = await db
        .insert(courseTestBookings)
        .values({
          ...input,
          authorId: ctx.auth.user.id,
        })
        .returning();
      return createdBookingClass;
    }),
  update: protectedProcedure
    .input(bookingUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...payload } = input;
      const [updatedBookingClass] = await db
        .update(courseTestBookings)
        .set({
          ...payload,
          authorId: ctx.auth.user.id,
        })
        .where(eq(courses.id, id))
        .returning();
      return updatedBookingClass;
    }),
  remove: protectedProcedure
    .input(getBookingSchema)
    .mutation(async ({ input }) => {
      const [removedMockTest] = await db
        .delete(courseTestBookings)
        .where(eq(courseTestBookings.id, input.id))
        .returning();

      if (!removedMockTest) {
        throw new TRPCError({ code: "NOT_FOUND", message: "" });
      }
      return removedMockTest;
    }),

  getAllByCourse: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input }) => {
      return db.query.courseTestBookings.findMany({
        where: eq(courseTestBookings.courseId, input.courseId),
        orderBy: desc(courseTestBookings.createdAt),
        with: {
          pricing: {
            with: {
              items: true,
            },
          },
        },
      });
    }),
});
