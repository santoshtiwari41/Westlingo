import ResponsiveDialog from "@/components/common/responsive-dialog";

import { GetPricing } from "../../types";
import PricingItemForm from "../form/pricing-item-form";

interface EditFaqItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pricing: GetPricing;
  initialValues: GetPricing["items"][number];
}

const EditFaqItemDialog = ({
  pricing,
  initialValues,
  open,
  onOpenChange,
}: EditFaqItemDialogProps) => {
  return (
    <ResponsiveDialog
      title="EDIT"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <PricingItemForm
        pricing={pricing}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default EditFaqItemDialog;
