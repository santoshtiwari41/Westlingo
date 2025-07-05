import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import {
  CourseDetailsView,
  CourseDetailsViewError,
  CourseDetailsViewLoading,
} from "@/modules/user/home/components/courses-details-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ slug: string }>;
}
const page = async ({ params }: Props) => {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.public.getCourse.queryOptions({
      slug: slug,
    })
  );

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<CourseDetailsViewLoading />}>
          <ErrorBoundary fallback={<CourseDetailsViewError />}>
            <CourseDetailsView slug={slug} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default page;
