import * as z from "zod";

export const getId = z.object({ id: z.string() });

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be valid"),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export const personalInfoSchema2 = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be valid"),
  dob: z.string(),
  permanentAddress: z.string().optional(),
  temporaryAddress: z.string().optional(),
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;

const educationItemSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  year: z.string().min(1, "Year is required"),
  gpa: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const num = Number.parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 4;
    }, "GPA must be between 0 and 4"),
  description: z.string().optional(),
});
export const educationSchema = z.object({
  education: z
    .array(educationItemSchema)
    .min(1, "At least one education entry is required"),
});
export type EducationSchema = z.infer<typeof educationSchema>;

export const documentInfoSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  type: z.string(),
  size: z.string(),
  appId: z.string(),
  url: z.string(),
});

export type DocumentInfoSchema = z.infer<typeof documentInfoSchema>;
