"use client";

import Image from "next/image";
import Link from "next/link";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "lucide-react";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import TipTap from "@/components/tiptap";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";

export const CourseView = ({ slug }: { slug: string }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.publics.getCourse.queryOptions({ slug })
  );

  return (
    <div className="space-y-6 pt-5">
      <div className="relative h-96 w-full overflow-hidden">
        {data.url ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
            <Image
              src={data.url}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-full w-full rounded-lg bg-gradient-to-r from-sky-300 to-sky-500 dark:from-sky-700 dark:to-sky-900" />
        )}
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
        <p className="text-muted-foreground">{data.description}</p>

        <div className="prose dark:prose-invert max-w-none">
          <TipTap content={data.content} />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link href={`/course/${data.slug}/preparations`}>
            Preparation <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/course/${data.slug}/bookings`}>
            Booking <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/course/${data.slug}/mocks`}>
            Mock <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export const CourseViewLoading = () => (
  <LoadingState
    title="Loading Course"
    description="This may take a few seconds..."
  />
);

export const CourseViewError = () => (
  <ErrorState
    title="Error Loading Course"
    description="Something went wrong!"
  />
);
