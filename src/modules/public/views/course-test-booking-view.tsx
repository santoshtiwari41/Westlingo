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

export const CourseTestBookingView = ({ slug }: { slug: string }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.publics.getCourseTestBooking.queryOptions({ slug: slug })
  );
  const testBooking = data?.testBooking;

  return (
    <div className="space-y-10">
      <CustomHero
        course={data.slug}
        title={testBooking.title}
        description={testBooking.description}
      />
      <CustomVideo videoUrl={testBooking.videoUrl} />
      <CustomFeatures />

      <CustomCarousels items={testBooking.carousel.items} />
      <Separator />

      <CustomFlow course={data.slug} />
      <CustomOnlineCoaching
        onlineCoachingBenefits={testBooking.pricing.onlineCoachingBenefits}
        onlineCoachingBenefitsUrl={
          testBooking.pricing.onlineCoachingBenefitsUrl
        }
      />

      <CustomPricings
        items={testBooking.pricing.items}
        courseId={testBooking.courseId}
        type="testBookingaration"
      />
      <CustomBenefits
        benefits={testBooking.pricing.benefits}
        benefitUrl={testBooking.pricing.benefitsUrl}
      />

      <CustomTestimonialsCarousel items={testBooking.testimonials} />
      <Separator />

      <CustomFaqs items={testBooking.faq.items} />
    </div>
  );
};

export const CourseTestBookingViewLoading = () => {
  return (
    <LoadingState
      title="Loading Courses"
      description="This may take a few seconds..."
    />
  );
};
export const CourseTestBookingViewError = () => {
  return (
    <ErrorState
      title="Error Loading Courses"
      description="Something went wrong!"
    />
  );
};
