"use client";

import { useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { useTRPC } from "@/trpc/client";

import Banner from "./banner";
import CallToAction from "./call-to-action";
import CoursesGrid from "./courses-grid";
import PaginationControls from "./pagination-controls";

export const CoursesList = () => {
  const trpc = useTRPC();
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const { data, isLoading } = useSuspenseQuery(
    trpc.public.getCourses.queryOptions({ page, pageSize })
  );
  const totalPages = data?.totalPages || 1;

  return (
    <div className="min-h-[80vh] rounded-2xl bg-white p-0 shadow-lg md:p-0 dark:bg-zinc-900">
      <Banner />
      <div className="px-6 py-10 md:px-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-zinc-900 dark:text-white">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-base font-semibold text-purple-700">
              All Courses
            </span>
          </h2>
          <PaginationControls
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
        <CoursesGrid items={data?.items} isLoading={isLoading} />
      </div>
      <CallToAction />
    </div>
  );
};

export const CoursesListLoading = () => {
  return (
    <LoadingState
      title="Loading Courses"
      description="This may take a few seconds..."
    />
  );
};
export const CoursesListError = () => {
  return (
    <ErrorState
      title="Error Loading Courses"
      description="Something went wrong!"
    />
  );
};
