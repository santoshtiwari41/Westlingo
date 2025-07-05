import { relations } from "drizzle-orm/relations";

import {
  account,
  blogs,
  courseCarouselItems,
  courseCarousels,
  courseFaqItems,
  courseFaqs,
  courseMockTests,
  coursePreparationClasses,
  coursePricingItems,
  coursePricings,
  courseTestBookings,
  courses,
  documents,
  education,
  experience,
  profile,
  reservations,
  session,
  skills,
  transactions,
  user,
} from "./schema";

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
  reservations: many(reservations),
  courses: many(courses),
  courseMockTests: many(courseMockTests),
  coursePreparationClasses: many(coursePreparationClasses),
  courseTestBookings: many(courseTestBookings),
  transactions: many(transactions),
  coursePricings: many(coursePricings),
  courseFaqs: many(courseFaqs),
  courseCarousels: many(courseCarousels),
  profiles: many(profile),
  educations: many(education),
  experiences: many(experience),
  skills: many(skills),
  documents: many(documents),
  blogs: many(blogs),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const reservationsRelations = relations(
  reservations,
  ({ one, many }) => ({
    user: one(user, {
      fields: [reservations.userId],
      references: [user.id],
    }),
    course: one(courses, {
      fields: [reservations.courseId],
      references: [courses.id],
    }),
    transactions: many(transactions),
  })
);

export const coursesRelations = relations(courses, ({ one, many }) => ({
  reservations: many(reservations),
  user: one(user, {
    fields: [courses.authorId],
    references: [user.id],
  }),
  courseMockTests: many(courseMockTests),
  coursePreparationClasses: many(coursePreparationClasses),
  courseTestBookings: many(courseTestBookings),
  coursePricings: many(coursePricings),
  courseFaqs: many(courseFaqs),
  courseCarousels: many(courseCarousels),
}));

export const courseMockTestsRelations = relations(
  courseMockTests,
  ({ one, many }) => ({
    user: one(user, {
      fields: [courseMockTests.authorId],
      references: [user.id],
    }),
    course: one(courses, {
      fields: [courseMockTests.courseId],
      references: [courses.id],
    }),
    coursePricings: many(coursePricings),
    courseFaqs: many(courseFaqs),
    courseCarousels: many(courseCarousels),
  })
);

export const coursePreparationClassesRelations = relations(
  coursePreparationClasses,
  ({ one, many }) => ({
    course: one(courses, {
      fields: [coursePreparationClasses.courseId],
      references: [courses.id],
    }),
    user: one(user, {
      fields: [coursePreparationClasses.authorId],
      references: [user.id],
    }),
    coursePricings: many(coursePricings),
    courseFaqs: many(courseFaqs),
    courseCarousels: many(courseCarousels),
  })
);

export const courseTestBookingsRelations = relations(
  courseTestBookings,
  ({ one, many }) => ({
    user: one(user, {
      fields: [courseTestBookings.authorId],
      references: [user.id],
    }),
    course: one(courses, {
      fields: [courseTestBookings.courseId],
      references: [courses.id],
    }),
    coursePricings: many(coursePricings),
    courseFaqs: many(courseFaqs),
    courseCarousels: many(courseCarousels),
  })
);

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(user, {
    fields: [transactions.userId],
    references: [user.id],
  }),
  reservation: one(reservations, {
    fields: [transactions.reservationId],
    references: [reservations.id],
  }),
}));

export const coursePricingsRelations = relations(
  coursePricings,
  ({ one, many }) => ({
    user: one(user, {
      fields: [coursePricings.authorId],
      references: [user.id],
    }),
    course: one(courses, {
      fields: [coursePricings.courseId],
      references: [courses.id],
    }),
    courseMockTest: one(courseMockTests, {
      fields: [coursePricings.mockTestId],
      references: [courseMockTests.id],
    }),
    courseTestBooking: one(courseTestBookings, {
      fields: [coursePricings.testBookingId],
      references: [courseTestBookings.id],
    }),
    coursePreparationClass: one(coursePreparationClasses, {
      fields: [coursePricings.preparationClassId],
      references: [coursePreparationClasses.id],
    }),
    coursePricingItems: many(coursePricingItems),
  })
);

export const courseFaqsRelations = relations(courseFaqs, ({ one, many }) => ({
  user: one(user, {
    fields: [courseFaqs.authorId],
    references: [user.id],
  }),
  course: one(courses, {
    fields: [courseFaqs.courseId],
    references: [courses.id],
  }),
  courseMockTest: one(courseMockTests, {
    fields: [courseFaqs.mockTestId],
    references: [courseMockTests.id],
  }),
  courseTestBooking: one(courseTestBookings, {
    fields: [courseFaqs.testBookingId],
    references: [courseTestBookings.id],
  }),
  coursePreparationClass: one(coursePreparationClasses, {
    fields: [courseFaqs.preparationClassId],
    references: [coursePreparationClasses.id],
  }),
  courseFaqItems: many(courseFaqItems),
}));

export const courseCarouselsRelations = relations(
  courseCarousels,
  ({ one, many }) => ({
    user: one(user, {
      fields: [courseCarousels.authorId],
      references: [user.id],
    }),
    course: one(courses, {
      fields: [courseCarousels.courseId],
      references: [courses.id],
    }),
    courseMockTest: one(courseMockTests, {
      fields: [courseCarousels.mockTestId],
      references: [courseMockTests.id],
    }),
    courseTestBooking: one(courseTestBookings, {
      fields: [courseCarousels.testBookingId],
      references: [courseTestBookings.id],
    }),
    coursePreparationClass: one(coursePreparationClasses, {
      fields: [courseCarousels.preparationClassId],
      references: [coursePreparationClasses.id],
    }),
    courseCarouselItems: many(courseCarouselItems),
  })
);

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}));

export const courseFaqItemsRelations = relations(courseFaqItems, ({ one }) => ({
  courseFaq: one(courseFaqs, {
    fields: [courseFaqItems.faqId],
    references: [courseFaqs.id],
  }),
}));

export const coursePricingItemsRelations = relations(
  coursePricingItems,
  ({ one }) => ({
    coursePricing: one(coursePricings, {
      fields: [coursePricingItems.pricingId],
      references: [coursePricings.id],
    }),
  })
);

export const courseCarouselItemsRelations = relations(
  courseCarouselItems,
  ({ one }) => ({
    courseCarousel: one(courseCarousels, {
      fields: [courseCarouselItems.carouselId],
      references: [courseCarousels.id],
    }),
  })
);

export const educationRelations = relations(education, ({ one }) => ({
  user: one(user, {
    fields: [education.userId],
    references: [user.id],
  }),
}));

export const experienceRelations = relations(experience, ({ one }) => ({
  user: one(user, {
    fields: [experience.userId],
    references: [user.id],
  }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  user: one(user, {
    fields: [skills.userId],
    references: [user.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(user, {
    fields: [documents.userId],
    references: [user.id],
  }),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(user, {
    fields: [blogs.authorId],
    references: [user.id],
  }),
}));
