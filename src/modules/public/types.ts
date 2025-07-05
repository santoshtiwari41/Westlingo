import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type GetCourses = inferRouterOutputs<AppRouter>["publics"]["getCourses"];
export type GetCourse = inferRouterOutputs<AppRouter>["publics"]["getCourse"];
