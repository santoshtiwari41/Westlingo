import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import {
  CourseTestBookingView,
  CourseTestBookingViewError,
  CourseTestBookingViewLoading,
} from "@/modules/public/views/course-test-booking-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ slug: string }>;
}
const page = async ({ params }: Props) => {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.publics.getCourseTestBooking.queryOptions({ slug: slug })
  );

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<CourseTestBookingViewLoading />}>
          <ErrorBoundary fallback={<CourseTestBookingViewError />}>
            <CourseTestBookingView slug={slug} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
