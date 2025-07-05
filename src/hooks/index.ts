import {
  useBookingMutations,
  useBookingsManager,
} from "./mutations/useBookings";
import { useCourseMutations } from "./mutations/useCourses";
import { useUserReservations } from "./queries/useBookings";
import {
  useAdminCourses,
  useCourseDetail,
  useCoursesList,
} from "./queries/useCourses";
import { useUserProfile } from "./queries/useUserProfile";

export * from "./queries/useUserProfile";
export * from "./queries/useCourses";
export * from "./queries/useBookings";
export * from "./mutations/useBookings";
export * from "./mutations/useCourses";

export const hooks = {
  useUserProfile,
  useCoursesList,
  useCourseDetail,
  useAdminCourses,
  useCourseMutations,
  useUserReservations,
  useBookingMutations,
  useBookingsManager,
};
