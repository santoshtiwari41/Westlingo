import ResponsiveDialog from "@/components/common/responsive-dialog";
import { OneOfFaqParent } from "@/types/types";

import FaqsForm from "../form/faqs-form";

interface NewFaqDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentRef: OneOfFaqParent;
}

const NewFaqDialog = ({ open, onOpenChange, parentRef }: NewFaqDialogProps) => {
  return (
    <ResponsiveDialog
      title="NEW"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <FaqsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        parentRef={parentRef}
      />
    </ResponsiveDialog>
  );
};

export default NewFaqDialog;
