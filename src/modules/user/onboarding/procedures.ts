import { db } from "@/db";
import { profile } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { onboardingSchema } from "./schema";

export const onboardingRouter = createTRPCRouter({
  createPersonalInfo: protectedProcedure
    .input(onboardingSchema)
    .mutation(async ({ input, ctx }) => {
      await db.insert(profile).values({
        ...input,
        dob: input.dob instanceof Date ? input.dob.toISOString() : input.dob,
        userId: ctx.auth.user.id,
      });
    }),
});
