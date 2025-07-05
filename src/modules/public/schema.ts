import { z } from "zod";

export const getOneSchema = z.object({
  slug: z.string(),
});
export const getManySchema = z
  .object({
    page: z.number().default(1),
    pageSize: z.number().min(1).max(100).default(1),
    search: z.string().nullish(),
  })
  .optional();
