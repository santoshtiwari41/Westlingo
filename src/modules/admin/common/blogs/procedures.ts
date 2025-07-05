import { TRPCError } from "@trpc/server";
import { and, count, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

import { generateSlug } from "../../courses/procedures";
import {
  blogInsertSchema,
  blogUpdateSchema,
  getBlogSchema,
  getBlogsSchema,
} from "./schema";

export const blogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(blogInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdBlog] = await db
        .insert(blogs)
        .values({
          ...input,
          slug: generateSlug(input.title),
          authorId: ctx.auth.user.id,
        })
        .returning();
      return createdBlog;
    }),
  getMany: baseProcedure.input(getBlogsSchema).query(async ({ input }) => {
    const page = input?.page ?? 1;
    const pageSize = input?.pageSize ?? 10;

    const [total] = await db.select({ count: count() }).from(blogs);
    // .where(eq(blogs.isActive, true));
    const data = await db
      .select()
      .from(blogs)
      // .where(eq(blogs.isActive, true))
      .orderBy(desc(blogs.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalPages = Math.ceil(total.count / pageSize);
    return {
      items: data,
      total: total.count,
      totalPages,
    };
  }),
  getOne: baseProcedure.input(getBlogSchema).query(async ({ input }) => {
    const existingBlog = await db.query.blogs.findFirst({
      where: and(eq(blogs.id, input.id), eq(blogs.isActive, true)),
    });
    if (!existingBlog) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Blog not found" });
    }
    return existingBlog;
  }),
  update: protectedProcedure
    .input(blogUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...payload } = input;
      const updatePayload = {
        ...payload,
        ...(payload.title && { slug: generateSlug(payload.title) }),
      };

      const [updatedBlog] = await db
        .update(blogs)
        .set(updatePayload)
        .where(eq(blogs.id, id))
        .returning();

      if (!updatedBlog) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Blog not found" });
      }

      return updatedBlog;
    }),

  remove: protectedProcedure
    .input(getBlogSchema)
    .mutation(async ({ input }) => {
      const [removedBlog] = await db
        .delete(blogs)
        .where(
          eq(blogs.id, input.id)
          // and(eq(blogs.id, input.id), eq(blogs.isActive, true))
        )
        .returning();

      if (!removedBlog) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Blog not found" });
      }
      return removedBlog;
    }),
});
