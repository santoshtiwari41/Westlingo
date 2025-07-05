import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, ilike } from "drizzle-orm";

import { db } from "@/db";
import { courses } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import {
  coursesInsertSchema,
  coursesUpdateSchema,
  getCourseSchema,
  getCoursesSchema,
} from "./schema";

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const coursesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(coursesInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdCourse] = await db
        .insert(courses)
        .values({
          ...input,
          slug: generateSlug(input.title),
          authorId: ctx.auth.user.id,
        })
        .returning();
      return createdCourse;
    }),
  getMany: protectedProcedure
    .input(getCoursesSchema)
    .query(async ({ input }) => {
      const page = input?.page ?? 1;
      const pageSize = input?.pageSize ?? 10;

      const whereClauses = [
        input?.search ? ilike(courses.title, `%${input.search}%`) : null,
      ].filter(
        (clause): clause is Exclude<typeof clause, null> => clause !== null
      );

      const [total] = await db
        .select({ count: count() })
        .from(courses)
        .where(and(...whereClauses));
      const data = await db
        .select()
        .from(courses)
        .where(and(...whereClauses))
        .orderBy(desc(courses.createdAt), desc(courses.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const totalPages = Math.ceil(total.count / pageSize);
      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),
  getOne: protectedProcedure.input(getCourseSchema).query(async ({ input }) => {
    const existingCourse = await db.query.courses.findFirst({
      where: eq(courses.id, input.id),
      with: {
        mockTest: true,
        preparationClass: true,
        testBooking: true,
      },
    });
    if (!existingCourse) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
    }
    return existingCourse;
  }),
  update: protectedProcedure
    .input(coursesUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...payload } = input;
      const updatePayload = {
        ...payload,
        ...(payload.title && { slug: generateSlug(payload.title) }),
      };

      const [updatedCourse] = await db
        .update(courses)
        .set(updatePayload)
        .where(eq(courses.id, id))
        .returning();

      if (!updatedCourse) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }

      return updatedCourse;
    }),

  remove: protectedProcedure
    .input(getCourseSchema)
    .mutation(async ({ input }) => {
      const [removedCourse] = await db
        .delete(courses)
        .where(
          eq(courses.id, input.id)
          // and(eq(courses.id, input.id), eq(courses.authorId, ctx.auth.user.id))
        )
        .returning();

      if (!removedCourse) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }
      return removedCourse;
    }),
});
