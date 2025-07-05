import ResponsiveDialog from "@/components/common/responsive-dialog";

import { GetFaq } from "../../types";
import FaqItemForm from "../form/faq-item-form";

interface EditFaqItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: GetFaq;
  initialValues: GetFaq["items"][number];
}

const EditFaqItemDialog = ({
  data,
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
      <FaqItemForm
        faq={data}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default EditFaqItemDialog;
