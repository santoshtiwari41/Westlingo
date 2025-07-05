import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import {
  MockTestView,
  MockTestViewError,
  MockTestViewLoading,
} from "@/modules/admin/courses/modules/mocks/views/mock-test-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ courseId: string; mockTestId: string }>;
}
const page = async ({ params }: Props) => {
  const { courseId, mockTestId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.mockTests.getOne.queryOptions({
      id: mockTestId,
    })
  );

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MockTestViewLoading />}>
          <ErrorBoundary fallback={<MockTestViewError />}>
            <MockTestView courseId={courseId} mockTestId={mockTestId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
