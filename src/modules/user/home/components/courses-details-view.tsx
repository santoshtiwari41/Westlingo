"use client";

import Image from "next/image";

import { useSuspenseQuery } from "@tanstack/react-query";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTRPC } from "@/trpc/client";

import CourseContent from "./CourseContent";
import CourseHeader from "./CourseHeader";
import CourseMeta from "./CourseMeta";

export const CourseDetailsView = ({ slug }: { slug: string }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.public.getCourse.queryOptions({ slug })
  );
  const { data: carousel } = useSuspenseQuery(
    trpc.carousels.getByCourseId.queryOptions({ courseId: data.id })
  );

  return (
    <div className="w-full px-10">
      <CourseHeader data={data} />
      {carousel && carousel.items && carousel.items.length > 0 && (
        <div className="mb-8">
          <Carousel>
            <CarouselContent>
              {carousel.items.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
      <CourseContent />
      <CourseMeta data={data} />
    </div>
  );
};

export const CourseDetailsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Courses"
      description="This may take a few seconds..."
    />
  );
};
export const CourseDetailsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Courses"
      description="Something went wrong!"
    />
  );
};
