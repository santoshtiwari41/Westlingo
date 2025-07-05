import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type GetStudents = inferRouterOutputs<AppRouter>["students"]["getMany"];
export type GetStudent = inferRouterOutputs<AppRouter>["students"]["getOne"];
