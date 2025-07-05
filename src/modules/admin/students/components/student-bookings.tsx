"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Loader2,
  MoreHorizontal,
  Search,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTRPC } from "@/trpc/client";

interface StudentBookingsProps {
  studentId: string;
  reservations: any[];
}

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

export default function StudentBookings({
  studentId,
  reservations,
}: StudentBookingsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation(
    trpc.students.updateReservationStatus.mutationOptions({
      onSuccess: () => {
        toast.success("Reservation status updated successfully");
        setUpdatingStatus(null);
        queryClient.invalidateQueries(
          trpc.students.getStudentReservations.queryOptions({ id: studentId })
        );
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update status");
        setUpdatingStatus(null);
      },
    })
  );

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.course?.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) || false;
    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter;
    const matchesType = typeFilter === "all" || reservation.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

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

  const handleStatusUpdate = async (
    reservationId: string,
    newStatus: string
  ) => {
    setUpdatingStatus(reservationId);
    try {
      await updateStatusMutation.mutateAsync({
        reservationId,
        status: newStatus as any,
      });
    } catch (error) {}
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Bookings & Reservations</h2>
          <p className="text-gray-600">
            View and manage student's course bookings
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold">
                  {reservations.filter((r) => r.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Processing</p>
                <p className="text-2xl font-bold">
                  {reservations.filter((r) => r.status === "processing").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-2xl font-bold">
                  {reservations.filter((r) => r.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">{reservations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="preparation_class">
                    Preparation Class
                  </SelectItem>
                  <SelectItem value="mock_test">Mock Test</SelectItem>
                  <SelectItem value="test_booking">Test Booking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Reservations</CardTitle>
          <CardDescription>
            Showing {filteredReservations.length} of {reservations.length}{" "}
            reservations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
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
                          <Calendar className="mr-2 h-4 w-4" />
                          Reschedule
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
              <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="text-gray-500">No reservations found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
