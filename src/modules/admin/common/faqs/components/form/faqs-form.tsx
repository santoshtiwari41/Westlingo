"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { OneOfFaqParent } from "@/types/types";

import { type FaqsInsertSchema, faqsInsertSchema } from "../../schema";
import { GetFaq } from "../../types";

interface FaqsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: GetFaq;
  parentRef: OneOfFaqParent;
}

const FaqsForm = ({
  onSuccess,
  onCancel,
  initialValues,
  parentRef,
}: FaqsFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch all courses for the dropdown
  const { data: coursesData } = useQuery(
    trpc.public.getCourses.queryOptions({ page: 1, pageSize: 100 })
  );
  const courses = coursesData?.items || [];

  // Local state for parent selection
  const [parent, setParent] = React.useState<{ type: string; id: string }>({
    type: "",
    id: "",
  });

  const createFAQ = useMutation(
    trpc.faqs.createFAQ.mutationOptions({
      onSuccess: async () => {
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.faqs.getOne.queryOptions({ id: initialValues.id })
          );
        } else {
          router.refresh();
        }
        onSuccess?.();
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
    })
  );

  const updateFAQ = useMutation(
    trpc.faqs.updateFAQ.mutationOptions({
      onSuccess: async () => {
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.faqs.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<FaqsInsertSchema>({
    resolver: zodResolver(faqsInsertSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      isActive: initialValues?.isActive ?? true,
      ...parentRef,
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createFAQ.isPending || updateFAQ.isPending;

  const onSubmit = (values: FaqsInsertSchema) => {
    // Only allow submit if parent is selected
    if (!parent.type || !parent.id) {
      toast.error("Please select a parent entity for this FAQ.");
      return;
    }
    let parentObj: any = {};
    if (parent.type === "course") parentObj = { course_id: parent.id };
    if (parent.type === "mockTest") parentObj = { mock_test_id: parent.id };
    if (parent.type === "preparationClass")
      parentObj = { preparation_class_id: parent.id };
    if (parent.type === "testBooking")
      parentObj = { test_booking_id: parent.id };
    if (isEdit) {
      updateFAQ.mutate({ ...values, ...parentObj, id: initialValues.id });
    } else {
      createFAQ.mutate({ ...values, ...parentObj });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Parent selection dropdown */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Select Parent <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full rounded border px-3 py-2 text-sm"
            value={
              parent.type && parent.id ? `${parent.type}:${parent.id}` : ""
            }
            onChange={(e) => {
              const [type, id] = e.target.value.split(":");
              setParent({ type, id });
            }}
            required
          >
            <option value="">Select a parent entity</option>
            {courses.map((course: any) => (
              <option key={course.id} value={`course:${course.id}`}>
                Course: {course.title}
              </option>
            ))}
            {/* Add similar options for mock tests, preparation classes, test bookings if needed */}
          </select>
        </div>
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
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FaqsForm;
