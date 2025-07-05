import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import {
  coursePricingItems,
  courses,
  reservationSlots,
  reservations,
  user,
} from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import {
  getAdminReservationsSchema,
  getreservationsSchema,
  getreservationschema,
  reservationsInsertSchema,
  reservationsUpdateSchema,
} from "./schema";

const updateStatusSchema = z.object({
  id: z.string(),
  status: z.enum([
    "upcoming",
    "active",
    "completed",
    "processing",
    "cancelled",
  ]),
});

export const reservationsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(getreservationschema)
    .query(async ({ input, ctx }) => {
      const [existingreservation] = await db
        .select({
          ...getTableColumns(reservations),
          course: courses,
        })
        .from(reservations)
        .innerJoin(courses, eq(reservations.courseId, courses.id))
        .where(
          and(
            eq(reservations.id, input.id),
            eq(reservations.userId, ctx.auth.user.id)
          )
        );

      if (!existingreservation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "reservation not found",
        });
      }
      return existingreservation;
    }),
  getMany: protectedProcedure
    .input(getreservationsSchema)
    .query(async ({ input, ctx }) => {
      const page = input?.page ?? 1;
      const pageSize = input?.pageSize ?? 10;
      const status = input?.status;

      const whereClauses = [
        eq(reservations.userId, ctx.auth.user.id),
        status
          ? eq(
              reservations.status,
              status as unknown as
                | "upcoming"
                | "active"
                | "completed"
                | "processing"
                | "cancelled"
            )
          : null,
      ].filter(
        (clause): clause is Exclude<typeof clause, null> => clause !== null
      );

      const [total] = await db
        .select({ count: count() })
        .from(reservations)
        .where(and(...whereClauses));

      const data = await db
        .select({
          ...getTableColumns(reservations),
          course: courses,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        })
        .from(reservations)
        .innerJoin(courses, eq(reservations.courseId, courses.id))
        .innerJoin(user, eq(reservations.userId, user.id))
        .where(and(...whereClauses))
        .orderBy(desc(reservations.createdAt), desc(reservations.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const totalPages = Math.ceil(total.count / pageSize);
      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),

  getAllReservations: protectedProcedure
    .input(getAdminReservationsSchema)
    .query(async ({ input }) => {
      const page = input?.page ?? 1;
      const pageSize = input?.pageSize ?? 50;
      const status = input?.status;

      const whereClauses = [
        status
          ? eq(
              reservations.status,
              status as unknown as
                | "upcoming"
                | "active"
                | "completed"
                | "processing"
                | "cancelled"
            )
          : null,
      ].filter(
        (clause): clause is Exclude<typeof clause, null> => clause !== null
      );

      const [total] = await db
        .select({ count: count() })
        .from(reservations)
        .where(whereClauses.length > 0 ? and(...whereClauses) : undefined);

      const data = await db
        .select({
          ...getTableColumns(reservations),
          course: courses,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          planTitle: coursePricingItems.title,
        })
        .from(reservations)
        .innerJoin(courses, eq(reservations.courseId, courses.id))
        .innerJoin(user, eq(reservations.userId, user.id))
        .leftJoin(
          coursePricingItems,
          eq(reservations.planId, coursePricingItems.id)
        )
        .where(whereClauses.length > 0 ? and(...whereClauses) : undefined)
        .orderBy(desc(reservations.createdAt), desc(reservations.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const totalPages = Math.ceil(total.count / pageSize);
      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        slotId: z.string(),
        validFrom: z.string().optional(),
        validTill: z.string().optional(),
        planId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const slot = await db.query.reservationSlots.findFirst({
        where: (slot, { eq }) => eq(slot.id, input.slotId),
      });
      if (!slot)
        throw new TRPCError({ code: "NOT_FOUND", message: "Slot not found" });
      const existing = await db.query.reservations.findFirst({
        where: (reservation, { eq, and }) =>
          and(
            eq(reservation.userId, ctx.auth.user.id),
            eq(reservation.slotId, input.slotId),
            eq(reservation.type, slot.type),
            eq(reservation.courseId, slot.courseId)
          ),
      });
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message:
            "You have already booked this slot for the same course and test type.",
        });
      }
      const [createdreservation] = await db
        .insert(reservations)
        .values({
          slotId: input.slotId,
          courseId: slot.courseId,
          userId: ctx.auth.user.id,
          type: slot.type,
          validFrom: input.validFrom ? new Date(input.validFrom) : new Date(),
          validTill: input.validTill ? new Date(input.validTill) : new Date(),
          planId: input.planId,
        })
        .returning();
      return createdreservation;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        slotId: z.string().optional(),
        validFrom: z.string().optional(),
        validTill: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;
      const [updatedreservation] = await db
        .update(reservations)
        .set({
          slotId: updateData.slotId,
          validFrom: updateData.validFrom
            ? new Date(updateData.validFrom)
            : undefined,
          validTill: updateData.validTill
            ? new Date(updateData.validTill)
            : undefined,
        })
        .where(
          and(
            eq(reservations.id, id),
            eq(reservations.userId, ctx.auth.user.id)
          )
        )
        .returning();
      if (!updatedreservation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "reservation not found",
        });
      }
      return updatedreservation;
    }),

  updateStatus: protectedProcedure
    .input(updateStatusSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, status } = input;

      const [updatedReservation] = await db
        .update(reservations)
        .set({
          status,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(reservations.id, id),
            eq(reservations.userId, ctx.auth.user.id)
          )
        )
        .returning();

      if (!updatedReservation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reservation not found",
        });
      }
      return updatedReservation;
    }),

  remove: protectedProcedure
    .input(getreservationschema)
    .mutation(async ({ input, ctx }) => {
      const [removedReservation] = await db
        .delete(reservations)
        .where(
          and(
            eq(reservations.id, input.id),
            eq(reservations.userId, ctx.auth.user.id)
          )
        )
        .returning();

      if (!removedReservation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reservation not found",
        });
      }
      return removedReservation;
    }),

  getBySlot: protectedProcedure
    .input(z.object({ slotId: z.string() }))
    .query(async ({ input }) => {
      const reservationsForSlot = await db
        .select({
          ...getTableColumns(reservations),
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        })
        .from(reservations)
        .innerJoin(user, eq(reservations.userId, user.id))
        .where(eq(reservations.slotId, input.slotId));
      return reservationsForSlot;
    }),
});

export const reservationSlotsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        type: z.enum(["mock_test", "preparation_class", "test_booking"]),
        date: z.string(),
        time: z.string(),
        seats: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const [created] = await db
        .insert(reservationSlots)
        .values({
          courseId: input.courseId,
          type: input.type,
          date: input.date,
          time: input.time,
          seats: input.seats,
        })
        .returning();
      return created;
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const slot = await db
        .select({
          ...getTableColumns(reservationSlots),
          course: courses,
        })
        .from(reservationSlots)
        .innerJoin(courses, eq(reservationSlots.courseId, courses.id))
        .where(eq(reservationSlots.id, input.id));
      if (!slot.length)
        throw new TRPCError({ code: "NOT_FOUND", message: "Slot not found" });
      // Get booked/available seats
      const [{ bookedSeats = 0 } = {}] = await db
        .select({ bookedSeats: sql`COUNT(*)` })
        .from(reservations)
        .where(eq(reservations.slotId, input.id));
      return {
        ...slot[0],
        bookedSeats: Number(bookedSeats),
        availableSeats: slot[0].seats - Number(bookedSeats),
      };
    }),
  getAll: protectedProcedure.query(async () => {
    const slots = await db
      .select({
        ...getTableColumns(reservationSlots),
        course: courses,
      })
      .from(reservationSlots)
      .innerJoin(courses, eq(reservationSlots.courseId, courses.id));
    const slotWithBooked = await Promise.all(
      slots.map(async (slot) => {
        const [{ bookedSeats = 0 } = {}] = await db
          .select({ bookedSeats: sql`COUNT(*)` })
          .from(reservations)
          .where(eq(reservations.slotId, slot.id));
        return {
          ...slot,
          bookedSeats: Number(bookedSeats),
          availableSeats: slot.seats - Number(bookedSeats),
        };
      })
    );
    return slotWithBooked;
  }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const [deleted] = await db
        .delete(reservationSlots)
        .where(eq(reservationSlots.id, input.id))
        .returning();
      if (!deleted)
        throw new TRPCError({ code: "NOT_FOUND", message: "Slot not found" });
      return deleted;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        courseId: z.string(),
        type: z.enum(["mock_test", "preparation_class", "test_booking"]),
        date: z.string(),
        time: z.string(),
        seats: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const [updated] = await db
        .update(reservationSlots)
        .set(data)
        .where(eq(reservationSlots.id, id))
        .returning();
      if (!updated)
        throw new TRPCError({ code: "NOT_FOUND", message: "Slot not found" });
      return updated;
    }),
  getByCourseAndType: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        type: z.enum(["mock_test", "preparation_class", "test_booking"]),
      })
    )
    .query(async ({ input }) => {
      const slots = await db
        .select({
          ...getTableColumns(reservationSlots),
          course: courses,
        })
        .from(reservationSlots)
        .innerJoin(courses, eq(reservationSlots.courseId, courses.id))
        .where(
          and(
            eq(reservationSlots.courseId, input.courseId),
            eq(reservationSlots.type, input.type)
          )
        );
      // Filter out fully booked slots
      const slotsWithAvailable = await Promise.all(
        slots.map(async (slot) => {
          const [booked] = await db
            .select({ bookedSeats: sql`COUNT(*)` })
            .from(reservations)
            .where(eq(reservations.slotId, slot.id));
          const bookedSeats = Number(booked?.bookedSeats || 0);
          return {
            ...slot,
            bookedSeats,
            availableSeats: slot.seats - bookedSeats,
          };
        })
      );
      return slotsWithAvailable.filter((slot) => slot.availableSeats > 0);
    }),
});
