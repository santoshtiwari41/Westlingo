import { z } from "zod";

const titleSchema = z.string().min(1, { message: "Title is required!" });
const descriptionSchema = z
  .string()
  .min(1, { message: "Description is required!" });

// GET schemas
export const getCourseSchema = z.object({ id: z.string() });

export const getCoursesSchema = z
  .object({
    page: z.number().default(1),
    pageSize: z.number().min(1).max(100).default(5),
    search: z.string().nullish(),
  })
  .optional();

// Course insert/update
export const newCourseFormSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  content: descriptionSchema,
  isActive: z.boolean(),

  files: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .max(1, "Please select up to 1 files")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
});
export const coursesInsertSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  isActive: z.boolean(),

  url: z.string(),
  appId: z.string(),
  config: z.any(),
});

export const coursesUpdateSchema = coursesInsertSchema.partial().extend({
  id: z.string().min(1, { message: "ID is required!" }),
});

export const editCourseFormSchema = z.object({
  id: z.string().min(1, { message: "ID is required!" }),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  isActive: z.boolean(),
  files: z
    .array(z.custom<File>())
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    })
    .optional(),
});
export type NewCourseFormSchema = z.infer<typeof newCourseFormSchema>;
export type EditCourseFormSchema = z.infer<typeof editCourseFormSchema>;
export type UpdateCourseFormSchema = z.infer<typeof coursesUpdateSchema>;

// Preparation Class
// export const coursePreparationInsertSchema = baseCourseItemSchema;
// export const coursePreparationUpdateSchema =
//   coursePreparationInsertSchema.extend({
//     id: idSchema,
//   });
// export type CoursePreparationInsertSchema = z.infer<
//   typeof coursePreparationInsertSchema
// >;

// // Mock Test
// export const courseMockTestInsertSchema = baseCourseItemSchema.extend({
//   // mockTestId: z.string(),
// });
// export const courseMockTestUpdateSchema = courseMockTestInsertSchema.extend({
//   id: idSchema,
// });
// export type CourseMockTestInsertSchema = z.infer<
//   typeof courseMockTestInsertSchema
// >;

// // Test Bookings
// export const courseTestBookingInsertSchema = baseCourseItemSchema;
// export const courseTestBookingUpdateSchema =
//   courseTestBookingInsertSchema.extend({
//     id: idSchema,
//   });
// export type CourseTestBookingInsertSchema = z.infer<
//   typeof courseTestBookingInsertSchema
// >;
