import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useBookings } from "@/api/bookings";
import type { GetReservationsParams } from "@/api/types";

export const useUserReservations = (params?: GetReservationsParams) => {
  const { getReservations, getReservation } = useBookings();
  const queryClient = useQueryClient();

  const reservationsQuery = useQuery(getReservations(params));
  const getReservationById = (id: string) => useQuery(getReservation({ id }));

  return {
    reservations: reservationsQuery.data?.items || [],
    total: reservationsQuery.data?.total || 0,
    totalPages: reservationsQuery.data?.totalPages || 0,
    page: params?.page || 1,
    isLoading: reservationsQuery.isLoading,
    isError: reservationsQuery.isError,
    error: reservationsQuery.error,
    getReservationById,
    refetch: reservationsQuery.refetch,
  };
};
