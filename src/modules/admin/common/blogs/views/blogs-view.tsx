"use client";

import Link from "next/link";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Edit2Icon, EyeIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";

export const BlogsView = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(trpc.blogs.getMany.queryOptions());

  const remove = useMutation(
    trpc.blogs.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.blogs.getMany.queryOptions());
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

  const handleRemove = async (id: string) => {
    const ok = await confirmRemove();
    if (!ok) return;
    await remove.mutateAsync({ id });
  };

  return (
    <>
      <RemoveConfirmationDialog />

      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        {data.items.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <CardTitle className="text-2xl">
                {blog.title}{" "}
                <Badge
                  variant={blog.isActive ? "outline" : "destructive"}
                  className="text-sm"
                >
                  {blog.isActive ? "Active Course" : "Inactive Course"}
                </Badge>
              </CardTitle>
              <CardDescription>{blog.description}</CardDescription>

              <CardAction className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/blogs/${blog.id}/edit`}>
                    <Edit2Icon />
                  </Link>
                </Button>
                <Button size="icon" onClick={() => handleRemove(blog.id)}>
                  <Trash2Icon />
                </Button>
              </CardAction>
            </CardHeader>
            {/* <CardContent></CardContent> */}
            <CardFooter>
              <Button asChild>
                <Link href={`/admin/blogs/${blog.id}`}>
                  <EyeIcon /> View
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export const BlogsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Blogs"
      description="This may take a few seconds..."
    />
  );
};
export const BlogsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Blogs"
      description="Something went wrong!"
    />
  );
};
