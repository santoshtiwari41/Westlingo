import ResponsiveDialog from "@/components/common/responsive-dialog";
import { OneOfFaqParent } from "@/types/types";

import CarouselsForm from "../form/carousels-form";

interface NewCarouselDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentRef: OneOfFaqParent;
}

const NewCarouselDialog = ({
  open,
  onOpenChange,
  parentRef,
}: NewCarouselDialogProps) => {
  return (
    <ResponsiveDialog
      title="NEW"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <CarouselsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        parentRef={parentRef}
      />
    </ResponsiveDialog>
  );
};

export default NewCarouselDialog;
