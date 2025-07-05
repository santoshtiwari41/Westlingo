import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import GeneratedAvatar from "@/components/common/generated-avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTRPC } from "@/trpc/client";

import { ReservationsInsertSchema, reservationsInsertSchema } from "../schema";
import { ReservationGetOne } from "../types";

interface ReservationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: ReservationGetOne;
}

const ReservationForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: ReservationFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const slotsQuery = useQuery(trpc.reservationSlots.getAll.queryOptions());

  const createReservation = useMutation(
    trpc.reservations.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.reservations.getMany.queryOptions()
        );
        onSuccess?.();
      },
      onError: (error: any) => {
        if (
          error?.data?.code === "CONFLICT" ||
          error?.message?.includes("already booked")
        ) {
          toast.error(
            "You have already booked this slot for the same course and test type.",
            {
              description: "Please choose a different slot or course.",
              className: "bg-red-100 text-red-800 border border-red-200",
              icon: "🚫",
            }
          );
        } else {
          toast.error(error.message || "Failed to create reservation.");
        }
      },
    })
  );
  const updateReservation = useMutation(
    trpc.reservations.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.reservations.getMany.queryOptions()
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.reservations.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<ReservationsInsertSchema>({
    resolver: zodResolver(reservationsInsertSchema),
    defaultValues: {
      slotId: initialValues?.slotId ?? "",
      validFrom: initialValues?.validFrom ?? "",
      validTill: initialValues?.validTill ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending =
    createReservation.isPending ||
    updateReservation.isPending ||
    slotsQuery.isLoading;

  const onSubmit = (values: ReservationsInsertSchema) => {
    if (isEdit) {
      updateReservation.mutate({ ...values, id: initialValues.id });
    } else {
      createReservation.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="slotId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slot</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {slotsQuery.data?.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id}>
                      {slot.course?.title || "Unknown"} | {slot.type} |{" "}
                      {slot.date} | {slot.time} | {slot.seats} seats
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="validFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReservationForm;
