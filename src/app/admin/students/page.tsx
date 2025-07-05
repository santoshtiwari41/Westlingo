import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import StudentsListHeader from "@/modules/admin/students/components/students-list-header";
import { loadStudentsSearchParams } from "@/modules/admin/students/hooks/students-filters-server";
import {
  StudentsView,
  StudentsViewError,
  StudentsViewLoading,
} from "@/modules/admin/students/views/students-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  searchParams: Promise<SearchParams>;
}
const page = async ({ searchParams }: Props) => {
  const filters = await loadStudentsSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.students.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <CustomContainer>
      <StudentsListHeader />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<StudentsViewLoading />}>
          <ErrorBoundary fallback={<StudentsViewError />}>
            <StudentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
