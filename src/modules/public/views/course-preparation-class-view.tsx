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

export const CoursePreparationClassView = ({ slug }: { slug: string }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.publics.getCoursePreparationClass.queryOptions({ slug: slug })
  );
  const prep = data?.preparationClass;

  return (
    <div className="space-y-10">
      <CustomHero
        course={data.slug}
        title={prep.title}
        description={prep.description}
      />
      <CustomVideo videoUrl={prep.videoUrl} />
      <CustomFeatures />

      <CustomCarousels items={prep.carousel.items} />
      <Separator />

      <CustomFlow course={data.slug} />
      <CustomOnlineCoaching
        onlineCoachingBenefits={prep.pricing.onlineCoachingBenefits}
        onlineCoachingBenefitsUrl={prep.pricing.onlineCoachingBenefitsUrl}
      />

      <CustomPricings
        items={prep.pricing.items}
        courseId={prep.courseId}
        type="preparation"
      />
      <CustomBenefits
        benefits={prep.pricing.benefits}
        benefitUrl={prep.pricing.benefitsUrl}
      />

      <CustomTestimonialsCarousel items={prep.testimonials} />
      <Separator />

      <CustomFaqs items={prep.faq.items} />
    </div>
  );
};

export const CoursePreparationClassViewLoading = () => {
  return <LoadingState title="" description="" />;
};
export const CoursePreparationClassViewError = () => {
  return (
    <ErrorState
      title="Error Loading Courses"
      description="Something went wrong!"
    />
  );
};
