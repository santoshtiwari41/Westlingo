import NewMockTestForm from "@/modules/admin/courses/modules/mocks/components/form/new-mock-test-form";

interface Props {
  params: Promise<{ courseId: string }>;
}

const Page = async ({ params }: Props) => {
  const { courseId } = await params;

  return (
    <div className="container mx-auto my-10 px-4 sm:px-0">
      <NewMockTestForm courseId={courseId} />
    </div>
  );
};

export default Page;
