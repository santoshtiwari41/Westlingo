"use client";

import { useRouter } from "next/navigation";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";

import BookingIdViewHeader from "../components/booking-id-view-header";
import BookingPreview from "./booking-preview";

interface BookingViewProps {
  courseId: string;
  bookingId: string;
}

export const BookingView = ({ courseId, bookingId }: BookingViewProps) => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.bookings.getOne.queryOptions({ id: bookingId })
  );

  const removeCourse = useMutation(
    trpc.bookings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.bookings.getOne.queryOptions({ id: bookingId })
        );
        router.push("/admin/courses");
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

  const handleRemoveCourse = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeCourse.mutateAsync({ id: bookingId });
  };

  return (
    <>
      <RemoveConfirmationDialog />
      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <BookingIdViewHeader
          onEdit={() => {
            router.push(
              `/admin/courses/${courseId}/test-bookings/${bookingId}/edit`
            );
          }}
          onRemove={handleRemoveCourse}
        />
        <BookingPreview booking={data} />
      </div>
    </>
  );
};

export const BookingViewLoading = () => {
  return (
    <LoadingState
      title="Loading Course"
      description="This may take a few seconds..."
    />
  );
};
export const BookingViewError = () => {
  return (
    <ErrorState
      title="Error Loading Course"
      description="Something went wrong!"
    />
  );
};
