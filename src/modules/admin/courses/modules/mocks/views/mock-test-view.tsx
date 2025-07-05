"use client";

import { useRouter } from "next/navigation";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";

import MockTestIdViewHader from "../components/mock-test-id-view-header";
import MockTestPreview from "./mock-test-preview";

interface MockTestViewProps {
  courseId: string;
  mockTestId: string;
}

export const MockTestView = ({ courseId, mockTestId }: MockTestViewProps) => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.mockTests.getOne.queryOptions({ id: mockTestId })
  );

  const removeCourse = useMutation(
    trpc.mockTests.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.mockTests.getOne.queryOptions({ id: mockTestId })
        );
        router.push("/admin/courses");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmationDialog, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove`
  );

  const handleRemove = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeCourse.mutateAsync({ id: mockTestId });
  };

  return (
    <>
      <RemoveConfirmationDialog />
      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <MockTestIdViewHader
          onEdit={() => {
            router.push(
              `/admin/courses/${courseId}/mock-tests/${mockTestId}/edit`
            );
          }}
          onRemove={handleRemove}
        />
        <MockTestPreview mock={data} />
      </div>
    </>
  );
};

export const MockTestViewLoading = () => {
  return (
    <LoadingState
      title="Loading Course"
      description="This may take a few seconds..."
    />
  );
};
export const MockTestViewError = () => {
  return (
    <ErrorState
      title="Error Loading Course"
      description="Something went wrong!"
    />
  );
};
