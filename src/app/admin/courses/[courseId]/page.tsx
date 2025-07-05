import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import {
  CourseIdView,
  CourseIdViewError,
  CourseIdViewLoading,
} from "@/modules/admin/courses/views/course-id-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ courseId: string }>;
}
const page = async ({ params }: Props) => {
  const { courseId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.courses.getOne.queryOptions({
      id: courseId,
    })
  );

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<CourseIdViewLoading />}>
          <ErrorBoundary fallback={<CourseIdViewError />}>
            <CourseIdView id={courseId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
