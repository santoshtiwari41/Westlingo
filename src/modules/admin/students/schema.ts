import { z } from "zod";

export const getManySchema = z
  .object({
    page: z.number().default(1),
    pageSize: z.number().min(1).max(100).default(5),
    search: z.string().nullish(),
  })
  .optional();
export const getOneSchema = z.object({ id: z.string() });
