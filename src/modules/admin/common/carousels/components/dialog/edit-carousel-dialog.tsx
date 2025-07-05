import ResponsiveDialog from "@/components/common/responsive-dialog";
import { OneOfFaqParent } from "@/types/types";

import { GetCarousel } from "../../types";
import CarouselsForm from "../form/carousels-form";

interface EditCarouselDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: GetCarousel;
  parentRef: OneOfFaqParent;
}

const EditCarouselDialog = ({
  open,
  onOpenChange,
  initialValues,
  parentRef,
}: EditCarouselDialogProps) => {
  return (
    <ResponsiveDialog
      title="EDIT"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <CarouselsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
        parentRef={parentRef}
      />
    </ResponsiveDialog>
  );
};

export default EditCarouselDialog;
