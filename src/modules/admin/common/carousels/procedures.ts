import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { courseCarouselItems, courseCarousels } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

import {
  carouselItemInsertSchema,
  carouselItemUpdateSchema,
  carouselsInsertSchema,
  carouselsUpdateSchema,
  getCarousel,
} from "./schema";

export interface CloudinaryImageResponse {
  public_id: string;
  secure_url: string;
  url: string;
}

export const carouselsRouter = createTRPCRouter({
  getOne: protectedProcedure.input(getCarousel).query(async ({ input }) => {
    const result = await db.query.courseCarousels.findFirst({
      where: eq(courseCarousels.id, input.id),
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
            name: true,
            type: true,
            size: true,
            appId: true,
            url: true,
            order: true,
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
  createCarousel: protectedProcedure
    .input(carouselsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdCarousel] = await db
        .insert(courseCarousels)
        .values({
          ...input,
          authorId: ctx.auth.user.id,
        })
        .returning();
      return createdCarousel;
    }),
  createCarouselItem: protectedProcedure
    .input(carouselItemInsertSchema)
    .mutation(async ({ input }) => {
      const [createdCarouselItem] = await db
        .insert(courseCarouselItems)
        .values({
          ...input,
          name: "",
          type: "",
          size: 45,
          url: "",
          // authorId: ctx.auth.user.id,
        })
        .returning();
      return createdCarouselItem;
    }),
  updateCarousel: protectedProcedure
    .input(carouselsUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...payload } = input;
      const [updatedCarousel] = await db
        .update(courseCarousels)
        .set({
          ...payload,
          authorId: ctx.auth.user.id,
        })
        .where(eq(courseCarousels.id, id))
        .returning();
      return updatedCarousel;
    }),
  updateCarouselItem: protectedProcedure
    .input(carouselItemUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...payload } = input;
      const [updatedCarouselItem] = await db
        .update(courseCarouselItems)
        .set({
          ...payload,
          // authorId: ctx.auth.user.id,
        })
        .where(eq(courseCarouselItems.id, id))
        .returning();
      return updatedCarouselItem;
    }),
  removeCarouselItem: protectedProcedure
    .input(getCarousel)
    .mutation(async ({ input }) => {
      const [removedCarouselItem] = await db
        .delete(courseCarouselItems)
        .where(eq(courseCarouselItems.id, input.id))
        .returning();

      if (!removedCarouselItem) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }
      return removedCarouselItem;
    }),
  getByCourseId: baseProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input }) => {
      const result = await db.query.courseCarousels.findFirst({
        where: eq(courseCarousels.courseId, input.courseId),
        with: {
          items: true,
        },
      });
      return result || null;
    }),
});
