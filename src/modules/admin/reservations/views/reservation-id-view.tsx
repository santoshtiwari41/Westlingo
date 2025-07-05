"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { VideoIcon } from "lucide-react";
import { toast } from "sonner";

import ErrorState from "@/components/common/error-state";
import GeneratedAvatar from "@/components/common/generated-avatar";
import LoadingState from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";

import { SlotSummaryCard } from "../components/SlotSummaryCard";
import ReservationIdViewHeader from "../components/reservation-id-view-header";
import UpdategentDialog from "../components/update-reservation-dialog";

interface ReservationIdViewProps {
  id: string;
}

export const ReservationIdView = ({ id }: ReservationIdViewProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  let reservationData: any = null;
  let slotReservations: any[] = [];
  let isSlotMode = false;
  let slotIdToUse: string | null = null;

  try {
    reservationData = useSuspenseQuery(
      trpc.reservations.getOne.queryOptions({ id })
    ).data;
    slotIdToUse = reservationData?.slotId ?? null;
  } catch (e) {
    isSlotMode = true;
    slotIdToUse = id;
  }

  const { data: studentsData, isLoading: studentsLoading } = useQuery({
    ...trpc.reservations.getBySlot.queryOptions({ slotId: slotIdToUse ?? "" }),
    enabled: !!slotIdToUse,
  });

  const removeReservation = useMutation(
    trpc.reservations.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.reservations.getMany.queryOptions()
        );
        router.push("/admin/reservationSlots");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmationDialog, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove`
  );

  const handleRemoveReservation = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeReservation.mutateAsync({ id });
  };

  return (
    <>
      <RemoveConfirmationDialog />
      <UpdategentDialog
        open={open}
        openOpenChange={setOpen}
        initialValues={reservationData}
      />

      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        {isSlotMode ? (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              All Students for this Slot
            </h2>
            {studentsLoading ? (
              <div>Loading students...</div>
            ) : !studentsData?.length ? (
              <div>No students found for this slot.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr className="bg-zinc-100">
                      <th className="px-3 py-2 text-left">Name</th>
                      <th className="px-3 py-2 text-left">Email</th>
                      <th className="px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsData.map((student: any) => (
                      <tr key={student.id} className="border-b">
                        <td className="px-3 py-2">
                          {student.user?.name || "Unknown"}
                        </td>
                        <td className="px-3 py-2">
                          {student.user?.email || "No email"}
                        </td>
                        <td className="px-3 py-2">{student.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            {reservationData && (
              <SlotSummaryCard
                type={reservationData.type}
                date={reservationData.date}
                time={reservationData.time}
                totalSeats={reservationData.seats}
                bookedSeats={reservationData.bookedSeats ?? 0}
                availableSeats={reservationData.availableSeats ?? 0}
                status={reservationData.status}
                isVerified={reservationData.isVerified}
              />
            )}
            <ReservationIdViewHeader
              onEdit={() => setOpen(true)}
              onRemove={handleRemoveReservation}
            />
            <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
              <div className="flex items-center gap-x-3">
                <GeneratedAvatar
                  variant="botttsNeutral"
                  seed={reservationData.course?.title || reservationData.id}
                  className="size-10"
                />
                <div>
                  <h2 className="text-2xl font-medium">
                    {reservationData.course?.title || "Unknown Course"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Status: {reservationData.status}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Badge
                  variant="outline"
                  className="flex items-center gap-x-2 [&>svg]:size-4"
                >
                  <VideoIcon />
                  {reservationData.type}
                </Badge>
                <Badge variant="secondary">
                  {reservationData.isVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
            </div>
            {/* Students Table */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold">
                All Students for this Slot
              </h3>
              {studentsLoading ? (
                <div>Loading students...</div>
              ) : !studentsData?.length ? (
                <div>No students found for this slot.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr className="bg-zinc-100">
                        <th className="px-3 py-2 text-left">Name</th>
                        <th className="px-3 py-2 text-left">Email</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsData.map((student: any) => (
                        <tr key={student.id} className="border-b">
                          <td className="px-3 py-2">
                            {student.user?.name || "Unknown"}
                          </td>
                          <td className="px-3 py-2">
                            {student.user?.email || "No email"}
                          </td>
                          <td className="px-3 py-2">{student.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export const ReservationIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Reservation"
      description="This may take a few seconds..."
    />
  );
};
export const ReservationIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Reservation"
      description="Something went wrong!"
    />
  );
};
