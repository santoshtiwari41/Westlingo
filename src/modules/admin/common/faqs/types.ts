import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type GetFaq = inferRouterOutputs<AppRouter>["faqs"]["getOne"];
