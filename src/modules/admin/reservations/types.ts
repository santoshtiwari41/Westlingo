import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type ReservationGetOne =
  inferRouterOutputs<AppRouter>["reservations"]["getOne"];
export type ReservationGetMany =
  inferRouterOutputs<AppRouter>["reservations"]["getMany"]["items"];
export enum Reservationstatus {
  Upcoming = "Upcoming",
  Active = "Active",
  Completed = "Completed",
  Processing = "Processing",
  Cancelled = "Cancelled",
}
