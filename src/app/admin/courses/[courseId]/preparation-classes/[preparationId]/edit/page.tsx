import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import EditPreparationClass from "@/modules/admin/courses/modules/preparation/components/form/edit-preparation-class-form";
import {
  PreparationViewError,
  PreparationViewLoading,
} from "@/modules/admin/courses/modules/preparation/views/preparation-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ courseId: string; preparationId: string }>;
}
const page = async ({ params }: Props) => {
  const { preparationId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.preparations.getOne.queryOptions({
      id: preparationId,
    })
  );

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PreparationViewLoading />}>
          <ErrorBoundary fallback={<PreparationViewError />}>
            <EditPreparationClass preparationId={preparationId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
