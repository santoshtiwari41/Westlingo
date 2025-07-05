export type OneOfFaqParent =
  | { mockTestId: string; preparationClassId?: never; testBookingId?: never }
  | { mockTestId?: never; preparationClassId: string; testBookingId?: never }
  | { mockTestId?: never; preparationClassId?: never; testBookingId: string };
