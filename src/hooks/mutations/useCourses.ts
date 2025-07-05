import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useCourses } from "@/api/courses";
import type { GetCoursesParams } from "@/api/types";
import { useAdminCourses } from "@/hooks/queries/useCourses";

export const useCourseMutations = (params?: GetCoursesParams) => {
  const { createCourse, updateCourse, deleteCourse } = useCourses();
  const queryClient = useQueryClient();

  const createCourseMutation = useMutation(createCourse());
  const updateCourseMutation = useMutation(updateCourse());
  const deleteCourseMutation = useMutation(deleteCourse());

  const createNewCourse = async (data: {
    title: string;
    description: string;
    content: string;
    isActive?: boolean;
  }) => {
    try {
      const result = await createCourseMutation.mutateAsync(data);

      await queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      toast.success("Course created successfully!");
      return { success: true, data: result };
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
      return { success: false, error };
    }
  };

  const updateExistingCourse = async (
    id: string,
    data: {
      title?: string;
      description?: string;
      content?: string;
      isActive?: boolean;
    }
  ) => {
    try {
      const result = await updateCourseMutation.mutateAsync({ id, ...data });

      await queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      toast.success("Course updated successfully!");
      return { success: true, data: result };
    } catch (error) {
      toast.error("Failed to update course. Please try again.");
      return { success: false, error };
    }
  };

  const deleteExistingCourse = async (id: string) => {
    try {
      await deleteCourseMutation.mutateAsync({ id });

      await queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      toast.success("Course deleted successfully!");
      return { success: true };
    } catch (error) {
      toast.error("Failed to delete course. Please try again.");
      return { success: false, error };
    }
  };

  return {
    createNewCourse,
    updateExistingCourse,
    deleteExistingCourse,
    isCreating: createCourseMutation.isPending,
    isUpdating: updateCourseMutation.isPending,
    isDeleting: deleteCourseMutation.isPending,
  };
};
