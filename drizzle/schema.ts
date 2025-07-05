import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  foreignKey,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const reservationStatus = pgEnum("reservation_status", [
  "upcoming",
  "active",
  "completed",
  "processing",
  "cancelled",
]);
export const reservationType = pgEnum("reservation_type", [
  "preparation_class",
  "test_booking",
  "mock_test",
]);
export const transactionStatus = pgEnum("transaction_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export const verification = pgTable("verification", {
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const user = pgTable(
  "user",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean("email_verified").notNull(),
    image: text(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
  },
  (table) => [unique("user_email_unique").on(table.email)]
);

export const account = pgTable(
  "account",
  {
    id: text().primaryKey().notNull(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      mode: "string",
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      mode: "string",
    }),
    scope: text(),
    password: text(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "account_user_id_user_id_fk",
    }).onDelete("cascade"),
  ]
);

export const session = pgTable(
  "session",
  {
    id: text().primaryKey().notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    token: text().notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "session_user_id_user_id_fk",
    }).onDelete("cascade"),
    unique("session_token_unique").on(table.token),
  ]
);

export const reservations = pgTable(
  "reservations",
  {
    id: text().primaryKey().notNull(),
    status: reservationStatus().default("processing").notNull(),
    userId: text("user_id").notNull(),
    courseId: text("course_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    validFrom: timestamp("valid_from", { mode: "string" })
      .defaultNow()
      .notNull(),
    validTill: timestamp("valid_till", { mode: "string" })
      .defaultNow()
      .notNull(),
    isVerified: boolean("is_verified").default(false),
    type: reservationType().default("preparation_class").notNull(),
    time: text().notNull(),
    seats: integer().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "reservations_user_id_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "reservations_course_id_courses_id_fk",
    }).onDelete("cascade"),
  ]
);

export const courses = pgTable(
  "courses",
  {
    id: text().primaryKey().notNull(),
    slug: text().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    content: text().default("HELLO WORLD!").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    isActive: boolean("is_active").default(false),
    authorId: text("author_id").notNull(),
    url: text(),
    appId: text("app_id"),
    config: jsonb(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [user.id],
      name: "courses_author_id_user_id_fk",
    }).onDelete("cascade"),
  ]
);

export const courseMockTests = pgTable(
  "course_mock_tests",
  {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    content: text().default("HELLO WORLD!").notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    authorId: text("author_id").notNull(),
    courseId: text("course_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [user.id],
      name: "course_mock_tests_author_id_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "course_mock_tests_course_id_courses_id_fk",
    }).onDelete("cascade"),
  ]
);

export const coursePreparationClasses = pgTable(
  "course_preparation_classes",
  {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    content: text().default("HELLO WORLD!").notNull(),
    isActive: boolean("is_active").default(false),
    courseId: text("course_id").notNull(),
    authorId: text("author_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "course_preparation_classes_course_id_courses_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [user.id],
      name: "course_preparation_classes_author_id_user_id_fk",
    }).onDelete("cascade"),
  ]
);

export const courseTestBookings = pgTable(
  "course_test_bookings",
  {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    content: text().default("HELLO WORLD!").notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    authorId: text("author_id").notNull(),
    courseId: text("course_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [user.id],
      name: "course_test_bookings_author_id_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "course_test_bookings_course_id_courses_id_fk",
    }).onDelete("cascade"),
  ]
);

export const transactions = pgTable(
  "transactions",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    paymentMethod: text("payment_method").notNull(),
    isVerified: boolean("is_verified").default(false).notNull(),
    imageUrl: text("image_url").notNull(),
    status: transactionStatus().default("paid").notNull(),
    userId: text("user_id").notNull(),
    reservationId: text("reservation_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "transactions_user_id_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.reservationId],
      foreignColumns: [reservations.id],
      name: "transactions_reservation_id_reservations_id_fk",
    }).onDelete("cascade"),
  ]
);

export const coursePricings = pgTable(
  "course_pricings",
  {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    description: text(),
    authorId: text("author_id").notNull(),
    courseId: text("course_id"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    mockTestId: text("mock_test_id"),
    preparationClassId: text("preparation_class_id"),
    testBookingId: text("test_booking_id"),
    isActive: boolean("is_active").default(false).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [user.id],
      name: "course_pricings_author_id_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "course_pricings_course_id_courses_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.mockTestId],
      foreignColumns: [courseMockTests.id],
      name: "course_pricings_mock_test_id_course_mock_tests_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.testBookingId],
      foreignColumns: [courseTestBookings.id],
      name: "course_pricings_test_booking_id_course_test_bookings_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.preparationClassId],
      foreignColumns: [coursePreparationClasses.id],
      name: "course_pricings_preparation_class_id_course_preparation_classes",
    }).onDelete("cascade"),
    unique("course_pricings_mock_test_id_unique").on(table.mockTestId),
    unique("course_pricings_preparation_class_id_unique").on(
      table.preparationClassId
    ),
    unique("course_pricings_test_booking_id_unique").on(table.testBookingId),
  ]
);

export const courseFaqs = pgTable(
  "course_faqs",
  {
    id: text().primaryKey().notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    authorId: text("author_id").notNull(),
    courseId: text("course_id"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    mockTestId: text("mock_test_id"),
    preparationClassId: text("preparation_class_id"),
    testBookingId: text("test_booking_id"),
    title: text().notNull(),
    description: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [user.id],
      name: "course_faqs_author_id_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "course_faqs_course_id_courses_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.mockTestId],
      foreignColumns: [courseMockTests.id],
      name: "course_faqs_mock_test_id_course_mock_tests_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.testBookingId],
      foreignColumns: [courseTestBookings.id],
      name: "course_faqs_test_booking_id_course_test_bookings_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.preparationClassId],
      foreignColumns: [coursePreparationClasses.id],
      name: "course_faqs_preparation_class_id_course_preparation_classes_id_",
    }).onDelete("cascade"),
    unique("course_faqs_mock_test_id_unique").on(table.mockTestId),
    unique("course_faqs_preparation_class_id_unique").on(
      table.preparationClassId
    ),
    unique("course_faqs_test_booking_id_unique").on(table.testBookingId),
  ]
);

export const courseCarousels = pgTable(
  "course_carousels",
  {
    id: text().primaryKey().notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    authorId: text("author_id").notNull(),
    courseId: text("course_id"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    mockTestId: text("mock_test_id"),
    preparationClassId: text("preparation_class_id"),
    testBookingId: text("test_booking_id"),
    title: text().notNull(),
    description: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [user.id],
      name: "course_carousels_author_id_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "course_carousels_course_id_courses_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.mockTestId],
      foreignColumns: [courseMockTests.id],
      name: "course_carousels_mock_test_id_course_mock_tests_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.testBookingId],
      foreignColumns: [courseTestBookings.id],
      name: "course_carousels_test_booking_id_course_test_bookings_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.preparationClassId],
      foreignColumns: [coursePreparationClasses.id],
      name: "course_carousels_preparation_class_id_course_preparation_classe",
    }).onDelete("cascade"),
    unique("course_carousels_mock_test_id_unique").on(table.mockTestId),
    unique("course_carousels_preparation_class_id_unique").on(
      table.preparationClassId
    ),
    unique("course_carousels_test_booking_id_unique").on(table.testBookingId),
  ]
);

export const profile = pgTable(
  "profile",
  {
    id: text().primaryKey().notNull(),
    cv: jsonb(),
    dob: date().notNull(),
    passport: jsonb(),
    citizenship: jsonb(),
    phoneNumber: text("phone_number"),
    permanentAddress: jsonb("permanent_address"),
    temporaryAddress: jsonb("temporary_address"),
    userId: text("user_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    firstName: text("first_name"),
    middleName: text("middle_name"),
    lastName: text("last_name"),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "profile_user_id_user_id_fk",
    }).onDelete("cascade"),
    unique("profile_user_id_unique").on(table.userId),
  ]
);

export const courseFaqItems = pgTable(
  "course_faq_items",
  {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    faqId: text("faq_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.faqId],
      foreignColumns: [courseFaqs.id],
      name: "course_faq_items_faq_id_course_faqs_id_fk",
    }).onDelete("cascade"),
  ]
);

export const coursePricingItems = pgTable(
  "course_pricing_items",
  {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    description: text(),
    features: text().array().notNull(),
    price: numeric({ precision: 10, scale: 2 }).default("100.00").notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    pricingId: text("pricing_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.pricingId],
      foreignColumns: [coursePricings.id],
      name: "course_pricing_items_pricing_id_course_pricings_id_fk",
    }).onDelete("cascade"),
  ]
);

export const courseCarouselItems = pgTable(
  "course_carousel_items",
  {
    id: text().primaryKey().notNull(),
    appId: text("app_id").notNull(),
    url: text().notNull(),
    carouselId: text("carousel_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    order: integer().default(0).notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    name: text().notNull(),
    size: numeric().notNull(),
    type: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.carouselId],
      foreignColumns: [courseCarousels.id],
      name: "course_carousel_items_carousel_id_course_carousels_id_fk",
    }).onDelete("cascade"),
  ]
);

export const education = pgTable(
  "education",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    degree: text().notNull(),
    institution: text().notNull(),
    year: text().notNull(),
    gpa: text(),
    description: text(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "education_user_id_user_id_fk",
    }).onDelete("cascade"),
    unique("education_user_id_degree_unique").on(table.userId, table.degree),
  ]
);

export const experience = pgTable(
  "experience",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    company: text().notNull(),
    position: text().notNull(),
    startDate: text("start_date").notNull(),
    endDate: text("end_date"),
    description: text(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "experience_user_id_user_id_fk",
    }).onDelete("cascade"),
  ]
);

export const skills = pgTable(
  "skills",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    name: text().notNull(),
    category: text().notNull(),
    level: text().notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "skills_user_id_user_id_fk",
    }).onDelete("cascade"),
  ]
);

export const documents = pgTable(
  "documents",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    name: text().notNull(),
    type: text().notNull(),
    size: text().notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    appId: text("app_id").notNull(),
    url: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "documents_user_id_user_id_fk",
    }).onDelete("cascade"),
  ]
);

export const blogs = pgTable(
  "blogs",
  {
    id: text().primaryKey().notNull(),
    slug: text().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    content: text().notNull(),
    isActive: boolean("is_active").default(false),
    authorId: text("author_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    image: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [user.id],
      name: "blogs_author_id_user_id_fk",
    }).onDelete("cascade"),
  ]
);

export const testimonials = pgTable("testimonials", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  image: text(),
  quote: text().notNull(),
  isActive: boolean("is_active").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
  bio: text(),
});
