import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type CourseGetMany = inferRouterOutputs<AppRouter>["courses"]["getMany"];
export type CourseGetOne = inferRouterOutputs<AppRouter>["courses"]["getOne"];

export enum ReservationType {
  PreparationClass = "preparation_class",
  TestBooking = "test_booking",
  MockTest = "mock_test",
}
