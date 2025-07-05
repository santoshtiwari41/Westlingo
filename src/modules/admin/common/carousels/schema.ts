import { z } from "zod";

// Reusable schema parts
const idSchema = z.string().min(1, { message: "ID is required!" });

const baseSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
});

// Individual schemas
export const getCarousel = z.object({
  id: idSchema,
});

export const carouselsInsertSchema = baseSchema.extend({
  isActive: z.boolean().optional(),
  mockTestId: z.string().optional(),
  preparationClassId: z.string().optional(),
  testBookingId: z.string().optional(),
});

export const carouselsUpdateSchema = carouselsInsertSchema.extend({
  id: idSchema,
});

export const carouselItemInsertSchema = baseSchema.extend({
  carouselId: idSchema,
  appId: idSchema,
  imageUrl: z.string().url({ message: "Image URL must be a valid URL!" }),
  isActive: z.boolean().optional(),
  order: z
    .number()
    .int()
    .min(0, { message: "Order must be a non-negative integer!" }),
});

export const carouselItemUpdateSchema = carouselItemInsertSchema.extend({
  id: idSchema,
});

// Types
export type CarouselsInsertSchema = z.infer<typeof carouselsInsertSchema>;
export type CarouselItemInsertSchema = z.infer<typeof carouselItemInsertSchema>;
