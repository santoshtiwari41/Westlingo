import { z } from "zod";

export const testimonialsInsertSchema = z.object({
  name: z.string().min(1),
  image: z.union([z.string().url(), z.literal("")]).optional(),
  quote: z.string().min(1),
  isActive: z.boolean().optional(),
  bio: z.string().optional(),
});

export const testimonialsUpdateSchema = testimonialsInsertSchema.extend({
  id: z.string(),
});

export const getTestimonial = z.object({
  id: z.string(),
});
