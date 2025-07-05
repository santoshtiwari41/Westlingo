import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { testimonials } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

import {
  getTestimonial,
  testimonialsInsertSchema,
  testimonialsUpdateSchema,
} from "./schema";

export const testimonialsRouter = createTRPCRouter({
  getOne: protectedProcedure.input(getTestimonial).query(async ({ input }) => {
    const result = await db.query.testimonials.findFirst({
      where: eq(testimonials.id, input.id),
    });
    if (!result)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Testimonial not found",
      });
    return result;
  }),
  getMany: protectedProcedure.query(async () => {
    return db.query.testimonials.findMany({
      orderBy: desc(testimonials.createdAt),
    });
  }),
  create: protectedProcedure
    .input(testimonialsInsertSchema)
    .mutation(async ({ input }) => {
      const [inserted] = await db
        .insert(testimonials)
        .values({ ...input })
        .returning();
      return inserted;
    }),
  update: protectedProcedure
    .input(testimonialsUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...payload } = input;
      const [updated] = await db
        .update(testimonials)
        .set(payload)
        .where(eq(testimonials.id, id))
        .returning();
      if (!updated)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Testimonial not found",
        });
      return updated;
    }),
  delete: protectedProcedure
    .input(getTestimonial)
    .mutation(async ({ input }) => {
      const [deleted] = await db
        .delete(testimonials)
        .where(eq(testimonials.id, input.id))
        .returning();
      if (!deleted)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Testimonial not found",
        });
      return deleted;
    }),
  getActive: baseProcedure.query(async () => {
    return db.query.testimonials.findMany({
      columns: {
        id: true,
        name: true,
        bio: true,
        image: true,
        quote: true,
      },
      where: eq(testimonials.isActive, true),
      orderBy: desc(testimonials.createdAt),
    });
  }),
});
