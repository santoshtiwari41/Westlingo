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

import { type PricingsInsertSchema, pricingsInsertSchema } from "../../schema";
import { GetPricing } from "../../types";

interface PricingsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: GetPricing;
  parentRef: OneOfFaqParent;
}

function removeUndefined(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
}

const PricingsForm = ({
  onSuccess,
  onCancel,
  initialValues,
  parentRef,
}: PricingsFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createPricings = useMutation(
    trpc.pricings.createPricings.mutationOptions({
      onSuccess: async () => {
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.pricings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        toast.success("Pricing created successfully.");
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create pricing.");
      },
    })
  );
  const updatePricings = useMutation(
    trpc.pricings.updatePricings.mutationOptions({
      onSuccess: async () => {
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.pricings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        toast.success("Pricing updated successfully.");
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update pricing.");
      },
    })
  );

  const form = useForm<PricingsInsertSchema>({
    resolver: zodResolver(pricingsInsertSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      isActive: initialValues?.isActive ?? true,
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createPricings.isPending || updatePricings.isPending;

  const onSubmit = (values: PricingsInsertSchema) => {
    console.log("onSubmit called", values, parentRef);
    let parentKeyValue = {};
    if ("testBookingId" in parentRef)
      parentKeyValue = { testBookingId: parentRef.testBookingId };
    if ("preparationClassId" in parentRef)
      parentKeyValue = { preparationClassId: parentRef.preparationClassId };
    if ("mockTestId" in parentRef)
      parentKeyValue = { mockTestId: parentRef.mockTestId };

    const cleanValues = removeUndefined({
      ...values,
      ...parentKeyValue,
      id: initialValues?.id,
    });
    console.log("Submitting pricing payload:", cleanValues);
    if (isEdit) {
      updatePricings.mutate(
        cleanValues as PricingsInsertSchema & { id: string }
      );
    } else {
      createPricings.mutate(cleanValues as PricingsInsertSchema);
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

export default PricingsForm;
