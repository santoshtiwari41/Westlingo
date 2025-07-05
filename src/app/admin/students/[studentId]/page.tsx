import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CustomContainer from "@/components/common/custom-container";
import {
  StudentIdView,
  StudentIdViewError,
  StudentIdViewLoading,
} from "@/modules/admin/students/views/student-id-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ studentId: string }>;
}
const page = async ({ params }: Props) => {
  const { studentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.students.getOne.queryOptions({
      id: studentId,
    })
  );

  return (
    <CustomContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<StudentIdViewLoading />}>
          <ErrorBoundary fallback={<StudentIdViewError />}>
            <StudentIdView id={studentId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </CustomContainer>
  );
};

export default page;
