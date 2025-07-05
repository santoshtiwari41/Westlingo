import ResponsiveDialog from "@/components/common/responsive-dialog";
import { OneOfFaqParent } from "@/types/types";

import PricingsForm from "../form/pricings-form";

interface NewPricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentRef: OneOfFaqParent;
}

const NewPricingDialog = ({
  open,
  onOpenChange,
  parentRef,
}: NewPricingDialogProps) => {
  return (
    <ResponsiveDialog
      title="NEW"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <PricingsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        parentRef={parentRef}
      />
    </ResponsiveDialog>
  );
};

export default NewPricingDialog;
