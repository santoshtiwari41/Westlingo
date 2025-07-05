import React from "react";

import { SearchParams } from "nuqs";

import CustomContainer from "@/components/common/custom-container";
import CourseForm from "@/modules/admin/courses/components/form/course-form";
import EditCourse from "@/modules/admin/courses/components/form/edit-course-form";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const { courseId } = await searchParams;
  const id = Array.isArray(courseId) ? courseId[0] : courseId;

  return (
    <CustomContainer>
      {id ? <EditCourse courseId={id} /> : <CourseForm />}
    </CustomContainer>
  );
};

export default Page;
