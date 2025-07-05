import { z } from "zod";

import { Reservationstatus } from "./types";

export const getreservationschema = z.object({
  id: z.string(),
});
export const getreservationsSchema = z
  .object({
    page: z.number().default(1),
    pageSize: z.number().min(1).max(10).default(10),
    status: z
      .enum([
        Reservationstatus.Upcoming,
        Reservationstatus.Active,
        Reservationstatus.Cancelled,
        Reservationstatus.Completed,
        Reservationstatus.Processing,
      ])
      .nullish(),
  })
  .optional();

export const getAdminReservationsSchema = z
  .object({
    page: z.number().default(1),
    pageSize: z.number().min(1).max(100).default(50),
    status: z
      .enum([
        Reservationstatus.Upcoming,
        Reservationstatus.Active,
        Reservationstatus.Cancelled,
        Reservationstatus.Completed,
        Reservationstatus.Processing,
      ])
      .nullish(),
  })
  .optional();

export const reservationsInsertSchema = z.object({
  slotId: z.string().min(1, { message: "Slot is required!" }),
  validFrom: z.string().optional(),
  validTill: z.string().optional(),
});

export const reservationsPublicInsertSchema = reservationsInsertSchema.extend({
  userInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
});

export const reservationsUpdateSchema = z.object({
  id: z.string(),
  slotId: z.string().optional(),
  validFrom: z.string().optional(),
  validTill: z.string().optional(),
});
export type ReservationsInsertSchema = z.infer<typeof reservationsInsertSchema>;
export type ReservationsPublicInsertSchema = z.infer<
  typeof reservationsPublicInsertSchema
>;
