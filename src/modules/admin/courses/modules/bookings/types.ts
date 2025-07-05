import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type GetBooking = inferRouterOutputs<AppRouter>["bookings"]["getOne"];
