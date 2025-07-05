"use client";

import Link from "next/link";

import { useSuspenseQuery } from "@tanstack/react-query";
import { EyeIcon, PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";

export default function CoursesCardGrid() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.courses.getMany.queryOptions({ page: 1, pageSize: 100 })
  );
  const allCourses = data?.items || [];
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">All Courses</h2>
      {allCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="mb-4 text-lg text-gray-500">No courses found.</p>
          <Link href="/admin/courses/new">
            <button className="flex items-center gap-2 rounded bg-purple-600 px-6 py-2 font-semibold text-white shadow hover:bg-purple-700">
              <PlusIcon className="h-5 w-5" /> Create New Course
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allCourses.map((course: any) => (
            <Card key={course.id} className="transition-shadow hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="truncate text-lg font-semibold">
                  {course.title}
                </CardTitle>
                <CardDescription className="truncate text-gray-500">
                  {course.description}
                </CardDescription>
                <Badge
                  variant={course.isActive ? "default" : "destructive"}
                  className="mt-2"
                >
                  {course.isActive ? "Published" : "Unpublished"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Link href={`/admin/courses/${course.id}`}>
                    <button className="flex w-full items-center justify-center gap-2 rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
                      <EyeIcon className="h-4 w-4" /> View
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
