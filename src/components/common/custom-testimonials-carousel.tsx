"use client";

import CustomSection from "./custom-section";
import { ITestimonials, TestimonialCarousel } from "./testimonial-carousel";

const CustomTestimonialsCarousel = ({ items }: { items: ITestimonials[] }) => {
  const studentTestimonials = items.filter(
    (t) => t.type?.toLowerCase() === "student"
  );
  const teacherTestimonials = items.filter(
    (t) => t.type?.toLowerCase() === "teacher"
  );

  return (
    <CustomSection>
      <h2 className="mb-12 text-center text-3xl font-bold">
        We are first choice of student because
      </h2>

      <TestimonialCarousel
        items={studentTestimonials}
        variant="student"
        autoplayDelay={4000}
      />

      <h3 className="mb-8 text-center text-2xl font-bold">
        Meet our expert IELTS Coach
      </h3>
      <TestimonialCarousel
        items={teacherTestimonials}
        variant="teacher"
        autoplayDelay={5000}
      />
    </CustomSection>
  );
};

export default CustomTestimonialsCarousel;
