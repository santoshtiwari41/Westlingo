import React from "react";

import ResponsiveDialog from "@/components/common/responsive-dialog";

import { ReservationGetOne } from "../types";
import ReservationForm from "./reservation-form";

interface UpdategentDialogProps {
  open: boolean;
  openOpenChange: (open: boolean) => void;
  initialValues: ReservationGetOne;
}

const UpdategentDialog = ({
  open,
  openOpenChange,
  initialValues,
}: UpdategentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Reservation"
      description="Edit the reservation details"
      open={open}
      onOpenChange={openOpenChange}
    >
      <ReservationForm
        initialValues={initialValues}
        onSuccess={() => openOpenChange(false)}
        onCancel={() => openOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default UpdategentDialog;
