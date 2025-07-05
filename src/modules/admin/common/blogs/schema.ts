import { z } from "zod";

export const getBlogsSchema = z
  .object({
    page: z.number().default(1),
    pageSize: z.number().min(1).max(100).default(5),
    search: z.string().nullish(),
  })
  .optional();
export const getBlogSchema = z.object({
  id: z.string().min(1, { message: "ID is required!" }),
});

export const blogInsertSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  content: z.string().min(1, { message: "Content is required!" }),
  image: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export const blogUpdateSchema = blogInsertSchema.extend({
  id: z.string().min(1, { message: "ID is required!" }),
});

// Types
export type BlogInsertSchema = z.infer<typeof blogInsertSchema>;
