import NewTestBookingForm from "@/modules/admin/courses/modules/bookings/components/form/new-test-booking-form";

interface Props {
  params: Promise<{ courseId: string }>;
}

const Page = async ({ params }: Props) => {
  const { courseId } = await params;

  return (
    <div className="container mx-auto my-10 px-4 sm:px-0">
      <NewTestBookingForm courseId={courseId} />
    </div>
  );
};

export default Page;
