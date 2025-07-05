import React from "react";

import ResponsiveDialog from "@/components/common/responsive-dialog";

import ReservationForm from "./reservation-form";

interface NewreservationDialogProps {
  open: boolean;
  openOpenChange: (open: boolean) => void;
}

const NewreservationDialog = ({
  open,
  openOpenChange,
}: NewreservationDialogProps) => {
  return (
    <ResponsiveDialog
      title="New reservation"
      description="Create a new reservation"
      open={open}
      onOpenChange={openOpenChange}
    >
      <ReservationForm
        onSuccess={() => openOpenChange(false)} // NAVIGATE
        onCancel={() => openOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewreservationDialog;
