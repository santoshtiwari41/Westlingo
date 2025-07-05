import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import BlogsListHeader from "@/modules/admin/common/blogs/components/blogs-list-header";
import {
  BlogsView,
  BlogsViewError,
  BlogsViewLoading,
} from "@/modules/admin/common/blogs/views/blogs-view";
import { getQueryClient, trpc } from "@/trpc/server";

const page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.blogs.getMany.queryOptions());

  return (
    <CustomContainer>
      <BlogsListHeader />
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
