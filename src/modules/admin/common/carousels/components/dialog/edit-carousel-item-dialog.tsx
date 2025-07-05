import ResponsiveDialog from "@/components/common/responsive-dialog";

import { GetCarousel } from "../../types";
import CarouselItemForm from "../form/carousel-item-form";

interface EditCarouselItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: GetCarousel;
  initialValues: GetCarousel["items"][number];
}

const EditCarouselItemDialog = ({
  data,
  initialValues,
  open,
  onOpenChange,
}: EditCarouselItemDialogProps) => {
  return (
    <ResponsiveDialog
      title="EDIT"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <CarouselItemForm
        carousel={data}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default EditCarouselItemDialog;
