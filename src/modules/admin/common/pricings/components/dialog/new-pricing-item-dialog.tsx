import ResponsiveDialog from "@/components/common/responsive-dialog";

import { GetPricing } from "../../types";
import PricingItemForm from "../form/pricing-item-form";

interface NewPricingItemDialogProps {
  pricing: GetPricing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewPricingItemDialog = ({
  pricing,
  open,
  onOpenChange,
}: NewPricingItemDialogProps) => {
  return (
    <ResponsiveDialog
      title="NEW"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <PricingItemForm
        pricing={pricing}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewPricingItemDialog;
