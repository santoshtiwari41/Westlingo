import * as z from "zod";

export const getId = z.object({ id: z.string() });

export const onboardingSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be valid"),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
