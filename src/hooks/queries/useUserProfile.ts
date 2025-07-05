import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { UpdateUserProfileData } from "@/api/types";
import { useUser } from "@/api/user";

export const useUserProfile = () => {
  const { getProfile, updatePersonalInfo, updateEducationalInfo } = useUser();
  const queryClient = useQueryClient();

  const profileQuery = useQuery(getProfile());

  const updatePersonalInfoMutation = useMutation(updatePersonalInfo());

  const updateEducationalInfoMutation = useMutation(updateEducationalInfo());

  const updateProfile = async (data: UpdateUserProfileData) => {
    try {
      const mutationData = {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        dob: data.dob || "",
        phoneNumber: data.phoneNumber || "",
        middleName: data.middleName,
        permanentAddress: data.permanentAddress,
        temporaryAddress: data.temporaryAddress,
      };

      await updatePersonalInfoMutation.mutateAsync(mutationData);
      await queryClient.invalidateQueries({
        queryKey: getProfile().queryKey,
      });

      toast.success("Profile updated successfully!");
      return { success: true };
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      return { success: false, error };
    }
  };

  const updateEducation = async (data: {
    education: Array<{
      degree: string;
      institution: string;
      year: number;
      gpa?: number;
      description?: string;
    }>;
  }) => {
    try {
      const mutationData = {
        education: data.education.map((edu) => ({
          id: "",
          degree: edu.degree,
          institution: edu.institution,
          year: edu.year.toString(),
          gpa: edu.gpa?.toString(),
          description: edu.description,
        })),
      };

      await updateEducationalInfoMutation.mutateAsync(mutationData);
      await queryClient.invalidateQueries({
        queryKey: getProfile().queryKey,
      });

      toast.success("Educational information updated successfully!");
      return { success: true };
    } catch (error) {
      toast.error(
        "Failed to update educational information. Please try again."
      );
      return { success: false, error };
    }
  };

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    updateProfile,
    updateEducation,
    isUpdatingProfile: updatePersonalInfoMutation.isPending,
    isUpdatingEducation: updateEducationalInfoMutation.isPending,
    refetch: profileQuery.refetch,
  };
};
