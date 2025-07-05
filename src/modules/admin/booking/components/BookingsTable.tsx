import React from "react";

import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Loader2,
  MoreHorizontal,
  User,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    color: "bg-blue-100 text-blue-800",
  },
  mock_test: {
    label: "Mock Test",
    color: "bg-green-100 text-green-800",
  },
  test_booking: {
    label: "Test Booking",
    color: "bg-purple-100 text-purple-800",
  },
};

interface BookingsTableProps {
  filteredReservations: any[];
  updatingStatus: string | null;
  handleStatusUpdate: (reservationId: string, newStatus: string) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({
  filteredReservations,
  updatingStatus,
  handleStatusUpdate,
}) => {
  const getStatusBadge = (status: keyof typeof statusConfig) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} flex items-center space-x-1 border-0`}>
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    );
  };

  const getTypeBadge = (type: keyof typeof typeConfig) => {
    const config = typeConfig[type];
    return <Badge className={`${config.color} border-0`}>{config.label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Student Bookings</CardTitle>
        <CardDescription>
          Showing {filteredReservations.length} bookings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {reservation.user?.name || "Unknown Student"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {reservation.user?.email || "No email"}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium">
                    {reservation.course?.title || "Unknown Course"}
                  </p>
                </TableCell>
                <TableCell>{getTypeBadge(reservation.type)}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {new Date(reservation.validFrom).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(reservation.validFrom).toLocaleTimeString()}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                <TableCell>
                  <p className="font-medium">
                    {reservation.planTitle || "No Plan"}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={reservation.isVerified ? "default" : "secondary"}
                    className={
                      reservation.isVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {reservation.isVerified ? "Verified" : "Not Verified"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={updatingStatus === reservation.id}
                      >
                        {updatingStatus === reservation.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        View Student
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(reservation.id, "upcoming")
                        }
                        disabled={updatingStatus === reservation.id}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Mark Upcoming
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(reservation.id, "active")
                        }
                        disabled={updatingStatus === reservation.id}
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Mark Active
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(reservation.id, "completed")
                        }
                        disabled={updatingStatus === reservation.id}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(reservation.id, "processing")
                        }
                        disabled={updatingStatus === reservation.id}
                      >
                        <Loader2 className="mr-2 h-4 w-4" />
                        Mark Processing
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(reservation.id, "cancelled")
                        }
                        disabled={updatingStatus === reservation.id}
                        className="text-red-600"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredReservations.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500">No bookings found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
