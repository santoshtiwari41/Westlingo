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
import { TagsInput } from "@/components/ui/tags-input";
import { useTRPC } from "@/trpc/client";

import {
  type PricingItemInsertSchema,
  pricingItemInsertSchema,
} from "../../schema";
import { GetPricing } from "../../types";

interface PricingItemFormProps {
  pricing: GetPricing;
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: GetPricing["items"][number];
}

const PricingItemForm = ({
  pricing,
  onSuccess,
  onCancel,
  initialValues,
}: PricingItemFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createPricingItem = useMutation(
    trpc.pricings.createPricingItem.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.pricings.getOne.queryOptions({ id: pricing.id })
        );
        toast.success("Pricing item created successfully.");
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create pricing item.");
      },
    })
  );
  const updatePricingItem = useMutation(
    trpc.pricings.updatePricingItem.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.pricings.getOne.queryOptions({ id: pricing.id })
        );
        toast.success("Pricing item updated successfully.");
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update pricing item.");
      },
    })
  );

  const form = useForm<PricingItemInsertSchema>({
    resolver: zodResolver(pricingItemInsertSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      pricingId: pricing.id,
      isActive: initialValues?.isActive ?? true,
      price:
        typeof initialValues?.price === "string"
          ? parseFloat(initialValues.price)
          : (initialValues?.price ?? 100),
      features: initialValues?.features ?? ["Hello", "World!"],
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createPricingItem.isPending || updatePricingItem.isPending;

  const onSubmit = (values: PricingItemInsertSchema) => {
    if (isEdit) {
      updatePricingItem.mutate({ ...values, id: initialValues.id });
    } else {
      createPricingItem.mutate(values);
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter features within this pricing</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter features"
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

export default PricingItemForm;
