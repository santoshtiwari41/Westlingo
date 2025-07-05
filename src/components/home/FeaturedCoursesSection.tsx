import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import type { CourseConfig, CourseWithConfig } from "./homeTypes";

interface FeaturedCoursesSectionProps {
  courses: CourseWithConfig[];
  fadeInUp: string;
}

export default function FeaturedCoursesSection({
  courses,
  fadeInUp,
}: FeaturedCoursesSectionProps) {
  if (!courses.length) return null;
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-16 text-center transition-all delay-200 duration-1000 ease-out ${fadeInUp}`}
        >
          <h2 className="mb-6 text-4xl font-semibold text-slate-900 md:text-5xl">
            Featured Test Preparation
            <span className="block text-blue-600">Courses</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600">
            Master the tests that open doors to your dream universities with our
            expert-led preparation programs
          </p>
        </div>
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses.slice(0, 4).map((course, index) => {
            const config = (course.config || {}) as CourseConfig;
            return (
              <Card
                key={course.id}
                className={`group border-0 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl delay-${(index + 1) * 100} ${fadeInUp}`}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={config.image || course.url || "/placeholder.svg"}
                    alt={course.title}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ display: "block" }}
                  />
                </div>
                <CardContent className="flex min-h-[160px] flex-1 flex-col justify-between p-4">
                  <div>
                    <CardTitle className="mt-2 mb-1 text-xl font-semibold transition-colors group-hover:text-blue-600">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="mb-1 text-slate-600">
                      {course.description}
                    </CardDescription>
                  </div>
                  <div className="border-muted-foreground/10 mt-2 flex items-center justify-between border-t pt-2">
                    <div className="text-muted-foreground text-xs">
                      {course.createdAt
                        ? new Date(course.createdAt).toLocaleDateString()
                        : ""}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-12"
                      asChild
                    >
                      <a href={`/course/${course.slug}`} title="View Course">
                        <Eye className="mx-auto h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full bg-transparent hover:bg-slate-50"
            asChild
          >
            <a href="/courses">See all courses</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
