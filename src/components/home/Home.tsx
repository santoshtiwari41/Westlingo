"use client";

import { useEffect, useState } from "react";

import { FAQS } from "@/data/config";
import { useCoursesList } from "@/hooks/queries/useCourses";

import CustomFaqs from "../common/custom-faqs";
import CustomTestimonials from "../common/custom-testimonials";
import CTASection from "./CTASection";
import FeaturedCoursesSection from "./FeaturedCoursesSection";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import { CourseWithConfig, isValidCourse } from "./homeTypes";

export default function HomeContainer() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fadeInUp = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";
  const fadeIn = isVisible ? "opacity-100" : "opacity-0";

  const { courses, isLoading } = useCoursesList({ page: 1, pageSize: 8 });

  const validCourses = ((courses as CourseWithConfig[]) || []).filter(
    isValidCourse
  );

  return (
    <div className="min-h-screen bg-white">
      <HeroSection fadeInUp={fadeInUp} />
      <ServicesSection fadeInUp={fadeInUp} />
      <FeaturedCoursesSection courses={validCourses} fadeInUp={fadeInUp} />
      <CustomTestimonials />
      <CustomFaqs items={FAQS} />
      <CTASection fadeInUp={fadeInUp} />
    </div>
  );
}
