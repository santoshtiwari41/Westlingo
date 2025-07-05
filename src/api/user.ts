import { useTRPC } from "@/trpc/client";

import type { UpdateUserProfileData, User, UserProfile } from "./types";

export const useUser = () => {
  const trpc = useTRPC();

  return {
    getProfile: () => trpc.users.getProfile.queryOptions(),

    updatePersonalInfo: () => trpc.users.createPersonalInfo.mutationOptions(),

    updateEducationalInfo: () =>
      trpc.users.createEducationalInfo.mutationOptions(),
  };
};

export const userApi = {};
