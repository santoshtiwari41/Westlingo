"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Trash2Icon } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";

import { removeCarouselImage } from "../actions";
import { GetCarousel } from "../types";
import EditCarouselItemDialog from "./dialog/edit-carousel-item-dialog";

interface CarouselItemActionsProps {
  data: GetCarousel;
  selectedCarousel: GetCarousel["items"][number];
}

const CarouselItemActions = ({
  data,
  selectedCarousel,
}: CarouselItemActionsProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const [RemoveConfirmationDialog, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove`
  );

  const handleRemoveItem = async () => {
    setIsPending(true);
    const ok = await confirmRemove();
    if (!ok) return;
    await removeCarouselImage(selectedCarousel);
    setIsPending(false);
    router.refresh();
  };

  return (
    <>
      <RemoveConfirmationDialog />
      <EditCarouselItemDialog
        open={open}
        onOpenChange={setOpen}
        data={data}
        initialValues={selectedCarousel}
      />

      <div className="grid grid-cols-1 sm:grid-cols-4">
        <AspectRatio ratio={16 / 9} className="bg-muted relative rounded-lg">
          <Image
            src={selectedCarousel.url}
            alt={selectedCarousel.name}
            fill
            className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
          />
          <div className="absolute top-4 right-4">
            <Button
              size="sm"
              variant="destructive"
              onClick={handleRemoveItem}
              disabled={isPending}
            >
              <Trash2Icon />
            </Button>
          </div>
        </AspectRatio>
      </div>
    </>
  );
};

export default CarouselItemActions;
