"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

import {
  type CarouselsInsertSchema,
  carouselsInsertSchema,
} from "../../schema";
import { GetCarousel } from "../../types";

interface CarouselsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: GetCarousel;
  parentRef: OneOfFaqParent;
}

const CarouselsForm = ({
  onSuccess,
  onCancel,
  initialValues,
  parentRef,
}: CarouselsFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createCarousel = useMutation(
    trpc.carousels.createCarousel.mutationOptions({
      onSuccess: async () => {
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.carousels.getOne.queryOptions({ id: initialValues.id })
          );
        } else {
          router.refresh();
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const updateCarousel = useMutation(
    trpc.carousels.updateCarousel.mutationOptions({
      onSuccess: async () => {
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.carousels.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<CarouselsInsertSchema>({
    resolver: zodResolver(carouselsInsertSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      isActive: initialValues?.isActive ?? true,
      ...parentRef,
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createCarousel.isPending || updateCarousel.isPending;

  const onSubmit = (values: CarouselsInsertSchema) => {
    if (isEdit) {
      updateCarousel.mutate({ ...values, id: initialValues.id });
    } else {
      createCarousel.mutate(values);
    }
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

export default CarouselsForm;
