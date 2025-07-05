import { TRPCError } from "@trpc/server";
import { and, count, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { blogs, courses } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { getManySchema, getOneSchema } from "./schema";

export const publicCoursesRouter = createTRPCRouter({
  getCourse: baseProcedure.input(getOneSchema).query(async ({ input }) => {
    const [existing] = await db
      .select()
      .from(courses)
      .where(and(eq(courses.slug, input.slug)));

    if (!existing) {
      throw new TRPCError({ code: "NOT_FOUND", message: "NOT_FOUND" });
    }
    return existing;
  }),

  getCourses: baseProcedure.input(getManySchema).query(async ({ input }) => {
    const page = input?.page ?? 1;
    const pageSize = input?.pageSize ?? 10;

    const [total] = await db
      .select({ count: count() })
      .from(courses)
      .where(eq(courses.isActive, true));
    const data = await db
      .select()
      .from(courses)
      .where(eq(courses.isActive, true))
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
  getBlogs: baseProcedure.input(getManySchema).query(async ({ input }) => {
    const page = input?.page ?? 1;
    const pageSize = input?.pageSize ?? 10;

    const [total] = await db
      .select({ count: count() })
      .from(blogs)
      .where(eq(blogs.isActive, true));
    const data = await db
      .select()
      .from(blogs)
      .where(eq(blogs.isActive, true))
      .orderBy(desc(blogs.createdAt), desc(blogs.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalPages = Math.ceil(total.count / pageSize);
    return {
      items: data,
      total: total.count,
      totalPages,
    };
  }),
  getBlog: baseProcedure.input(getOneSchema).query(async ({ input }) => {
    const [existing] = await db
      .select()
      .from(blogs)
      .where(and(eq(blogs.slug, input.slug)));

    if (!existing) {
      throw new TRPCError({ code: "NOT_FOUND", message: "NOT_FOUND" });
    }
    return existing;
  }),
});
