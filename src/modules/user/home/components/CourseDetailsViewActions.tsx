import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const CourseDetailsViewActions = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  return (
    <div className="my-6 flex flex-wrap gap-4">
      <Button
        onClick={() =>
          router.push(`/book?course=${courseId}&service=mock-test`)
        }
      >
        Mock Test
      </Button>
      <Button
        onClick={() =>
          router.push(`/book?course=${courseId}&service=preparation`)
        }
      >
        Preparation Classes
      </Button>
      <Button
        onClick={() => {
          console.log("Test Booking clicked for course:", courseId);
          router.push(`/book?course=${courseId}&service=test-booking`);
        }}
      >
        Test Booking
      </Button>
    </div>
  );
};

export default CourseDetailsViewActions;
