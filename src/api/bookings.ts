import { Reservationstatus } from "@/modules/admin/reservations/types";
import { useTRPC } from "@/trpc/client";

import type { GetReservationsParams } from "./types";

export const useBookings = () => {
  const trpc = useTRPC();

  return {
    getReservations: (params?: GetReservationsParams) =>
      trpc.reservations.getMany.queryOptions({
        ...params,
        status: params?.status
          ? Reservationstatus[params.status as keyof typeof Reservationstatus]
          : undefined,
      }),

    getReservation: (params: { id: string }) =>
      trpc.reservations.getOne.queryOptions(params),
    createReservation: () => trpc.reservations.create.mutationOptions(),

    updateReservation: () => trpc.reservations.update.mutationOptions(),

    deleteReservation: () => trpc.reservations.remove.mutationOptions(),

    getTestBooking: (id: string) => trpc.bookings.getOne.queryOptions({ id }),

    createTestBooking: () => trpc.bookings.create.mutationOptions(),

    updateTestBooking: () => trpc.bookings.update.mutationOptions(),

    deleteTestBooking: () => trpc.bookings.remove.mutationOptions(),
  };
};

export const bookingsApi = {};
