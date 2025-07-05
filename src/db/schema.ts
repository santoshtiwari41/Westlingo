import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// PERSONAL INFORMATION
export const userRelations = relations(user, ({ one, many }) => ({
  profile: one(profile, {
    fields: [user.id],
    references: [profile.userId],
  }),
  skills: many(skills),
  education: many(education),
  experience: many(experience),
  documents: many(documents),
  blogs: many(blogs),
}));

export const profile = pgTable("profile", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  firstName: text("first_name"),
  middleName: text("middle_name"),
  lastName: text("last_name"),
  cv: jsonb("cv"),
  dob: date("dob").notNull(),
  passport: jsonb("passport"),
  citizenship: jsonb("citizenship"),
  phoneNumber: text("phone_number"),
  permanentAddress: jsonb("permanent_address"),
  temporaryAddress: jsonb("temporary_address"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}));

export const education = pgTable(
  "education",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    degree: text("degree").notNull(),
    institution: text("institution").notNull(),
    year: text("year").notNull(),
    gpa: text("gpa"),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    uniqueUserDegree: unique().on(table.userId, table.degree),
  })
);
export const educationRelations = relations(education, ({ one }) => ({
  user: one(user, {
    fields: [education.userId],
    references: [user.id],
  }),
}));

export const experience = pgTable("experience", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  company: text("company").notNull(),
  position: text("position").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const experienceRelations = relations(experience, ({ one }) => ({
  user: one(user, {
    fields: [experience.userId],
    references: [user.id],
  }),
}));

export const skills = pgTable("skills", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const skillsRelations = relations(skills, ({ one }) => ({
  user: one(user, {
    fields: [skills.userId],
    references: [user.id],
  }),
}));

export const documents = pgTable("documents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: text("size").notNull(),
  appId: text("app_id").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(user, {
    fields: [documents.userId],
    references: [user.id],
  }),
}));

export const reservationStatus = pgEnum("reservation_status", [
  "upcoming",
  "active",
  "completed",
  "processing",
  "cancelled",
]);
export const transactionStatus = pgEnum("transaction_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);
export const reservationType = pgEnum("reservation_type", [
  "preparation_class",
  "test_booking",
  "mock_test",
]);

export const courses = pgTable("courses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull().default("HELLO WORLD!"),
  url: text("url"),
  appId: text("app_id"),
  config: jsonb("config"),
  isActive: boolean("is_active").default(false),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const coursesRelations = relations(courses, ({ one, many }) => ({
  preparationClass: one(coursePreparationClasses, {
    fields: [courses.id],
    references: [coursePreparationClasses.courseId],
  }),
  mockTest: one(courseMockTests, {
    fields: [courses.id],
    references: [courseMockTests.courseId],
  }),
  testBooking: one(courseTestBookings, {
    fields: [courses.id],
    references: [courseTestBookings.courseId],
  }),
  pricing: one(coursePricings, {
    fields: [courses.id],
    references: [coursePricings.courseId],
  }),
  faqs: many(courseFaqs),
  carousels: many(courseCarousels),
  pricings: many(coursePricings),
}));

export const coursePreparationClasses = pgTable("course_preparation_classes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull().default("HELLO WORLD!"),
  isActive: boolean("is_active").default(false), // REMOVE
  videoUrl: text("video_url")
    .notNull()
    .default("https://www.youtube.com/embed/zojh-_mJP2E?si=vPDhvLzRBtEj8fFI"),
  courseId: text("course_id")
    .notNull()
    .unique()
    .references(() => courses.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const coursePreparationClassesRelations = relations(
  coursePreparationClasses,
  ({ one, many }) => ({
    faq: one(courseFaqs, {
      fields: [coursePreparationClasses.id],
      references: [courseFaqs.preparationClassId],
    }),
    carousel: one(courseCarousels, {
      fields: [coursePreparationClasses.id],
      references: [courseCarousels.preparationClassId],
    }),
    pricing: one(coursePricings, {
      fields: [coursePreparationClasses.id],
      references: [coursePricings.preparationClassId],
    }),
    course: one(courses, {
      fields: [coursePreparationClasses.courseId],
      references: [courses.id],
    }),
    testimonials: many(testimonials),
  })
);

export const courseMockTests = pgTable("course_mock_tests", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull().default("HELLO WORLD!"),
  isActive: boolean("is_active").notNull().default(false), // REMOVE
  videoUrl: text("video_url")
    .notNull()
    .default("https://www.youtube.com/embed/zojh-_mJP2E?si=vPDhvLzRBtEj8fFI"),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  courseId: text("course_id")
    .notNull()
    .unique()
    .references(() => courses.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const courseMockTestsRelations = relations(
  courseMockTests,
  ({ one, many }) => ({
    faq: one(courseFaqs, {
      fields: [courseMockTests.id],
      references: [courseFaqs.mockTestId],
    }),
    carousel: one(courseCarousels, {
      fields: [courseMockTests.id],
      references: [courseCarousels.mockTestId],
    }),
    pricing: one(coursePricings, {
      fields: [courseMockTests.id],
      references: [coursePricings.mockTestId],
    }),
    course: one(courses, {
      fields: [courseMockTests.courseId],
      references: [courses.id],
    }),
    testimonials: many(testimonials),
  })
);

export const courseTestBookings = pgTable("course_test_bookings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull().default("HELLO WORLD!"),
  isActive: boolean("is_active").notNull().default(false), // REMOVE
  videoUrl: text("video_url")
    .notNull()
    .default("https://www.youtube.com/embed/zojh-_mJP2E?si=vPDhvLzRBtEj8fFI"),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  courseId: text("course_id")
    .notNull()
    .unique()
    .references(() => courses.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const courseTestBookingsRelations = relations(
  courseTestBookings,
  ({ one, many }) => ({
    faq: one(courseFaqs, {
      fields: [courseTestBookings.id],
      references: [courseFaqs.testBookingId],
    }),
    carousel: one(courseCarousels, {
      fields: [courseTestBookings.id],
      references: [courseCarousels.testBookingId],
    }),
    pricing: one(coursePricings, {
      fields: [courseTestBookings.id],
      references: [coursePricings.testBookingId],
    }),
    course: one(courses, {
      fields: [courseTestBookings.courseId],
      references: [courses.id],
    }),
    testimonials: many(testimonials),
  })
);
export const coursePricings = pgTable("course_pricings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  isActive: boolean("is_active").notNull().default(false), // REMOVE
  title: text("title").notNull(),
  benefits: text("benefits")
    .array()
    .notNull()
    .default([
      "Learn useful grammar and vocabulary",
      "Build confidence through practice and feedback",
      "Develop effective test-taking strategies",
      "Get familiar with the IELTS test format",
      "Improve your English language skills",
      "Practice with authentic IELTS materials",
      "Receive personalized feedback from expert instructors",
      "Access both live and pre-recorded study materials",
      "Join a supportive community of fellow test-takers",
    ]), // TODO: UPDATE
  benefitsUrl: text("benefits_url")
    .notNull()
    .default(
      "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp"
    ),
  onlineCoachingBenefits: text("online_coaching_benefits")
    .array()
    .notNull()
    .default([
      "Flexible scheduling",
      "Affordable pricing",
      "Personalized approach Classes",
      "Online expert 1-1 & group sessions",
      "Perfect for academic or general training IELTS",
    ]), // TODO: UPDATE
  onlineCoachingBenefitsUrl: text("online_coaching_benefits_url")
    .notNull()
    .default(
      "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp"
    ),
  description: text("description"),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  mockTestId: text("mock_test_id")
    .unique()
    .references(() => courseMockTests.id, {
      onDelete: "cascade",
    }),
  preparationClassId: text("preparation_class_id")
    .unique()
    .references(() => coursePreparationClasses.id, { onDelete: "cascade" }),
  testBookingId: text("test_booking_id")
    .unique()
    .references(() => courseTestBookings.id, { onDelete: "cascade" }),
  courseId: text("course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const coursePricingsRelations = relations(
  coursePricings,
  ({ many, one }) => ({
    items: many(coursePricingItems),
    course: one(courses, {
      fields: [coursePricings.courseId],
      references: [courses.id],
    }),
    preparationClass: one(coursePreparationClasses, {
      fields: [coursePricings.preparationClassId],
      references: [coursePreparationClasses.id],
    }),
    mockTest: one(courseMockTests, {
      fields: [coursePricings.mockTestId],
      references: [courseMockTests.id],
    }),
    testBooking: one(courseTestBookings, {
      fields: [coursePricings.testBookingId],
      references: [courseTestBookings.id],
    }),
  })
);
export const coursePricingItems = pgTable("course_pricing_items", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description"),
  features: text("features").array().notNull(),
  price: numeric("price", { precision: 10, scale: 2, mode: "string" })
    .notNull()
    .default("100.00"),
  isActive: boolean("is_active").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  pricingId: text("pricing_id")
    .notNull()
    .references(() => coursePricings.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export const coursePricingItemsRelations = relations(
  coursePricingItems,
  ({ one }) => ({
    pricing: one(coursePricings, {
      fields: [coursePricingItems.pricingId],
      references: [coursePricings.id],
    }),
  })
);

export const courseCarousels = pgTable("course_carousels", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(false), // REMOVE
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  mockTestId: text("mock_test_id")
    .unique()
    .references(() => courseMockTests.id, {
      onDelete: "cascade",
    }),
  preparationClassId: text("preparation_class_id")
    .unique()
    .references(() => coursePreparationClasses.id, { onDelete: "cascade" }),
  testBookingId: text("test_booking_id")
    .unique()
    .references(() => courseTestBookings.id, { onDelete: "cascade" }),
  courseId: text("course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const courseCarouselsRelations = relations(
  courseCarousels,
  ({ many, one }) => ({
    items: many(courseCarouselItems),
    course: one(courses, {
      fields: [courseCarousels.courseId],
      references: [courses.id],
    }),
    preparationClass: one(coursePreparationClasses, {
      fields: [courseCarousels.preparationClassId],
      references: [coursePreparationClasses.id],
    }),
    mockTest: one(courseMockTests, {
      fields: [courseCarousels.mockTestId],
      references: [courseMockTests.id],
    }),
    testBooking: one(courseTestBookings, {
      fields: [courseCarousels.testBookingId],
      references: [courseTestBookings.id],
    }),
  })
);
export const courseCarouselItems = pgTable("course_carousel_items", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  size: numeric("size", { mode: "number" }).notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  appId: text("app_id").notNull(),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(false),
  carouselId: text("carousel_id")
    .notNull()
    .references(() => courseCarousels.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const courseCarouselItemsRelations = relations(
  courseCarouselItems,
  ({ one }) => ({
    carousel: one(courseCarousels, {
      fields: [courseCarouselItems.carouselId],
      references: [courseCarousels.id],
    }),
  })
);

export const courseFaqs = pgTable("course_faqs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(false), // REMOVE
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  mockTestId: text("mock_test_id")
    .unique()
    .references(() => courseMockTests.id, {
      onDelete: "cascade",
    }),
  preparationClassId: text("preparation_class_id")
    .unique()
    .references(() => coursePreparationClasses.id, { onDelete: "cascade" }),
  testBookingId: text("test_booking_id")
    .unique()
    .references(() => courseTestBookings.id, { onDelete: "cascade" }),
  courseId: text("course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const courseFaqsRelations = relations(courseFaqs, ({ many, one }) => ({
  items: many(courseFaqItems),
  course: one(courses, {
    fields: [courseFaqs.courseId],
    references: [courses.id],
  }),
  preparationClass: one(coursePreparationClasses, {
    fields: [courseFaqs.preparationClassId],
    references: [coursePreparationClasses.id],
  }),
  mockTest: one(courseMockTests, {
    fields: [courseFaqs.mockTestId],
    references: [courseMockTests.id],
  }),
  testBooking: one(courseTestBookings, {
    fields: [courseFaqs.testBookingId],
    references: [courseTestBookings.id],
  }),
}));
export const courseFaqItems = pgTable("course_faq_items", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  faqId: text("faq_id")
    .notNull()
    .references(() => courseFaqs.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const courseFaqItemsRelations = relations(courseFaqItems, ({ one }) => ({
  faq: one(courseFaqs, {
    fields: [courseFaqItems.faqId],
    references: [courseFaqs.id],
  }),
}));

export const reservations = pgTable("reservations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  validFrom: timestamp("valid_from").notNull().defaultNow(),
  validTill: timestamp("valid_till").notNull().defaultNow(),
  isVerified: boolean("is_verified").default(false),
  status: reservationStatus("status").notNull().default("processing"),
  type: reservationType("type").notNull().default("preparation_class"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  courseId: text("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  slotId: text("slot_id").references(() => reservationSlots.id, {
    onDelete: "set null",
  }),
  planId: text("plan_id").references(() => coursePricingItems.id, {
    onDelete: "set null",
  }),
});
export const transactions = pgTable("transactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  imageUrl: text("image_url").notNull(),
  status: transactionStatus("status").notNull().default("paid"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  reservationId: text("reservation_id")
    .notNull()
    .references(() => reservations.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogs = pgTable("blogs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  isActive: boolean("is_active").default(false),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const blogsRelations = relations(blogs, ({ one }) => ({
  author: one(user, {
    fields: [blogs.authorId],
    references: [user.id],
  }),
}));

export const testimonials = pgTable("testimonials", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  image: text("image"),
  type: text("type").default("student"), // student or teacher
  quote: text("quote").notNull(),
  isActive: boolean("is_active").default(false).notNull(),
  bio: text("bio"),

  mockTestId: text("mock_test_id").references(() => courseMockTests.id, {
    onDelete: "cascade",
  }),
  preparationClassId: text("preparation_class_id").references(
    () => coursePreparationClasses.id,
    { onDelete: "cascade" }
  ),
  testBookingId: text("test_booking_id").references(
    () => courseTestBookings.id,
    { onDelete: "cascade" }
  ),
  courseId: text("course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  course: one(courses, {
    fields: [testimonials.courseId],
    references: [courses.id],
  }),
  preparationClass: one(coursePreparationClasses, {
    fields: [testimonials.preparationClassId],
    references: [coursePreparationClasses.id],
  }),
  mockTest: one(courseMockTests, {
    fields: [testimonials.mockTestId],
    references: [courseMockTests.id],
  }),
  testBooking: one(courseTestBookings, {
    fields: [testimonials.testBookingId],
    references: [courseTestBookings.id],
  }),
}));

export const reservationSlots = pgTable("reservation_slots", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  type: reservationType("type").notNull().default("preparation_class"),
  courseId: text("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  time: text("time").notNull(),
  seats: integer("seats").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const courseTypePricing = pgTable("course_type_pricing", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: text("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  tier: text("tier").notNull(),
  price: numeric("price", {
    precision: 10,
    scale: 2,
    mode: "string",
  }).notNull(),
  features: text("features").array().notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const courseTypePricingRelations = relations(
  courseTypePricing,
  ({ one }) => ({
    course: one(courses, {
      fields: [courseTypePricing.courseId],
      references: [courses.id],
    }),
  })
);

export const paymentQr = pgTable("payment_qr", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  url: text("url").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  uploadedBy: text("uploaded_by"),
});

export const writingTypes = pgTable("writing_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const writingTiers = pgTable("writing_tiers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const visaTypes = pgTable("visa_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const writing = pgTable("writing", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  writingTypeId: integer("writing_type_id")
    .references(() => writingTypes.id)
    .notNull(),

  tierId: integer("tier_id")
    .references(() => writingTiers.id)
    .notNull(),
  country: text("country").notNull(),
  visaTypeId: integer("visa_type_id")
    .references(() => visaTypes.id)
    .notNull(),

  price: numeric("price", { precision: 10, scale: 2 }).notNull(),

  estimatedDays: integer("estimated_days"),
  description: text("description"),
  status: text("status").default("pending"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const writingRequestsRelations = relations(writing, ({ one }) => ({
  user: one(user, {
    fields: [writing.userId],
    references: [user.id],
  }),
  writingType: one(writingTypes, {
    fields: [writing.writingTypeId],
    references: [writingTypes.id],
  }),
  tier: one(writingTiers, {
    fields: [writing.tierId],
    references: [writingTiers.id],
  }),
  visaType: one(visaTypes, {
    fields: [writing.visaTypeId],
    references: [visaTypes.id],
  }),
}));

export const writingTypeTierPricing = pgTable("writing_type_tier_pricing", {
  id: serial("id").primaryKey(),
  writingTypeId: integer("writing_type_id")
    .references(() => writingTypes.id)
    .notNull(),
  tierId: integer("tier_id")
    .references(() => writingTiers.id)
    .notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const transactionWriting = pgTable("transaction_writing", {
  id: serial("id").primaryKey(),
  writingId: integer("writing_id")
    .references(() => writing.id)
    .notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
