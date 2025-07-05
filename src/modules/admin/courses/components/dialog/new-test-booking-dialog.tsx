import ResponsiveDialog from "@/components/common/responsive-dialog";

import TestBookingForm from "../form/test-booking-form";

interface NewTestBookingDialogProps {
  courseId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewTestBookingDialog = ({
  courseId,
  open,
  onOpenChange,
}: NewTestBookingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Create New Test Booking"
      description="Fill in the details to schedule a new test booking."
      open={open}
      onOpenChange={onOpenChange}
    >
      <TestBookingForm
        onSuccess={() => onOpenChange(false)} // NAVIGATE
        onCancel={() => onOpenChange(false)}
        courseId={courseId}
      />
    </ResponsiveDialog>
  );
};

export default NewTestBookingDialog;
