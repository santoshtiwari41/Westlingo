import ResponsiveDialog from "@/components/common/responsive-dialog";
import { OneOfFaqParent } from "@/types/types";

import { GetFaq } from "../../types";
import FaqsForm from "../form/faqs-form";

interface EditFaqDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: GetFaq;
  parentRef: OneOfFaqParent;
}

const EditFaqDialog = ({
  open,
  onOpenChange,
  initialValues,
  parentRef,
}: EditFaqDialogProps) => {
  return (
    <ResponsiveDialog
      title="EDIT"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <FaqsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
        parentRef={parentRef}
      />
    </ResponsiveDialog>
  );
};

export default EditFaqDialog;
