"use client";

import Link from "next/link";

import { PlusIcon, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCoursesFilters } from "../hooks/use-courses-filters";
import CourseSearchFilter from "./course-search-filter";

const CoursesListHeader = () => {
  const [filters, setFilters] = useCoursesFilters();

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: 1,
    });
  };
  return (
    <>
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">Courses</h5>
          <Button asChild>
            <Link href="/admin/courses/new">
              <PlusIcon />
              New Course
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-x-2 p-1">
          <CourseSearchFilter />

          {isAnyFilterModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CoursesListHeader;
