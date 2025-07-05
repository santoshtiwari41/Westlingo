import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import {
  CoursesList,
  CoursesListError,
  CoursesListLoading,
} from "@/modules/user/home/components/courses-list";
import { getQueryClient, trpc } from "@/trpc/server";

const page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.public.getCourses.queryOptions());

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<CoursesListLoading />}>
          <ErrorBoundary fallback={<CoursesListError />}>
            <CoursesList />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
