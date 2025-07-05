import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import CoursesListHeader from "@/modules/admin/courses/components/courses-list-header";
import { loadCoursesSearchParams } from "@/modules/admin/courses/hooks/courses-filters-server";
import {
  CoursesView,
  CoursesViewError,
  CoursesViewLoading,
} from "@/modules/admin/courses/views/courses-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  searchParams: Promise<SearchParams>;
}
const page = async ({ searchParams }: Props) => {
  const filters = await loadCoursesSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.courses.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <CustomContainer>
      <CoursesListHeader />
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
