import ResponsiveDialog from "@/components/common/responsive-dialog";

import { GetFaq } from "../../types";
import FaqItemForm from "../form/faq-item-form";

interface NewFaqItemDialogProps {
  faq: GetFaq;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewFaqItemDialog = ({
  faq,
  open,
  onOpenChange,
}: NewFaqItemDialogProps) => {
  return (
    <ResponsiveDialog
      title="NEW"
      description="DESCRIPTION"
      open={open}
      onOpenChange={onOpenChange}
    >
      <FaqItemForm
        faq={faq}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewFaqItemDialog;
