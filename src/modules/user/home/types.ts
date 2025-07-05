import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type CourseGetOne = inferRouterOutputs<AppRouter>["courses"]["getOne"];
export type CourseGetMany =
  inferRouterOutputs<AppRouter>["courses"]["getMany"]["items"];
