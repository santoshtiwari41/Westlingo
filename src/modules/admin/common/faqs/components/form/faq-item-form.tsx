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
import { useTRPC } from "@/trpc/client";

import { FaqItemInsertSchema, faqItemInsertSchema } from "../../schema";
import { GetFaq } from "../../types";

interface FaqItemFormProps {
  faq: GetFaq;
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: GetFaq["items"][number];
}

const FaqItemForm = ({
  faq,
  onSuccess,
  onCancel,
  initialValues,
}: FaqItemFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createFAQItem = useMutation(
    trpc.faqs.createFAQItem.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.faqs.getOne.queryOptions({ id: faq.id })
        );
        router.refresh();
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const updateFAQItem = useMutation(
    trpc.faqs.updateFAQItem.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.faqs.getOne.queryOptions({ id: faq.id })
        );
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<FaqItemInsertSchema>({
    resolver: zodResolver(faqItemInsertSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      faqId: faq.id,
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createFAQItem.isPending || updateFAQItem.isPending;

  const onSubmit = (values: FaqItemInsertSchema) => {
    if (isEdit) {
      updateFAQItem.mutate({ ...values, id: initialValues.id });
    } else {
      createFAQItem.mutate(values);
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

export default FaqItemForm;
