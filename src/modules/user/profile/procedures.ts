import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { documents, education, profile, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import {
  documentInfoSchema,
  educationSchema,
  getId,
  personalInfoSchema2,
} from "./schema";

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const result = await db.query.user.findFirst({
      where: eq(user.id, ctx.auth.user.id),
      with: {
        profile: true,
        education: true,
        documents: true,
        // experience: true,
        // skills: true
      },
    });
    if (!result) {
      throw new TRPCError({ code: "NOT_FOUND", message: "" });
    }
    return result;
  }),

  createPersonalInfo: protectedProcedure
    .input(personalInfoSchema2)
    .mutation(async ({ input, ctx }) => {
      await db
        .insert(profile)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .onConflictDoUpdate({
          target: [profile.userId],
          set: input,
        });
    }),
  createEducationalInfo: protectedProcedure
    .input(educationSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.user.id;

      await Promise.all(
        input.education.map((edu) =>
          db
            .insert(education)
            .values({
              userId,
              degree: edu.degree,
              institution: edu.institution,
              year: edu.year,
              gpa: edu.gpa,
              description: edu.description,
            })
            .onConflictDoUpdate({
              target: [education.userId, education.degree],
              set: {
                institution: edu.institution,
                year: edu.year,
                gpa: edu.gpa,
                description: edu.description,
                updatedAt: new Date(),
              },
            })
        )
      );
    }),
  removeEducationalInfo: protectedProcedure
    .input(getId)
    .mutation(async ({ input, ctx }) => {
      await db
        .delete(education)
        .where(
          and(
            eq(education.id, input.id),
            eq(education.userId, ctx.auth.user.id)
          )
        );
    }),

  createDocumentInfo: protectedProcedure
    .input(documentInfoSchema)
    .mutation(async ({ input, ctx }) => {
      await db.insert(documents).values({
        ...input,
        userId: ctx.auth.user.id,
      });
    }),
  removeDocumentInfo: protectedProcedure
    .input(getId)
    .mutation(async ({ input, ctx }) => {
      await db
        .delete(documents)
        .where(
          and(
            eq(documents.userId, ctx.auth.user.id),
            eq(documents.id, input.id!)
          )
        );
    }),
});
