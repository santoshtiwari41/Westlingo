"use client";

import Link from "next/link";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  CircleCheckIcon,
  CircleXIcon,
  Clock,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  EyeIcon,
  Loader2,
  LoaderIcon,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import GeneratedAvatar from "@/components/common/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

import { ReservationGetMany } from "../types";

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  processing: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  cancelled: "bg-gray-500/20 text-gray-800 border-gray-800/5",
};

const statusConfig = {
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  processing: {
    label: "Processing",
    color: "bg-yellow-100 text-yellow-800",
    icon: Loader2,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
  upcoming: {
    label: "Upcoming",
    color: "bg-blue-100 text-blue-800",
    icon: Clock,
  },
  active: {
    label: "Active",
    color: "bg-purple-100 text-purple-800",
    icon: AlertCircle,
  },
};

const typeConfig = {
  preparation_class: {
    label: "Preparation Class",
    color: "bg-purple-100 text-purple-800",
  },
  mock_test: { label: "Mock Test", color: "bg-orange-100 text-orange-800" },
  test_booking: {
    label: "Test Booking",
    color: "bg-indigo-100 text-indigo-800",
  },
};

function ReservationActions({
  reservation,
}: {
  reservation: ReservationGetMany[number];
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation(
    trpc.reservations.updateStatus.mutationOptions({
      onSuccess: () => {
        toast.success("Reservation status updated successfully");
        queryClient.invalidateQueries(trpc.reservations.getMany.queryOptions());
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update status");
      },
    })
  );

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: reservation.id,
        status: newStatus as any,
      });
    } catch (error) {}
  };

  return (
    <div className="flex items-center gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href={`/admin/reservations/${reservation.id}`}>
          <EyeIcon className="h-4 w-4" />
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            disabled={updateStatusMutation.isPending}
          >
            {updateStatusMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/admin/reservations/${reservation.id}`}>
              <EyeIcon className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar className="mr-2 h-4 w-4" />
            Reschedule
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleStatusUpdate("upcoming")}
            disabled={updateStatusMutation.isPending}
          >
            <Clock className="mr-2 h-4 w-4" />
            Mark Upcoming
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusUpdate("active")}
            disabled={updateStatusMutation.isPending}
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Mark Active
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusUpdate("completed")}
            disabled={updateStatusMutation.isPending}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark Completed
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusUpdate("processing")}
            disabled={updateStatusMutation.isPending}
          >
            <Loader2 className="mr-2 h-4 w-4" />
            Mark Processing
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleStatusUpdate("cancelled")}
            disabled={updateStatusMutation.isPending}
            className="text-red-600"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const columns: ColumnDef<ReservationGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Reservation Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">
          {row.original.course.title}
        </span>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="text-muted-foreground size-3" />
            <span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
              {row.original.type}
            </span>
          </div>
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.course.title}
            className="size-4"
          />
          <span className="text-muted-foreground text-sm">
            {row.original.createdAt
              ? format(new Date(row.original.createdAt), "MMM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as keyof typeof statusConfig;
      const config = statusConfig[status];
      const Icon = config.icon;

      return (
        <Badge
          className={`${config.color} flex items-center space-x-1 border-0`}
        >
          <Icon className="h-3 w-3" />
          <span>{config.label}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type as keyof typeof typeConfig;
      const config = typeConfig[type];

      return (
        <Badge className={`${config.color} border-0`}>{config.label}</Badge>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {row.original.user?.name || "Unknown"}
        </span>
        <span className="text-xs text-gray-500">
          {row.original.user?.email || "No email"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date & Time",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">
          {new Date(row.original.validFrom).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(row.original.validFrom).toLocaleTimeString()}
        </p>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ReservationActions reservation={row.original} />,
  },
];
