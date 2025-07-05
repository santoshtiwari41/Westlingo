"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import DataPagination from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { useTRPC } from "@/trpc/client";

import { columns } from "../components/columns";
import { useStudentFilters } from "../hooks/use-students-filters";

export const StudentsView = () => {
  const [filters, setFilters] = useStudentFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.students.getMany.queryOptions({
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

export const StudentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Students"
      description="This may take a few seconds..."
    />
  );
};
export const StudentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Students"
      description="Something went wrong!"
    />
  );
};
