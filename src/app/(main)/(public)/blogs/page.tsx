import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import {
  BlogsView,
  BlogsViewError,
  BlogsViewLoading,
} from "@/modules/user/blogs/views/blogs-view";
import { getQueryClient, trpc } from "@/trpc/server";

const page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.publics.getBlogs.queryOptions());

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<BlogsViewLoading />}>
          <ErrorBoundary fallback={<BlogsViewError />}>
            <BlogsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
