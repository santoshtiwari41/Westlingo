import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { courseMockTests, courses } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import {
  courseMockTestInsertSchema,
  courseMockTestUpdateSchema,
  getCourseSchema,
} from "./schema";

export const mockTestRouter = createTRPCRouter({
  getOne: protectedProcedure.input(getCourseSchema).query(async ({ input }) => {
    const result = await db.query.courseMockTests.findFirst({
      where: eq(courseMockTests.id, input.id),
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
    .input(courseMockTestInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdPreparationClass] = await db
        .insert(courseMockTests)
        .values({
          ...input,
          authorId: ctx.auth.user.id,
        })
        .returning();
      return createdPreparationClass;
    }),
  update: protectedProcedure
    .input(courseMockTestUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...payload } = input;
      const [updatedPreparationClass] = await db
        .update(courseMockTests)
        .set({
          ...payload,
          authorId: ctx.auth.user.id,
        })
        .where(eq(courses.id, id))
        .returning();
      return updatedPreparationClass;
    }),
  remove: protectedProcedure
    .input(getCourseSchema)
    .mutation(async ({ input }) => {
      const [removedMockTest] = await db
        .delete(courseMockTests)
        .where(eq(courseMockTests.id, input.id))
        .returning();

      if (!removedMockTest) {
        throw new TRPCError({ code: "NOT_FOUND", message: "" });
      }
      return removedMockTest;
    }),

  getAllByCourse: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input }) => {
      return db.query.courseMockTests.findMany({
        where: eq(courseMockTests.courseId, input.courseId),
        orderBy: desc(courseMockTests.createdAt),
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
