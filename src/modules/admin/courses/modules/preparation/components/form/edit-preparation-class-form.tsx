"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

import {
  type CoursePreparationInsertSchema,
  coursePreparationInsertSchema,
} from "../../schema";
import { GetPreparation } from "../../types";

export default function EditPreparationClass({
  preparationId,
}: {
  preparationId: string;
}) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.mockTests.getOne.queryOptions({ id: preparationId })
  );

  if (!data) {
    return (
      <Alert>
        <AlertTitle>NO DATA</AlertTitle>
      </Alert>
    );
  }
  return <PreparationClassForm initialValues={data} />;
}

const PreparationClassForm = ({
  initialValues,
}: {
  initialValues: GetPreparation;
}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const updatePreparationClass = useMutation(
    trpc.preparations.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.preparations.getOne.queryOptions({ id: initialValues.id })
        );
        router.push(
          `/admin/courses/${initialValues.courseId}/preparation-classes/${initialValues.id}`
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<CoursePreparationInsertSchema>({
    resolver: zodResolver(coursePreparationInsertSchema),
    defaultValues: {
      title: initialValues.title,
      description: initialValues.description,
      courseId: initialValues.courseId,
      isActive: !!initialValues?.isActive,
    },
  });

  const isPending = updatePreparationClass.isPending;

  const onSubmit = (values: CoursePreparationInsertSchema) => {
    updatePreparationClass.mutate({ ...values, id: initialValues.id });
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
