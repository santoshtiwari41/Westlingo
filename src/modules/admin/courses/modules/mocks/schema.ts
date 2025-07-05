import { z } from "zod";

const idSchema = z.string().min(1, { message: "ID is required!" });

const baseSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  courseId: z.string().min(1, { message: "Course is required!" }),
  content: z.string().optional(),
  isActive: z.boolean().optional(),
});

// GET schemas
export const getCourseSchema = z.object({ id: z.string() });

// MockTest Class
export const courseMockTestInsertSchema = baseSchema;
export const courseMockTestUpdateSchema = courseMockTestInsertSchema.extend({
  id: idSchema,
});
export type CourseMockTestInsertSchema = z.infer<
  typeof courseMockTestInsertSchema
>;
