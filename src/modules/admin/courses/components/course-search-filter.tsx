import React from "react";

import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useCoursesFilters } from "../hooks/use-courses-filters";

const CourseSearchFilter = () => {
  const [filters, setFilters] = useCoursesFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 w-[200px] bg-white pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
    </div>
  );
};

export default CourseSearchFilter;
