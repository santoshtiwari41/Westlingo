"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import LoadingState from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTRPC } from "@/trpc/client";

import { SlotStatisticsCards } from "../components/SlotStatisticsCards";
import { columns } from "../components/columns";
import { useReservationsFilters } from "../hooks/use-reservations-filters";

export const ReservationsView = () => {
  const [filters, setFilters] = useReservationsFilters();
  const [activeType, setActiveType] = useState("mock_test");
  const [slotDialogOpen, setSlotDialogOpen] = useState(false);
  const [slotForm, setSlotForm] = useState({
    courseId: "",
    type: "mock_test",
    date: "",
    times: [""],
    seats: 10,
  });
  const [editSlot, setEditSlot] = useState<any | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTime, setEditTime] = useState("");

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.reservations.getMany.queryOptions({ ...filters })
  );
  const queryClient = useQueryClient();
  const coursesQuery = useQuery(trpc.public.getCourses.queryOptions());
  const createSlot = useMutation(
    trpc.reservationSlots.create.mutationOptions({
      onSuccess: () => {
        setSlotDialogOpen(false);
        setSlotForm({
          courseId: "",
          type: "mock_test",
          date: "",
          times: [""],
          seats: 10,
        });
        queryClient.invalidateQueries();
      },
    })
  );

  const slotsQuery = useQuery(trpc.reservationSlots.getAll.queryOptions());

  const router = useRouter();

  const deleteSlot = useMutation(
    trpc.reservationSlots.remove.mutationOptions({
      onSuccess: () => {
        toast.success("Slot deleted");
        queryClient.invalidateQueries(
          trpc.reservationSlots.getAll.queryOptions()
        );
      },
      onError: (e) => toast.error(e.message),
    })
  );

  const updateSlot = useMutation(
    trpc.reservationSlots.update.mutationOptions({
      onSuccess: () => {
        toast.success("Slot updated");
        setEditDialogOpen(false);
        setEditSlot(null);
        queryClient.invalidateQueries(
          trpc.reservationSlots.getAll.queryOptions()
        );
      },
      onError: (e) => toast.error(e.message),
    })
  );

  const grouped = useMemo(() => {
    const byCourse: Record<
      string,
      { title: string; slots: Record<string, any[]> }
    > = {};
    (data.items || []).forEach((r: any) => {
      if (!byCourse[r.course?.id]) {
        byCourse[r.course?.id] = {
          title: r.course?.title || "Unknown Course",
          slots: {},
        };
      }
      // Group by date
      const dateKey = r.date || "-";
      if (!byCourse[r.course?.id].slots[dateKey]) {
        byCourse[r.course?.id].slots[dateKey] = [];
      }
      byCourse[r.course?.id].slots[dateKey].push(r);
    });
    return byCourse;
  }, [data]);

  const typeLabels = {
    mock_test: "Mock Test",
    preparation_class: "Preparation Classes",
    test_booking: "Test Booking",
  };

  useEffect(() => {
    if (editDialogOpen && editSlot) {
      setEditTime(editSlot.time || "");
    }
  }, [editDialogOpen, editSlot]);

  return (
    <div className="flex flex-col gap-y-8 px-4 py-4 md:px-8">
      <div className="mb-4 flex justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSlotDialogOpen(true)}
        >
          + Create Reservation Slots
        </Button>
      </div>
      <Dialog open={slotDialogOpen} onOpenChange={setSlotDialogOpen}>
        <DialogContent>
          <DialogTitle>Create Reservation Slots</DialogTitle>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              slotForm.times
                .filter((t) => t.trim())
                .forEach((time) => {
                  createSlot.mutate({
                    ...slotForm,
                    type: slotForm.type as
                      | "preparation_class"
                      | "test_booking"
                      | "mock_test",
                    time,
                  });
                });
            }}
          >
            <div>
              <label className="mb-1 block text-sm font-medium">Course</label>
              <Select
                value={slotForm.courseId}
                onValueChange={(v) =>
                  setSlotForm((f) => ({ ...f, courseId: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {coursesQuery.data?.items.map((c: any) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Type</label>
              <Select
                value={slotForm.type}
                onValueChange={(v) => setSlotForm((f) => ({ ...f, type: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mock_test">Mock Test</SelectItem>
                  <SelectItem value="preparation_class">
                    Preparation Class
                  </SelectItem>
                  <SelectItem value="test_booking">Test Booking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Date</label>
              <Input
                type="date"
                value={slotForm.date}
                onChange={(e) =>
                  setSlotForm((f) => ({ ...f, date: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Time Slots
              </label>
              {slotForm.times.map((time, idx) => (
                <div key={idx} className="mb-2 flex gap-2">
                  <Input
                    placeholder="e.g. 09:00-10:00"
                    value={time}
                    onChange={(e) =>
                      setSlotForm((f) => ({
                        ...f,
                        times: f.times.map((t, i) =>
                          i === idx ? e.target.value : t
                        ),
                      }))
                    }
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setSlotForm((f) => ({
                        ...f,
                        times: f.times.filter((_, i) => i !== idx),
                      }))
                    }
                    disabled={slotForm.times.length === 1}
                  >
                    -
                  </Button>
                  {idx === slotForm.times.length - 1 && (
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        setSlotForm((f) => ({ ...f, times: [...f.times, ""] }))
                      }
                    >
                      +
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Seats</label>
              <Input
                type="number"
                min={1}
                value={slotForm.seats}
                onChange={(e) =>
                  setSlotForm((f) => ({ ...f, seats: Number(e.target.value) }))
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSlotDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createSlot.isPending}>
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {slotsQuery.data && slotsQuery.data.length > 0 && (
        <SlotStatisticsCards
          totalSlots={slotsQuery.data.length}
          totalSeats={slotsQuery.data.reduce(
            (sum, s) => sum + (s.seats || 0),
            0
          )}
          totalBooked={slotsQuery.data.reduce(
            (sum, s) => sum + (s.bookedSeats || 0),
            0
          )}
          totalAvailable={slotsQuery.data.reduce(
            (sum, s) => sum + (s.availableSeats || 0),
            0
          )}
        />
      )}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Reservation Slots</h2>
        {slotsQuery.isLoading ? (
          <div className="text-center text-zinc-400">Loading slots...</div>
        ) : slotsQuery.isError ? (
          <div className="text-center text-red-500">Failed to load slots.</div>
        ) : !slotsQuery.data?.length ? (
          <div className="text-zinc-400">
            No slots yet. Create a slot to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-zinc-100">
                  <th className="px-3 py-2 text-left">Course</th>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Time</th>
                  <th className="px-3 py-2 text-left">Total Seats</th>
                  <th className="px-3 py-2 text-left">Booked</th>
                  <th className="px-3 py-2 text-left">Available</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {slotsQuery.data.map((slot: any) => (
                  <tr key={slot.id} className="border-b">
                    <td className="px-3 py-2">
                      {slot.course?.title || "Unknown"}
                    </td>
                    <td className="px-3 py-2">
                      {typeLabels[slot.type as keyof typeof typeLabels] ||
                        String(slot.type)}
                    </td>
                    <td className="px-3 py-2">{slot.date}</td>
                    <td className="px-3 py-2">{slot.time}</td>
                    <td className="px-3 py-2">{slot.seats}</td>
                    <td className="px-3 py-2">{slot.bookedSeats}</td>
                    <td className="px-3 py-2">{slot.availableSeats}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditSlot(slot);
                            setEditDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            router.push(`/admin/reservationSlots/${slot.id}`)
                          }
                        >
                          View
                        </Button>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() =>
                                  deleteSlot.mutate({ id: slot.id })
                                }
                                className="p-2 hover:bg-red-100"
                                aria-label="Delete Slot"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Slot</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {editDialogOpen && editSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 shadow-2xl">
            <button
              className="absolute top-4 right-4 text-2xl font-bold text-zinc-400 hover:text-zinc-700"
              onClick={() => {
                setEditDialogOpen(false);
                setEditSlot(null);
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="mb-4 text-xl font-bold text-zinc-900">Edit Slot</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                updateSlot.mutate({
                  id: editSlot.id,
                  courseId: formData.get("courseId") as string,
                  type: formData.get("type") as
                    | "mock_test"
                    | "preparation_class"
                    | "test_booking",
                  date: formData.get("date") as string,
                  time: editTime,
                  seats: Number(formData.get("seats")),
                });
              }}
            >
              <div>
                <label className="mb-1 block text-sm font-medium">Course</label>
                <select
                  name="courseId"
                  defaultValue={editSlot.courseId}
                  className="w-full rounded border px-2 py-1"
                >
                  {coursesQuery.data?.items.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Type</label>
                <select
                  name="type"
                  defaultValue={editSlot.type}
                  className="w-full rounded border px-2 py-1"
                >
                  <option value="mock_test">Mock Test</option>
                  <option value="preparation_class">Preparation Class</option>
                  <option value="test_booking">Test Booking</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Date</label>
                <input
                  name="date"
                  type="date"
                  defaultValue={editSlot.date}
                  className="w-full rounded border px-2 py-1"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Time</label>
                <Input
                  placeholder="e.g. 09:00-10:00"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Seats</label>
                <input
                  name="seats"
                  type="number"
                  min={1}
                  defaultValue={editSlot.seats}
                  className="w-full rounded border px-2 py-1"
                />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setEditDialogOpen(false);
                    setEditSlot(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateSlot.isPending}>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const ReservationsViewLoading = () => {
  return (
    <LoadingState
      title="Loading reservations"
      description="This may take a few seconds..."
    />
  );
};

export const ReservationsViewError = () => {
  return (
    <div className="text-center text-red-500">
      Error Loading reservations. Something went wrong!
    </div>
  );
};
