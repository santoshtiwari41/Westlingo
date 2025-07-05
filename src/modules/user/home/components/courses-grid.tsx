import Image from "next/image";
import Link from "next/link";

import { format } from "date-fns";
import { EyeIcon, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CoursesGrid = ({
  items,
  isLoading,
}: {
  items: any[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Sparkles className="mb-4 size-12 animate-bounce text-purple-400" />
        <h2 className="mb-2 text-xl font-semibold text-zinc-700 dark:text-zinc-200">
          Loading courses...
        </h2>
      </div>
    );
  }
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Sparkles className="mb-4 size-12 animate-bounce text-purple-400" />
        <h2 className="mb-2 text-xl font-semibold text-zinc-700 dark:text-zinc-200">
          No courses found
        </h2>
        <p className="text-muted-foreground mb-4">Check back later!</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((course: any) => {
        const isActive = course.isActive;
        return (
          <Card
            key={course.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-purple-100 bg-white p-0 transition-shadow hover:shadow-2xl dark:bg-zinc-900"
          >
            <div
              className={`relative aspect-[16/9] w-full bg-neutral-100 transition-colors group-hover:bg-neutral-200`}
              style={{ marginTop: 0 }}
            >
              {course.url ? (
                <Image
                  src={course.url}
                  alt={course.title}
                  fill
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={false}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-purple-50 text-purple-300">
                  <span className="text-5xl">📚</span>
                </div>
              )}
              <Badge
                variant="default"
                className={`absolute top-2 right-2 border-none shadow-md ${isActive ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
              >
                {isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <CardHeader className="flex-1">
              <CardTitle className="line-clamp-1 text-lg text-zinc-900 dark:text-white">
                {course.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 min-h-[40px] text-zinc-600 dark:text-zinc-300">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between gap-2 border-t">
              <span className="text-muted-foreground text-xs">
                {format(new Date(course.createdAt), "MMM dd, yyyy")}
              </span>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="mb-2 gap-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-900"
              >
                <Link href={`/courses/${course.slug}`}>
                  <EyeIcon className="size-4 text-purple-600 transition-colors group-hover:text-purple-800" />
                  View
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default CoursesGrid;
