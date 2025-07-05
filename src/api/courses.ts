import { useTRPC } from "@/trpc/client";

import type { Course, GetCoursesParams, PaginatedResponse } from "./types";

export const useCourses = () => {
  const trpc = useTRPC();

  return {
    getCourses: (params?: GetCoursesParams) =>
      trpc.public.getCourses.queryOptions(params || {}),

    getCourse: (slug: string) => trpc.public.getCourse.queryOptions({ slug }),

    getCourseById: (id: string) => trpc.courses.getOne.queryOptions({ id }),

    getUserCourses: (params?: GetCoursesParams) =>
      trpc.courses.getMany.queryOptions(params || {}),

    createCourse: () => trpc.courses.create.mutationOptions(),

    updateCourse: () => trpc.courses.update.mutationOptions(),

    deleteCourse: () => trpc.courses.remove.mutationOptions(),
  };
};

export const coursesApi = {};
