import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import {
  BookingView,
  BookingViewError,
  BookingViewLoading,
} from "@/modules/admin/courses/modules/bookings/views/booking-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ courseId: string; bookingId: string }>;
}
const page = async ({ params }: Props) => {
  const { courseId, bookingId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.bookings.getOne.queryOptions({
      id: bookingId,
    })
  );

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<BookingViewLoading />}>
          <ErrorBoundary fallback={<BookingViewError />}>
            <BookingView courseId={courseId} bookingId={bookingId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
