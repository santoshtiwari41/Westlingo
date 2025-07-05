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

import PreparationIdViewHeader from "../components/preparation-id-view-header";
import PreparationPreview from "./preparation-preview";

interface PreparationViewProps {
  courseId: string;
  preparationId: string;
}

export const PreparationView = ({
  courseId,
  preparationId,
}: PreparationViewProps) => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.preparations.getOne.queryOptions({ id: preparationId })
  );

  const removeCourse = useMutation(
    trpc.preparations.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.preparations.getOne.queryOptions({ id: preparationId })
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

  const handleRemoveCourse = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeCourse.mutateAsync({ id: preparationId });
  };

  return (
    <>
      <RemoveConfirmationDialog />
      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <PreparationIdViewHeader
          onEdit={() => {
            router.push(
              `/admin/courses/${courseId}/preparation-classes/${preparationId}/edit`
            );
          }}
          onRemove={handleRemoveCourse}
        />
        <PreparationPreview preparation={data} />
      </div>
    </>
  );
};

export const PreparationViewLoading = () => {
  return (
    <LoadingState
      title="Loading Course"
      description="This may take a few seconds..."
    />
  );
};
export const PreparationViewError = () => {
  return (
    <ErrorState
      title="Error Loading Course"
      description="Something went wrong!"
    />
  );
};
