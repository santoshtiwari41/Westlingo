import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useBookings } from "@/api/bookings";
import type {
  BookingDetails,
  GetReservationsParams,
  Reservation,
  UserInfo,
} from "@/api/types";
import { useUserReservations } from "@/hooks/queries/useBookings";

export const useBookingMutations = () => {
  const { createReservation, updateReservation, deleteReservation } =
    useBookings();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createReservationMutation = useMutation(createReservation());
  const updateReservationMutation = useMutation(updateReservation());
  const deleteReservationMutation = useMutation(deleteReservation());

  const createNewBooking = async (data: {
    slotId: string;
    validFrom: string;
    validTill: string;
    userInfo: UserInfo;
    bookingDetails: BookingDetails;
    planId?: string;
  }) => {
    try {
      const payload: any = {
        slotId: data.slotId,
        validFrom: data.validFrom,
        validTill: data.validTill,
      };
      if (data.planId && data.planId.trim()) {
        payload.planId = data.planId;
      } else if (data.bookingDetails.plan && data.bookingDetails.plan.trim()) {
        payload.planId = data.bookingDetails.plan;
      }
      const result = await createReservationMutation.mutateAsync(payload);

      await queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });

      toast.success("Booking created successfully!");

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  };

  const updateBookingStatus = async (
    id: string,
    data: {
      courseId: string;
    }
  ) => {
    try {
      const result = await updateReservationMutation.mutateAsync({
        id,
      });

      await queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });

      toast.success("Booking updated successfully!");
      return { success: true, data: result };
    } catch (error) {
      toast.error("Failed to update booking. Please try again.");
      return { success: false, error };
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      await deleteReservationMutation.mutateAsync({ id });

      await queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });

      toast.success("Booking cancelled successfully!");
      return { success: true };
    } catch (error) {
      toast.error("Failed to cancel booking. Please try again.");
      return { success: false, error };
    }
  };

  return {
    createNewBooking,
    updateBookingStatus,
    cancelBooking,
    isCreating: createReservationMutation.isPending,
    isUpdating: updateReservationMutation.isPending,
    isDeleting: deleteReservationMutation.isPending,
  };
};

export const useBookingsManager = (params?: GetReservationsParams) => {
  const reservations = useUserReservations(params);
  const mutations = useBookingMutations();

  return {
    ...reservations,
    ...mutations,
  };
};
