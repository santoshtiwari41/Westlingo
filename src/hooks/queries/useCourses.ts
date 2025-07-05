import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useCourses } from "@/api/courses";
import type { GetCoursesParams } from "@/api/types";

export const useCoursesList = (params?: GetCoursesParams) => {
  const { getCourses, getCourse } = useCourses();
  const queryClient = useQueryClient();

  const coursesQuery = useQuery(getCourses(params));
  const getCourseById = (slug: string) => useQuery(getCourse(slug));

  return {
    courses: coursesQuery.data?.items || [],
    total: coursesQuery.data?.total || 0,
    totalPages: coursesQuery.data?.totalPages || 0,
    page: params?.page || 1,
    isLoading: coursesQuery.isLoading,
    isError: coursesQuery.isError,
    error: coursesQuery.error,
    getCourseById,
    refetch: coursesQuery.refetch,
  };
};

export const useCourseDetail = (slug: string) => {
  const { getCourse } = useCourses();

  const courseQuery = useQuery(getCourse(slug));

  return {
    course: courseQuery.data,
    isLoading: courseQuery.isLoading,
    isError: courseQuery.isError,
    error: courseQuery.error,
    refetch: courseQuery.refetch,
  };
};

export const useAdminCourses = (params?: GetCoursesParams) => {
  const { getUserCourses } = useCourses();
  const queryClient = useQueryClient();

  const coursesQuery = useQuery(getUserCourses(params));

  return {
    courses: coursesQuery.data?.items || [],
    total: coursesQuery.data?.total || 0,
    totalPages: coursesQuery.data?.totalPages || 0,
    page: params?.page || 1,
    isLoading: coursesQuery.isLoading,
    isError: coursesQuery.isError,
    error: coursesQuery.error,
    refetch: coursesQuery.refetch,
  };
};
