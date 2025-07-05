import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import {
  CoursePreparationClassView,
  CoursePreparationClassViewError,
  CoursePreparationClassViewLoading,
} from "@/modules/public/views/course-preparation-class-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ slug: string }>;
}
const page = async ({ params }: Props) => {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.publics.getCoursePreparationClass.queryOptions({ slug: slug })
  );

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<CoursePreparationClassViewLoading />}>
          <ErrorBoundary fallback={<CoursePreparationClassViewError />}>
            <CoursePreparationClassView slug={slug} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
