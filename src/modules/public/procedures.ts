import { TRPCError } from "@trpc/server";
import { and, count, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  blogs,
  courseCarouselItems,
  coursePricingItems,
  courses,
  paymentQr,
} from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { getManySchema, getOneSchema } from "./schema";

export const publicRouter = createTRPCRouter({
  getCourses: baseProcedure.query(async () => {
    const data = await db.query.courses.findMany({
      columns: {
        id: true,
        slug: true,
        title: true,
        description: true,
        url: true,
      },
      orderBy: desc(courses.updatedAt),
    });
    return data;
  }),
  getCourse: baseProcedure.input(getOneSchema).query(async ({ input }) => {
    const existingCourse = await db.query.courses.findFirst({
      where: eq(courses.slug, input.slug),
    });
    if (!existingCourse) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
    }
    return existingCourse;
  }),
  getCoursePreparationClass: baseProcedure
    .input(getOneSchema)
    .query(async ({ input }) => {
      const existingCourse = await db.query.courses.findFirst({
        with: {
          preparationClass: {
            with: {
              carousel: {
                with: {
                  items: {
                    where: eq(courseCarouselItems.isActive, true),
                  },
                },
              },
              pricing: {
                with: {
                  items: {
                    where: eq(coursePricingItems.isActive, true),
                  },
                },
              },
              faq: {
                with: {
                  items: true,
                },
              },
              testimonials: true,
            },
          },
        },
        where: and(eq(courses.isActive, true), eq(courses.slug, input.slug)),
      });
      if (!existingCourse) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }
      return existingCourse;
    }),
  getCourseTestBooking: baseProcedure
    .input(getOneSchema)
    .query(async ({ input }) => {
      const existingCourse = await db.query.courses.findFirst({
        with: {
          testBooking: {
            with: {
              carousel: {
                with: {
                  items: {
                    where: eq(courseCarouselItems.isActive, true),
                  },
                },
              },
              pricing: {
                with: {
                  items: {
                    where: eq(coursePricingItems.isActive, true),
                  },
                },
              },
              faq: {
                with: {
                  items: true,
                },
              },
              testimonials: true,
            },
          },
        },
        where: and(eq(courses.isActive, true), eq(courses.slug, input.slug)),
      });
      if (!existingCourse) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }
      return existingCourse;
    }),
  getCourseMockTest: baseProcedure
    .input(getOneSchema)
    .query(async ({ input }) => {
      const existingCourse = await db.query.courses.findFirst({
        with: {
          mockTest: {
            with: {
              carousel: {
                with: {
                  items: {
                    where: eq(courseCarouselItems.isActive, true),
                  },
                },
              },
              pricing: {
                with: {
                  items: {
                    where: eq(coursePricingItems.isActive, true),
                  },
                },
              },
              faq: {
                with: {
                  items: true,
                },
              },
              testimonials: true,
            },
          },
        },
        where: and(eq(courses.isActive, true), eq(courses.slug, input.slug)),
      });
      if (!existingCourse) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }
      return existingCourse;
    }),
  getPaymentQr: baseProcedure.query(async () => {
    const [qr] = await db.select().from(paymentQr).limit(1);
    return qr || {};
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
