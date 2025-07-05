"use client";

import Link from "next/link";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CheckIcon,
  CornerDownRightIcon,
  EyeIcon,
  MoreHorizontal,
  VideoIcon,
  XIcon,
} from "lucide-react";
import { toast } from "sonner";

import GeneratedAvatar from "@/components/common/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTRPC } from "@/trpc/client";

import type { CourseGetMany } from "../types";

type Course = CourseGetMany["items"][number];

function CourseActionsCell({ course }: { course: Course }) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation(
    trpc.courses.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.courses.getMany.queryOptions()
        );
        toast.success("Course updated successfully!");
      },
      onError: (error) => {
        console.error("Failed to update course:", error);
        toast.error(error.message || "Failed to update course");
      },
    })
  );

  const handleTogglePublish = () => {
    mutate({
      id: course.id,
      isActive: !course.isActive,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isPending}>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Actions for ${course.title}`}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleTogglePublish}
          disabled={isPending}
          className="flex items-center gap-2"
          variant={course.isActive ? "destructive" : "default"}
        >
          {course.isActive ? (
            <>
              <XIcon className="size-4" />
              Unpublish
            </>
          ) : (
            <>
              <CheckIcon className="size-4" />
              Publish
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild disabled={isPending}>
          <Link href={`/admin/courses/${course.id}`}>
            <EyeIcon className="size-4" />
            View Course
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "name",
    header: "Course Name",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={course.slug}
              className="size-6"
            />
            <span className="font-semibold capitalize">{course.title}</span>
            <div className="flex items-center gap-x-2">
              <CornerDownRightIcon className="text-muted-foreground size-3" />
              <span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
                {course.description}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "reservationCount",
    header: "Reservations",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 [&>svg]:size-4"
      >
        <VideoIcon className="text-blue-400" />
        {row.original.slug}
      </Badge>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "destructive"}>
        {row.original.isActive ? "Published" : "Unpublished"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CourseActionsCell course={row.original} />,
  },
];
