"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";

import { GetPricing } from "../types";
import EditFaqItemDialog from "./dialog/edit-pricing-item-dialog";

interface PricingItemActionsProps {
  pricing: GetPricing;
  selectedPricing: GetPricing["items"][number];
  courseId: string;
  entityType: "preparation" | "mockTest" | "testBooking";
}

const PricingItemActions = ({
  pricing,
  selectedPricing,
  courseId,
  entityType,
}: PricingItemActionsProps) => {
  const [open, setOpen] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [RemoveConfirmationDialog, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove`
  );

  const removePricingItem = useMutation(
    trpc.pricings.removePricingItem.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.pricings.getOne.queryOptions({ id: pricing.id })
        );
        if (entityType === "preparation") {
          await queryClient.invalidateQueries(
            trpc.preparations.getAllByCourse.getQueryKey({ courseId })
          );
        } else if (entityType === "mockTest") {
          await queryClient.invalidateQueries(
            trpc.mockTests.getAllByCourse.getQueryKey({ courseId })
          );
        } else if (entityType === "testBooking") {
          await queryClient.invalidateQueries(
            trpc.bookings.getAllByCourse.getQueryKey({ courseId })
          );
        }
        toast.success("Pricing item deleted successfully.");
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemovePricingItem = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removePricingItem.mutateAsync({ id: selectedPricing.id });
  };

  return (
    <>
      <RemoveConfirmationDialog />
      <EditFaqItemDialog
        open={open}
        onOpenChange={setOpen}
        pricing={pricing}
        initialValues={selectedPricing}
      />

      <div className="flex items-center justify-between rounded-md border p-2">
        <div>
          <h3>{selectedPricing.title}</h3>
          <p className="text-sm text-gray-600">{selectedPricing.description}</p>
          <p className="text-sm text-gray-600">Nrs {selectedPricing.price}</p>
          <div className="mt-2 flex flex-col items-start gap-2">
            {selectedPricing.features.map((feature: string) => (
              <Badge
                key={feature}
                variant="outline"
                className="whitespace-normal"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <Button size="sm" onClick={() => setOpen(true)}>
            <Edit2Icon />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleRemovePricingItem}
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default PricingItemActions;
