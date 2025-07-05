import { z } from "zod";

// Reusable schema parts
const idSchema = z.string().min(1, { message: "ID is required!" });

const baseSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
});

// Individual schemas
export const getPricing = z.object({
  id: idSchema,
});

export const pricingsInsertSchema = baseSchema.extend({
  isActive: z.boolean().optional(),
  mockTestId: z.string().optional(),
  preparationClassId: z.string().optional(),
  testBookingId: z.string().optional(),
});

export const pricingsUpdateSchema = pricingsInsertSchema.extend({
  id: idSchema,
});

export const pricingItemInsertSchema = baseSchema.extend({
  pricingId: idSchema,
  price: z.coerce.number(),
  isActive: z.boolean().optional(),
  features: z.string().array(),
});

export const pricingItemUpdateSchema = pricingItemInsertSchema.extend({
  id: idSchema,
});

// Types
export type PricingsInsertSchema = z.infer<typeof pricingsInsertSchema>;
export type PricingItemInsertSchema = z.infer<typeof pricingItemInsertSchema>;
