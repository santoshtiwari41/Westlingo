import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { courses, education, profile, reservations, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { getManySchema, getOneSchema } from "./schema";

const updateProfileSchema = z.object({
  studentId: z.string(),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  dob: z.string().optional(),
  permanentAddress: z.string().optional(),
  temporaryAddress: z.string().optional(),
});

const updateReservationSchema = z.object({
  reservationId: z.string(),
  status: z.enum([
    "upcoming",
    "active",
    "completed",
    "processing",
    "cancelled",
  ]),
});

const updateEducationSchema = z.object({
  educationId: z.string(),
  degree: z.string().optional(),
  institution: z.string().optional(),
  year: z.string().optional(),
  gpa: z.string().optional(),
  description: z.string().optional(),
});

export const studentsRouter = createTRPCRouter({
  getMany: protectedProcedure.input(getManySchema).query(async ({ input }) => {
    const page = input?.page ?? 1;
    const pageSize = input?.pageSize ?? 10;

    const whereClauses = [
      input?.search ? ilike(user.name, `%${input.search}%`) : null,
    ].filter(
      (clause): clause is Exclude<typeof clause, null> => clause !== null
    );

    const [total] = await db
      .select({ count: count() })
      .from(user)
      .where(and(...whereClauses));
    const data = await db
      .select()
      .from(user)
      .leftJoin(profile, eq(user.id, profile.userId))
      .where(and(...whereClauses))
      .orderBy(desc(user.createdAt), desc(user.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalPages = Math.ceil(total.count / pageSize);
    return {
      items: data,
      total: total.count,
      totalPages,
    };
  }),

  getOne: protectedProcedure.input(getOneSchema).query(async ({ input }) => {
    const result = await db.query.user.findFirst({
      where: eq(user.id, input.id),
      with: {
        profile: true,
        education: true,
        documents: true,
      },
    });
    if (!result) {
      throw new TRPCError({ code: "NOT_FOUND", message: "" });
    }
    return result;
  }),

  getStudentReservations: protectedProcedure
    .input(getOneSchema)
    .query(async ({ input }) => {
      const data = await db
        .select({
          id: reservations.id,
          validFrom: reservations.validFrom,
          validTill: reservations.validTill,
          isVerified: reservations.isVerified,
          status: reservations.status,
          type: reservations.type,
          userId: reservations.userId,
          courseId: reservations.courseId,
          createdAt: reservations.createdAt,
          updatedAt: reservations.updatedAt,
          course: {
            id: courses.id,
            title: courses.title,
            description: courses.description,
          },
        })
        .from(reservations)
        .innerJoin(courses, eq(reservations.courseId, courses.id))
        .where(eq(reservations.userId, input.id))
        .orderBy(desc(reservations.createdAt), desc(reservations.id));

      return data;
    }),

  getStudentTransactions: protectedProcedure
    .input(getOneSchema)
    .query(async ({ input }) => {
      const data = await db
        .select()
        .from(reservations)
        .where(eq(reservations.userId, input.id))
        .orderBy(desc(reservations.createdAt), desc(reservations.id));

      return data;
    }),

  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ input }) => {
      const { studentId, ...updateData } = input;

      const existingProfile = await db.query.profile.findFirst({
        where: eq(profile.userId, studentId),
      });

      if (existingProfile) {
        const [updatedProfile] = await db
          .update(profile)
          .set({
            ...updateData,
            updatedAt: new Date(),
          })
          .where(eq(profile.userId, studentId))
          .returning();
        return updatedProfile;
      } else {
        if (!updateData.dob) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Date of birth is required when creating a new profile",
          });
        }

        const [newProfile] = await db
          .insert(profile)
          .values({
            userId: studentId,
            dob: updateData.dob,
            ...updateData,
          })
          .returning();
        return newProfile;
      }
    }),

  updateReservationStatus: protectedProcedure
    .input(updateReservationSchema)
    .mutation(async ({ input }) => {
      const { reservationId, status } = input;

      const [updatedReservation] = await db
        .update(reservations)
        .set({
          status,
          updatedAt: new Date(),
        })
        .where(eq(reservations.id, reservationId))
        .returning();

      if (!updatedReservation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reservation not found",
        });
      }
      return updatedReservation;
    }),

  updateEducation: protectedProcedure
    .input(updateEducationSchema)
    .mutation(async ({ input }) => {
      const { educationId, ...updateData } = input;

      const [updatedEducation] = await db
        .update(education)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(education.id, educationId))
        .returning();

      if (!updatedEducation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Education record not found",
        });
      }
      return updatedEducation;
    }),

  deleteEducation: protectedProcedure
    .input(z.object({ educationId: z.string() }))
    .mutation(async ({ input }) => {
      const [deletedEducation] = await db
        .delete(education)
        .where(eq(education.id, input.educationId))
        .returning();

      if (!deletedEducation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Education record not found",
        });
      }
      return deletedEducation;
    }),

  addEducation: protectedProcedure
    .input(
      z.object({
        studentId: z.string(),
        degree: z.string(),
        institution: z.string(),
        year: z.string(),
        gpa: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { studentId, ...educationData } = input;

      const [newEducation] = await db
        .insert(education)
        .values({
          userId: studentId,
          ...educationData,
        })
        .returning();

      return newEducation;
    }),
});
