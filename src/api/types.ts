export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  dob?: string;
  cv?: any;
  passport?: any;
  citizenship?: any;
  permanentAddress?: any;
  temporaryAddress?: any;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  isActive: boolean | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingDetails {
  course: string;
  testType: string;
  date: string | null;
  time: string;
  /** Pricing plan id (if selected) */
  plan?: string;
}

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Reservation {
  id: string;
  validFrom: string;
  validTill: string;
  isVerified: boolean | null;
  status: "processing" | "upcoming" | "active" | "completed" | "cancelled";
  type: "preparation_class" | "test_booking" | "mock_test";
  userId: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  course?: Course;
}

export interface CreateReservationData {
  courseId: string;
  type: Reservation["type"];
  validFrom: string;
  validTill: string;
  userInfo: UserInfo;
  bookingDetails: BookingDetails;
  /** Pricing plan id (if selected) */
  planId?: string;
}

export interface UpdateUserProfileData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  dob?: string;
  permanentAddress?: string;
  temporaryAddress?: string;
}

export interface GetReservationsParams {
  page?: number;
  pageSize?: number;
  courseId?: string;
  status?: "Upcoming" | "Active" | "Completed" | "Processing" | "Cancelled";
}

export interface GetCoursesParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const TEST_TYPE_MAPPING = {
  "mock-test": "mock_test" as const,
  mocktest: "mock_test" as const,
  mockTest: "mock_test" as const,
  mock_test: "mock_test" as const,
  MockTest: "mock_test" as const,
  mockTestaration: "mock_test" as const,
  mocktestaration: "mock_test" as const,
  "mock-testaration": "mock_test" as const,
  mock_testaration: "mock_test" as const,

  preparation: "preparation_class" as const,
  "preparation-class": "preparation_class" as const,
  PreparationClass: "preparation_class" as const,
  preparationClass: "preparation_class" as const,
  preparation_class: "preparation_class" as const,
  preparationclass: "preparation_class" as const,
  prep: "preparation_class" as const,
  "prep-class": "preparation_class" as const,
  prepClass: "preparation_class" as const,
  prep_class: "preparation_class" as const,

  "test-booking": "test_booking" as const,
  testbooking: "test_booking" as const,
  TestBooking: "test_booking" as const,
  testBooking: "test_booking" as const,
  test_booking: "test_booking" as const,
  testBookingaration: "test_booking" as const,
  testbookingaration: "test_booking" as const,
  "test-bookingaration": "test_booking" as const,
  test_bookingaration: "test_booking" as const,
  booking: "test_booking" as const,
  test: "test_booking" as const,
} as const;

export type UITestType = keyof typeof TEST_TYPE_MAPPING;
export type APITestType = (typeof TEST_TYPE_MAPPING)[UITestType];
