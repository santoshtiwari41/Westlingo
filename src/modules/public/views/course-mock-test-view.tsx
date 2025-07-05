"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import CustomBenefits from "@/components/common/custom-benefits";
import CustomCarousels from "@/components/common/custom-carousels";
import CustomFaqs from "@/components/common/custom-faqs";
import CustomFeatures from "@/components/common/custom-features";
import CustomFlow from "@/components/common/custom-flow";
import CustomHero from "@/components/common/custom-hero";
import CustomOnlineCoaching from "@/components/common/custom-online-coaching";
import CustomPricings from "@/components/common/custom-pricings";
import CustomTestimonialsCarousel from "@/components/common/custom-testimonials-carousel";
import CustomVideo from "@/components/common/custom-video";
import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { Separator } from "@/components/ui/separator";
import { useTRPC } from "@/trpc/client";

export const CourseMockTestView = ({ slug }: { slug: string }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.publics.getCourseMockTest.queryOptions({ slug: slug })
  );
  const mockTest = data?.mockTest;

  return (
    <div className="space-y-10">
      <CustomHero
        course={data.slug}
        title={mockTest.title}
        description={mockTest.description}
      />
      <CustomVideo videoUrl={mockTest.videoUrl} />
      <CustomFeatures />
      <Separator />

      <CustomCarousels items={mockTest.carousel.items} />
      <Separator />

      <CustomFlow course={data.slug} />
      <Separator />

      <CustomOnlineCoaching
        onlineCoachingBenefits={mockTest.pricing.onlineCoachingBenefits}
        onlineCoachingBenefitsUrl={mockTest.pricing.onlineCoachingBenefitsUrl}
      />
      <CustomPricings
        items={mockTest.pricing.items}
        courseId={mockTest.courseId}
        type="mockTestaration"
      />
      <CustomBenefits
        benefits={mockTest.pricing.benefits}
        benefitUrl={mockTest.pricing.benefitsUrl}
      />
      <Separator />

      <CustomTestimonialsCarousel items={mockTest.testimonials} />
      <Separator />

      <CustomFaqs items={mockTest.faq.items} />
    </div>
  );
};

export const CourseMockTestViewLoading = () => {
  return <LoadingState title="" description="" />;
};
export const CourseMockTestViewError = () => {
  return (
    <ErrorState
      title="Error Loading Courses"
      description="Something went wrong!"
    />
  );
};
