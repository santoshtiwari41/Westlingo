"use client";

import Image from "next/image";
import Link from "next/link";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "lucide-react";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";

export const CoursesView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.publics.getCourses.queryOptions());

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
      {data.map((course) => (
        <Card key={course.id}>
          <CardHeader>
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
              {course?.url && (
                <Image
                  src={course.url}
                  alt={course.title}
                  fill
                  className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                />
              )}
            </AspectRatio>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>
              {course.description.substring(0, 50)}...
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" asChild>
              <Link href={`/course/${course.slug}`}>
                Explore <ArrowRightIcon />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export const CoursesViewLoading = () => {
  return (
    <LoadingState
      title="Loading Courses"
      description="This may take a few seconds..."
    />
  );
};
export const CoursesViewError = () => {
  return (
    <ErrorState
      title="Error Loading Courses"
      description="Something went wrong!"
    />
  );
};
