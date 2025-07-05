"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";

import { SlotSummaryCard } from "../components/SlotSummaryCard";

interface SlotDetailViewProps {
  slotId: string;
}

const SlotDetailView: React.FC<SlotDetailViewProps> = ({ slotId }) => {
  const trpc = useTRPC();
  const {
    data: slot,
    isLoading: slotLoading,
    isError: slotError,
  } = useSuspenseQuery(
    trpc.reservationSlots.getOne.queryOptions({ id: slotId })
  );
  const {
    data: reservations,
    isLoading: reservationsLoading,
    isError: reservationsError,
  } = useSuspenseQuery(trpc.reservations.getBySlot.queryOptions({ slotId }));

  if (slotLoading || reservationsLoading) return <div>Loading...</div>;
  if (slotError || !slot) return <div>Slot not found.</div>;
  if (reservationsError) return <div>Error loading reservations.</div>;

  return (
    <div className="flex flex-col gap-y-8 px-4 py-4 md:px-8">
      <SlotSummaryCard
        type={slot.type}
        date={slot.date}
        time={slot.time}
        totalSeats={slot.seats}
        bookedSeats={slot.bookedSeats}
        availableSeats={slot.availableSeats}
        course={slot.course?.title}
        status={undefined}
        isVerified={undefined}
      />
      <Card className="p-4">
        <h2 className="mb-4 text-xl font-bold">Students in this Slot</h2>
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
              {reservations && reservations.length > 0 ? (
                reservations.map((student: any) => {
                  const statusColors: Record<string, string> = {
                    upcoming: "bg-blue-100 text-blue-800",
                    active: "bg-green-100 text-green-800",
                    completed: "bg-gray-100 text-gray-800",
                    processing: "bg-yellow-100 text-yellow-800",
                    cancelled: "bg-red-100 text-red-800",
                  };
                  return (
                    <tr key={student.id} className="border-b">
                      <td className="px-3 py-2">
                        {student.user?.name || "Unknown"}
                      </td>
                      <td className="px-3 py-2">
                        {student.user?.email || "No email"}
                      </td>
                      <td className="px-3 py-2">
                        <Badge
                          className={
                            statusColors[student.status] ||
                            "bg-gray-100 text-gray-800"
                          }
                        >
                          {student.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center">
                    No students found for this slot.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SlotDetailView;
