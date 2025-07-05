"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";

import { useTRPC } from "@/trpc/client";

export default function ExploreDropdown() {
  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.public.getCourses.queryOptions()
  );

  if (isLoading) {
    return (
      <div className="group relative">
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:border-indigo-200 hover:bg-indigo-50 focus:ring-indigo-300">
          Explore <ChevronDown className="ml-1 h-3 w-3" />
        </button>
        <div className="animate-fade-in invisible absolute top-full left-0 z-50 mt-1 min-w-[180px] rounded-xl border border-indigo-100 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <ul className="py-2">
            <li className="px-4 py-2 text-sm text-gray-500">
              Loading courses...
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (error || !data?.items?.length) {
    return (
      <div className="group relative">
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:border-indigo-200 hover:bg-indigo-50 focus:ring-indigo-300">
          Explore <ChevronDown className="ml-1 h-3 w-3" />
        </button>
        <div className="animate-fade-in invisible absolute top-full left-0 z-50 mt-1 min-w-[180px] rounded-xl border border-indigo-100 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <ul className="py-2">
            <li className="px-4 py-2 text-sm text-gray-500">
              No courses available
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:border-indigo-200 hover:bg-indigo-50 focus:ring-indigo-300">
        Explore <ChevronDown className="ml-1 h-3 w-3" />
      </button>
      <div className="animate-fade-in invisible absolute top-full left-0 z-50 mt-1 min-w-[180px] rounded-xl border border-indigo-100 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <ul className="py-2">
          {data.items.map((course) => (
            <li key={course.id}>
              <a
                href={`/courses/${course.slug}`}
                className="block rounded px-4 py-1.5 whitespace-nowrap text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-700"
              >
                {course.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
