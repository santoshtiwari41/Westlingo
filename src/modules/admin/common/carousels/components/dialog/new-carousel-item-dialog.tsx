import ResponsiveDialog from "@/components/common/responsive-dialog";

import { GetCarousel } from "../../types";
import CarouselItemForm from "../form/carousel-item-form";

interface NewCarouselItemDialogProps {
  carousel: GetCarousel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewCarouselItemDialog = ({
  carousel,
  open,
  onOpenChange,
}: NewCarouselItemDialogProps) => {
  return (
    <ResponsiveDialog
      title="NEW"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <CarouselItemForm
        carousel={carousel}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewCarouselItemDialog;
