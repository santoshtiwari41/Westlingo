export type CourseConfig = {
  image?: string;
  badge?: string;
  color?: string;
  duration?: string;
  students?: string;
  rating?: number | string;
  testTypes?: Array<{
    name: string;
    basic: string;
    standard: string;
    premium: string;
  }>;
  url?: string;
};

export type CourseWithConfig = {
  id: string;
  title: string;
  description: string;
  slug: string;
  createdAt?: string;
  url?: string;
  config?: CourseConfig;
};

export function isValidCourse(course: CourseWithConfig) {
  const config = (course.config || {}) as CourseConfig;
  return course && (config.image || course.url) && course.title;
}
