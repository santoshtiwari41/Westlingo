"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";
import {
  CornerDownRightIcon,
  EyeIcon,
  MailIcon,
  MoreHorizontal,
} from "lucide-react";

import GeneratedAvatar from "@/components/common/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { GetStudents } from "../types";

type Student = GetStudents["items"][number];

function StudentActionsCell({ student }: { student: Student }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Actions for ${student.user.name}`}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/admin/students/${student.user.id}`}>
            <EyeIcon /> View
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem asChild></DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={student.user.name}
              className="size-6"
            />
            <span className="font-semibold capitalize">
              {student.user.name}
            </span>
            <div className="flex items-center gap-x-2">
              <CornerDownRightIcon className="text-muted-foreground size-3" />
              <span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
                {student?.profile?.phoneNumber ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 [&>svg]:size-4"
      >
        <MailIcon className="text-blue-400" />
        {row.original.user.email}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <StudentActionsCell student={row.original} />,
  },
];
