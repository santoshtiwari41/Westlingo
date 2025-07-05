import { db } from "..";
import {
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
} from "../schema";

const authorId = "uKFqQJ50RfR7mqEMVHP5OE9aFm6ChHzD";
const COURSES = [
  {
    title: "PTE Preparation Course",
    slug: "pte",
    description: "Comprehensive training for Pearson Test of English.",
    content:
      "<p>This course covers <strong>speaking</strong>, <em>writing</em>, reading, and listening modules with expert strategies.</p>",
    url: "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp",
    authorId: authorId,
    isActive: true,
  },
  {
    title: "IELTS Preparation Course",
    slug: "ielts",
    description: "Ace your IELTS test with our structured program.",
    content:
      "<p>Includes:</p><ul><li>Full mock tests</li><li>Skill-wise coaching</li><li>Band improvement techniques</li></ul>",
    url: "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp",
    authorId: authorId,
    isActive: true,
  },
  {
    title: "SAT Coaching Program",
    slug: "sat",
    description: "Boost your SAT scores with expert guidance.",
    content:
      "<p>Focus areas include <strong>Math</strong>, <em>Evidence-Based Reading</em>, Writing, and optional Essay sessions.</p>",
    url: "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp",
    authorId: authorId,
    isActive: true,
  },
  {
    title: "TOEFL Training Course",
    slug: "tofel",
    description: "Focused training to achieve high scores in TOEFL.",
    content:
      "<p>Includes <strong>practice tests</strong>, <em>personalized feedback</em>, and intensive speaking drills.</p>",
    url: "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp",
    authorId: authorId,
    isActive: true,
  },
  {
    title: "JLPT/NAT Language Course",
    slug: "nat",
    description: "Learn Japanese and prepare for NAT/JLPT exams.",
    content:
      "<p>Our course includes grammar, vocabulary, kanji, and listening practice to help you succeed.</p>",
    url: "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp",
    authorId: authorId,
    isActive: true,
  },
  {
    title: "Duolingo English Test Course",
    slug: "duolingo",
    description: "Prepare for the Duolingo English Test efficiently.",
    content:
      "<p>This course focuses on <strong>adaptive questions</strong>, timed simulations, and real test formats.</p>",
    url: "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp",
    authorId: authorId,
    isActive: true,
  },
];
const CAROUSELS = [
  {
    title: "Title 1",
    description: "Description 1",
    isActive: true,
    url: "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp",
    name: "",
    type: "image",
    size: 56832,
    appId: "courses/lnga57td7yjaayosv6r5",
    order: 1,
    authorId: authorId,
  },
  {
    title: "Title 2",
    description: "Description 2",
    isActive: true,
    url: "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp",
    name: "",
    type: "image",
    size: 56832,
    appId: "courses/lnga57td7yjaayosv6r5",
    order: 2,
    authorId: authorId,
  },
  {
    title: "Title 3",
    description: "Description 3",
    isActive: true,
    url: "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751477715/courses/lnga57td7yjaayosv6r5.webp",
    name: "",
    type: "image",
    size: 56832,
    appId: "courses/lnga57td7yjaayosv6r5",
    order: 3,
    authorId: authorId,
  },
];

const FAQS = [
  {
    title: "How do I enroll in a course?",
    description:
      "You can enroll through our website or visit our office for manual registration.",
    isActive: true,
  },
  {
    title: "Do you provide certificates?",
    description:
      "Yes, we provide a certificate upon successful completion of each course.",
    isActive: true,
  },
  {
    title: "Can I get a refund after enrollment?",
    description:
      "Refunds are available within the first 3 days of enrollment subject to terms and conditions.",
    isActive: true,
  },
  {
    title: "What materials will I receive?",
    description:
      "Students receive comprehensive study materials including PDFs, practice tests, and video lectures.",
    isActive: true,
  },
  {
    title: "Are there any prerequisites for joining?",
    description:
      "Basic language proficiency is required depending on the course.",
    isActive: true,
  },
  {
    title: "How are the classes conducted?",
    description:
      "Classes are conducted online, in-person, or hybrid depending on the package.",
    isActive: true,
  },
];

const PRICINGS = [
  {
    title: "Basic Package",
    description: "Essential features for self-paced learners.",
    features: [
      "Access to recorded lectures",
      "Weekly assignments",
      "Basic grammar & vocabulary sessions",
      "Discussion forum access",
      "1 mock test",
    ],
    price: "5000",
    isActive: true,
    authorId: authorId,
  },
  {
    title: "Standard Package",
    description: "Ideal for students needing full support.",
    features: [
      "Live interactive classes",
      "5 full-length mock tests",
      "Comprehensive study materials (PDF + hard copy)",
      "Speaking and writing feedback",
      "Progress tracking dashboard",
      "Doubt clearing sessions",
    ],
    price: "10000",
    isActive: true,
    authorId: authorId,
  },
  {
    title: "Premium Package",
    description: "Includes everything in Standard plus 1-on-1 mentorship.",
    features: [
      "Personal coaching with expert",
      "Unlimited speaking & writing evaluations",
      "Priority support & scheduling",
      "Daily progress reports",
      "Access to premium resource library",
      "University application guidance",
      "Visa documentation support",
    ],
    price: "15000",
    isActive: true,
    authorId: authorId,
  },
];

export async function main() {
  for (const course of COURSES) {
    const [courseInserted] = await db
      .insert(courses)
      .values(course)
      .returning({ courseId: courses.id });
    const courseId = courseInserted.courseId;

    const blocks = [
      {
        type: "Test Booking",
        insertTable: courseTestBookings,
      },
      {
        type: "Preparation Class",
        insertTable: coursePreparationClasses,
      },
      {
        type: "Mock Test",
        insertTable: courseMockTests,
      },
    ];

    for (const block of blocks) {
      const [parentInserted] = await db
        .insert(block.insertTable)
        .values({
          courseId,
          title: `${course.title} ${block.type}`,
          description: `${block.type} for ${course.title}`,
          content: `<p>This is the ${block.type.toLowerCase()} content for ${course.title}.</p>`,
          authorId: authorId,
        })
        .returning({ id: block.insertTable.id });

      const parentId = parentInserted.id;

      const [pricingGroup] = await db
        .insert(coursePricings)
        .values({
          [`${block.insertTable === courseTestBookings ? "testBookingId" : block.insertTable === coursePreparationClasses ? "preparationClassId" : "mockTestId"}`]:
            parentId,
          title: `${course.title} ${block.type} Pricing`,
          description: `Pricing options for ${block.type.toLowerCase()} of ${course.title}`,
          authorId: authorId,
        })
        .returning({ pricingId: coursePricings.id });
      for (const pricing of PRICINGS) {
        await db.insert(coursePricingItems).values({
          ...pricing,
          pricingId: pricingGroup.pricingId,
        });
      }

      const [carouselGroup] = await db
        .insert(courseCarousels)
        .values({
          [`${block.insertTable === courseTestBookings ? "testBookingId" : block.insertTable === coursePreparationClasses ? "preparationClassId" : "mockTestId"}`]:
            parentId,
          title: `${course.title} ${block.type} Carousel`,
          description: `Carousel items for ${block.type.toLowerCase()} of ${course.title}`,
          authorId: authorId,
        })
        .returning({ carouselId: courseCarousels.id });
      for (const carousel of CAROUSELS) {
        await db.insert(courseCarouselItems).values({
          ...carousel,
          carouselId: carouselGroup.carouselId,
        });
      }

      const [faqGroup] = await db
        .insert(courseFaqs)
        .values({
          [`${block.insertTable === courseTestBookings ? "testBookingId" : block.insertTable === coursePreparationClasses ? "preparationClassId" : "mockTestId"}`]:
            parentId,
          title: `${course.title} ${block.type} FAQs`,
          description: `FAQs for ${block.type.toLowerCase()} of ${course.title}`,
          authorId: authorId,
        })
        .returning({ faqId: courseFaqs.id });
      for (const faq of FAQS) {
        await db.insert(courseFaqItems).values({
          ...faq,
          faqId: faqGroup.faqId,
        });
      }
    }
  }

  console.log("COMPLETED!!");
}
