import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type GetProfile = inferRouterOutputs<AppRouter>["users"]["getProfile"];
