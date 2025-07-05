"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { uploadToCloudinary } from "@/actions/cloudinary";
import TipTap from "@/components/tiptap";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useTRPC } from "@/trpc/client";

import { type BlogInsertSchema, blogInsertSchema } from "../../schema";
import { GetBlog } from "../../types";

interface EditBlogFormProps {
  initialValues: GetBlog;
}

export default function EditBlog({ blogId }: { blogId: string }) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.blogs.getOne.queryOptions({ id: blogId })
  );

  if (!data) {
    return (
      <Alert>
        <AlertTitle>NO DATA</AlertTitle>
      </Alert>
    );
  }
  return <EditBlogForm initialValues={data} />;
}

const EditBlogForm = ({ initialValues }: EditBlogFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const update = useMutation(
    trpc.blogs.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.blogs.getOne.queryOptions({ id: initialValues.id })
        );
        router.push("/admin/blogs");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<BlogInsertSchema>({
    resolver: zodResolver(blogInsertSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      content: initialValues?.content ?? "",
      isActive: initialValues?.isActive ?? true,
      image: initialValues?.image ?? "",
    },
  });

  const isPending = update.isPending;

  const onSubmit = (values: BlogInsertSchema) => {
    update.mutate({ ...values, id: initialValues.id });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TipTap
                  content={field.value ?? ""}
                  onChange={field.onChange}
                  editable
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>ACTIVE</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Image</FormLabel>
              <FormControl>
                <div>
                  {field.value && (
                    <img
                      src={field.value}
                      alt="Current"
                      className="mb-2 h-24 rounded"
                    />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploading(true);
                        const formData = new FormData();
                        formData.append("file", file);
                        const result = await uploadToCloudinary(
                          formData,
                          "blog"
                        );
                        setUploading(false);
                        if (typeof result === "object" && "url" in result) {
                          field.onChange(result.url);
                        } else {
                          toast.error("Image upload failed");
                        }
                      }
                    }}
                  />
                  {uploading && (
                    <div className="mt-2 text-xs text-zinc-500">
                      Uploading...
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-x-2">
          <Button
            variant="ghost"
            disabled={isPending}
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};
