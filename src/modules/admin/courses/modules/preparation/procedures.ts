import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { coursePreparationClasses, courses } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import {
  coursePreparationInsertSchema,
  coursePreparationUpdateSchema,
  getCourseSchema,
} from "./schema";

export const preparationRouter = createTRPCRouter({
  getOne: protectedProcedure.input(getCourseSchema).query(async ({ input }) => {
    const result = await db.query.coursePreparationClasses.findFirst({
      where: eq(coursePreparationClasses.id, input.id),
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
    .input(coursePreparationInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdPreparationClass] = await db
        .insert(coursePreparationClasses)
        .values({
          ...input,
          authorId: ctx.auth.user.id,
        })
        .returning();
      return createdPreparationClass;
    }),
  update: protectedProcedure
    .input(coursePreparationUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...payload } = input;
      const [updatedPreparationClass] = await db
        .update(coursePreparationClasses)
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
        .delete(coursePreparationClasses)
        .where(eq(coursePreparationClasses.id, input.id))
        .returning();

      if (!removedMockTest) {
        throw new TRPCError({ code: "NOT_FOUND", message: "" });
      }
      return removedMockTest;
    }),

  getAllByCourse: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input }) => {
      return db.query.coursePreparationClasses.findMany({
        where: eq(coursePreparationClasses.courseId, input.courseId),
        orderBy: desc(coursePreparationClasses.createdAt),
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
