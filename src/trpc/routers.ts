import { testimonialsRouter } from "@/modules/admin/common/testimonials/procedures";
import { createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  testimonials: testimonialsRouter,
});
