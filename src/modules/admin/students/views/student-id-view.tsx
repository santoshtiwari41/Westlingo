"use client";

import { useRouter } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { useTRPC } from "@/trpc/client";

import StudentIdViewHeader from "../components/student-id-view-header";
import StudentPreview from "./student-preview";

interface StudentIdViewProps {
  id: string;
}

export const StudentIdView = ({ id }: StudentIdViewProps) => {
  const router = useRouter();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.students.getOne.queryOptions({ id }));

  return (
    <>
      <div className="flex flex-1 flex-col gap-y-2 px-4 md:px-8">
        <StudentIdViewHeader
          onEdit={() => {
            router.push(`/admin/students/${id}/edit`);
          }}
          onRemove={() => {}}
        />
        <StudentPreview data={data} />
      </div>
    </>
  );
};

export const StudentIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Student"
      description="This may take a few seconds..."
    />
  );
};
export const StudentIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Student"
      description="Something went wrong!"
    />
  );
};
