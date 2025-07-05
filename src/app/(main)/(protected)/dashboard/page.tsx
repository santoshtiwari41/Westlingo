import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import {
  ProfileView,
  ProfileViewError,
  ProfileViewLoading,
} from "@/modules/user/profile/views/profile-view";
import { getQueryClient, trpc } from "@/trpc/server";

const page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.users.getProfile.queryOptions());

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProfileViewLoading />}>
          <ErrorBoundary fallback={<ProfileViewError />}>
            <ProfileView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
