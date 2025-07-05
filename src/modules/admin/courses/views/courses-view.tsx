"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import DataPagination from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { useTRPC } from "@/trpc/client";

import { columns } from "../components/columns";
import { useCoursesFilters } from "../hooks/use-courses-filters";

export const CoursesView = () => {
  const [filters, setFilters] = useCoursesFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.courses.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
      <DataTable columns={columns} data={data.items} />

      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
};

export const CoursesViewLoading = () => {
  return (
    <LoadingState
      title="Loading Courses"
      description="This may take a few seconds..."
    />
  );
};
export const CoursesViewError = () => {
  return (
    <ErrorState
      title="Error Loading Courses"
      description="Something went wrong!"
    />
  );
};
