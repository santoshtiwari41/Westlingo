"use client";

import { useState } from "react";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";

import { BookingFilters } from "../components/BookingFilters";
import { BookingsTable } from "../components/BookingsTable";
import { StatisticsCards } from "../components/StatisticsCards";

export const AdminBookingsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: reservationsData } = useSuspenseQuery(
    trpc.reservations.getAllReservations.queryOptions({
      page: 1,
      pageSize: 50,
    })
  );

  const reservations = reservationsData?.items || [];

  const updateStatusMutation = useMutation(
    trpc.students.updateReservationStatus.mutationOptions({
      onSuccess: () => {
        toast.success("Reservation status updated successfully");
        setUpdatingStatus(null);
        queryClient.invalidateQueries(
          trpc.reservations.getAllReservations.queryOptions()
        );
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update status");
        setUpdatingStatus(null);
      },
    })
  );

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.course?.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      reservation.user?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      reservation.user?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      false;
    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter;
    const matchesType = typeFilter === "all" || reservation.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusUpdate = async (
    reservationId: string,
    newStatus: string
  ) => {
    setUpdatingStatus(reservationId);
    try {
      await updateStatusMutation.mutateAsync({
        reservationId,
        status: newStatus as any,
      });
    } catch (error) {}
  };

  const totalBookings = reservations.length;
  const completedBookings = reservations.filter(
    (r) => r.status === "completed"
  ).length;
  const processingBookings = reservations.filter(
    (r) => r.status === "processing"
  ).length;
  const activeBookings = reservations.filter(
    (r) => r.status === "active"
  ).length;
  const upcomingBookings = reservations.filter(
    (r) => r.status === "upcoming"
  ).length;
  const cancelledBookings = reservations.filter(
    (r) => r.status === "cancelled"
  ).length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">All Student Bookings</h2>
          <p className="text-gray-600">
            View and manage all student course bookings and reservations
          </p>
        </div>
      </div>

      <StatisticsCards
        total={totalBookings}
        completed={completedBookings}
        processing={processingBookings}
        active={activeBookings}
        upcoming={upcomingBookings}
        cancelled={cancelledBookings}
      />

      <BookingFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <BookingsTable
        filteredReservations={filteredReservations}
        updatingStatus={updatingStatus}
        handleStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};
