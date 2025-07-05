import ResponsiveDialog from "@/components/common/responsive-dialog";

import PreparationClassForm from "../form/preparation-class-form";

interface NewPreparationClassDialogProps {
  courseId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewPreparationClassDialog = ({
  courseId,
  open,
  onOpenChange,
}: NewPreparationClassDialogProps) => {
  return (
    <ResponsiveDialog
      title="Create New Preparation Class"
      description="Provide the necessary details to add a new preparation class."
      open={open}
      onOpenChange={onOpenChange}
    >
      <PreparationClassForm
        onSuccess={() => onOpenChange(false)} // NAVIGATE
        onCancel={() => onOpenChange(false)}
        courseId={courseId}
      />
    </ResponsiveDialog>
  );
};

export default NewPreparationClassDialog;
