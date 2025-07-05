"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";

import { GetFaq } from "../types";
import EditFaqItemDialog from "./dialog/edit-faq-item-dialog";

interface FaqItemActionsProps {
  data: GetFaq;
  selectedFaq: GetFaq["items"][number];
}

const FaqItemActions = ({ data, selectedFaq }: FaqItemActionsProps) => {
  const [open, setOpen] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [RemoveConfirmationDialog, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove`
  );

  const removeFAQItem = useMutation(
    trpc.courses.removeFAQItem.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.faqs.getOne.queryOptions({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemoveFAQItem = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeFAQItem.mutateAsync({ id: selectedFaq.id });
  };

  return (
    <>
      <RemoveConfirmationDialog />
      <EditFaqItemDialog
        open={open}
        onOpenChange={setOpen}
        data={data}
        initialValues={selectedFaq}
      />

      <div className="flex items-center justify-between rounded-md border p-2">
        <div>
          <h3>{selectedFaq.title}</h3>
          <p className="text-sm text-gray-600">{selectedFaq.description}</p>
        </div>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <Button size="sm" onClick={() => setOpen(true)}>
            <Edit2Icon />
          </Button>
          <Button size="sm" variant="destructive" onClick={handleRemoveFAQItem}>
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default FaqItemActions;
