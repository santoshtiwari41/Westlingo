"use client";

import Link from "next/link";

import { PlusIcon, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useStudentFilters } from "../hooks/use-students-filters";
import StudentSearchFilter from "./student-search-filter";

const StudentsListHeader = () => {
  const [filters, setFilters] = useStudentFilters();

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
          <h5 className="text-xl font-medium">Students</h5>
          <Button asChild>
            <Link href="/admin/Students/new">
              <PlusIcon />
              New Student
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-x-2 p-1">
          <StudentSearchFilter />

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

export default StudentsListHeader;
