import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import {
  CoursesView,
  CoursesViewError,
  CoursesViewLoading,
} from "@/modules/public/views/courses-view";
import { getQueryClient, trpc } from "@/trpc/server";

const page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.publics.getCourses.queryOptions());

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<CoursesViewLoading />}>
          <ErrorBoundary fallback={<CoursesViewError />}>
            <CoursesView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
