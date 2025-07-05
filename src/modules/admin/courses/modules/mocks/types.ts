import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type GetMockTest = inferRouterOutputs<AppRouter>["mockTests"]["getOne"];
