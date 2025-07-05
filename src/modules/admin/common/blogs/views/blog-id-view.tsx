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

import BlogIdViewHeader from "../components/blog-id-view-header";
import BlogPreview from "../components/blog-preview";

interface BlogIdViewProps {
  id: string;
}

export const BlogIdView = ({ id }: BlogIdViewProps) => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(trpc.blogs.getOne.queryOptions({ id }));

  const remove = useMutation(
    trpc.blogs.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.blogs.getMany.queryOptions());
        router.push("/admin/blogs");
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

    await remove.mutateAsync({ id });
  };

  return (
    <>
      <RemoveConfirmationDialog />
      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <BlogIdViewHeader
          onEdit={() => {
            router.push(`/admin/blogs/${id}/edit`);
          }}
          onRemove={handleRemove}
        />
        <BlogPreview data={data} />
      </div>
    </>
  );
};

export const BlogIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Blog"
      description="This may take a few seconds..."
    />
  );
};
export const BlogIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Blog"
      description="Something went wrong!"
    />
  );
};
