import { useTRPC } from "@/trpc/client";

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
