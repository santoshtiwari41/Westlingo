import ResponsiveDialog from "@/components/common/responsive-dialog";
import { OneOfFaqParent } from "@/types/types";

import { GetPricing } from "../../types";
import PricingsForm from "../form/pricings-form";

interface EditPricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: GetPricing;
  parentRef: OneOfFaqParent;
}

const EditPricingDialog = ({
  open,
  onOpenChange,
  initialValues,
  parentRef,
}: EditPricingDialogProps) => {
  return (
    <ResponsiveDialog
      title="EDIT"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <PricingsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
        parentRef={parentRef}
      />
    </ResponsiveDialog>
  );
};

export default EditPricingDialog;
