import CustomContainer from "@/components/common/custom-container";
import { EducationSection } from "@/components/home/sections/education-section";
import { FeaturedCoursesSection } from "@/components/home/sections/featured-courses-section";
import { HeroSection } from "@/components/home/sections/hero-section";

const page = () => {
  return (
    <CustomContainer className="space-y-10">
      <HeroSection />
      <HeroSection />
      <FeaturedCoursesSection />
      <EducationSection />
    </CustomContainer>
  );
};

export default page;
