import { z } from "zod";

// Reusable schema parts
const idSchema = z.string().min(1, { message: "ID is required!" });

const baseSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
});

// Individual schemas
export const getFaq = z.object({
  id: idSchema,
});

export const faqsInsertSchema = baseSchema.extend({
  isActive: z.boolean().optional(),
  mockTestId: z.string().optional(),
  preparationClassId: z.string().optional(),
  testBookingId: z.string().optional(),
});

export const faqsUpdateSchema = faqsInsertSchema.extend({
  id: idSchema,
});

export const faqItemInsertSchema = baseSchema.extend({
  faqId: idSchema,
});

export const faqItemUpdateSchema = faqItemInsertSchema.extend({
  id: idSchema,
});

// Types
export type FaqsInsertSchema = z.infer<typeof faqsInsertSchema>;
export type FaqItemInsertSchema = z.infer<typeof faqItemInsertSchema>;
