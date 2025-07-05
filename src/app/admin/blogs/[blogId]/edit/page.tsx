import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import EditBlog from "@/modules/admin/common/blogs/components/form/edit-blog-form";
import {
  BlogIdViewError,
  BlogIdViewLoading,
} from "@/modules/admin/common/blogs/views/blog-id-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ blogId: string }>;
}
const page = async ({ params }: Props) => {
  const { blogId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.blogs.getOne.queryOptions({
      id: blogId,
    })
  );

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<BlogIdViewLoading />}>
          <ErrorBoundary fallback={<BlogIdViewError />}>
            <EditBlog blogId={blogId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
