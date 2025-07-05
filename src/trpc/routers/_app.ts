import { z } from "zod";

import { blogRouter } from "@/modules/admin/common/blogs/procedures";
import { carouselsRouter } from "@/modules/admin/common/carousels/procedures";
import { faqsRouter } from "@/modules/admin/common/faqs/procedures";
import { pricingsRouter } from "@/modules/admin/common/pricings/procedures";
import { courseTypePricingRouter } from "@/modules/admin/common/pricings/procedures";
import { testimonialsRouter } from "@/modules/admin/common/testimonials/procedures";
import { writingPricingRouter } from "@/modules/admin/common/writing/procedures";
import { bookingRouter } from "@/modules/admin/courses/modules/bookings/procedures";
import { mockTestRouter } from "@/modules/admin/courses/modules/mocks/procedures";
import { preparationRouter } from "@/modules/admin/courses/modules/preparation/procedures";
import { coursesRouter } from "@/modules/admin/courses/procedures";
import { reservationsRouter } from "@/modules/admin/reservations/procedures";
import { reservationSlotsRouter } from "@/modules/admin/reservations/procedures";
import { studentsRouter } from "@/modules/admin/students/procedures";
import { publicRouter } from "@/modules/public/procedures";
import { publicCoursesRouter } from "@/modules/user/home/procedures";
import { userRouter } from "@/modules/user/profile/procedures";

import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      // await new Promise(res => setTimeout(res, 2000))
      // throw new TRPCError({ code: "BAD_REQUEST" })
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  users: userRouter,

  publics: publicRouter,

  blogs: blogRouter,

  reservations: reservationsRouter,
  reservationSlots: reservationSlotsRouter,
  public: publicCoursesRouter, // TODO: REMOVE

  faqs: faqsRouter,
  pricings: pricingsRouter,
  carousels: carouselsRouter,

  courses: coursesRouter,

  preparations: preparationRouter,
  bookings: bookingRouter,
  mockTests: mockTestRouter,

  students: studentsRouter,

  testimonials: testimonialsRouter,
  courseTypePricing: courseTypePricingRouter,
  writingPricing: writingPricingRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
