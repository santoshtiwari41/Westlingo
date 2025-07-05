"use client";

import { useState } from "react";

import { TEST_TYPE_MAPPING } from "@/api/types";
import type {
  BookingDetails,
  Course,
  Reservation,
  UserInfo,
} from "@/api/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBookingsManager } from "@/hooks/mutations/useBookings";
import { useCoursesList } from "@/hooks/queries/useCourses";
import { useUserProfile } from "@/hooks/queries/useUserProfile";

export default function BookingExample() {
  const { profile, updateProfile, isUpdatingProfile } = useUserProfile();
  const { courses, isLoading: coursesLoading } = useCoursesList();
  const {
    reservations,
    createNewBooking,
    cancelBooking,
    isCreating,
    isDeleting,
  } = useBookingsManager();

  // Local state for form
  const [bookingForm, setBookingForm] = useState({
    courseId: "",
    testType: "mock-test" as keyof typeof TEST_TYPE_MAPPING,
    date: "",
    time: "09:00 AM",
    userInfo: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleCreateBooking = async () => {
    const result = await createNewBooking({
      courseId: bookingForm.courseId,
      type: TEST_TYPE_MAPPING[bookingForm.testType],
      validFrom: bookingForm.date,
      validTill: bookingForm.date,
      userInfo: bookingForm.userInfo,
      bookingDetails: {
        course: "ielts",
        testType: bookingForm.testType,
        date: bookingForm.date,
        time: bookingForm.time,
      },
    });

    if (result.success) {
      console.log("Booking created:", result.data);
    }
  };

  const handleCancelBooking = async (reservationId: string) => {
    const result = await cancelBooking(reservationId);
    if (result.success) {
      console.log("Booking cancelled successfully");
    }
  };

  if (coursesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-4 text-lg">Loading courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {profile ? (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={profile.name || ""}
                  onChange={(e) => updateProfile({ firstName: e.target.value })}
                  placeholder="Update your name"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={profile.email || ""} disabled />
              </div>
              <Button
                onClick={() => updateProfile({ firstName: "Updated Name" })}
                disabled={isUpdatingProfile}
              >
                {isUpdatingProfile ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </CardContent>
      </Card>

      {/* Available Courses Section */}
      <Card>
        <CardHeader>
          <CardTitle>Available Courses ({courses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: Course) => (
              <div key={course.id} className="rounded-lg border p-4">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Booking Section */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Select Course</Label>
              <select
                value={bookingForm.courseId}
                onChange={(e) =>
                  setBookingForm((prev) => ({
                    ...prev,
                    courseId: e.target.value,
                  }))
                }
                className="w-full rounded-md border p-2"
              >
                <option value="">Choose a course</option>
                {courses.map((course: Course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Test Type</Label>
              <select
                value={bookingForm.testType}
                onChange={(e) =>
                  setBookingForm((prev) => ({
                    ...prev,
                    testType: e.target.value as keyof typeof TEST_TYPE_MAPPING,
                  }))
                }
                className="w-full rounded-md border p-2"
              >
                <option value="mock-test">Mock Test</option>
                <option value="preparation">Preparation Classes</option>
                <option value="test-booking">Test Booking</option>
              </select>
            </div>

            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={bookingForm.date}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </div>

            <div>
              <Label>Time</Label>
              <select
                value={bookingForm.time}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full rounded-md border p-2"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
              </select>
            </div>

            <div>
              <Label>Your Name</Label>
              <Input
                value={bookingForm.userInfo.name}
                onChange={(e) =>
                  setBookingForm((prev) => ({
                    ...prev,
                    userInfo: { ...prev.userInfo, name: e.target.value },
                  }))
                }
                placeholder="Enter your name"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={bookingForm.userInfo.email}
                onChange={(e) =>
                  setBookingForm((prev) => ({
                    ...prev,
                    userInfo: { ...prev.userInfo, email: e.target.value },
                  }))
                }
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                value={bookingForm.userInfo.phone}
                onChange={(e) =>
                  setBookingForm((prev) => ({
                    ...prev,
                    userInfo: { ...prev.userInfo, phone: e.target.value },
                  }))
                }
                placeholder="Enter your phone"
              />
            </div>

            <Button
              onClick={handleCreateBooking}
              disabled={
                isCreating ||
                !bookingForm.courseId ||
                !bookingForm.userInfo.name
              }
              className="w-full"
            >
              {isCreating ? "Creating Booking..." : "Create Booking"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User's Reservations Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Reservations ({reservations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reservations.map((reservation: Reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {reservation.course?.title || "Unknown Course"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Status: {reservation.status} | Type: {reservation.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created:{" "}
                    {new Date(reservation.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancelBooking(reservation.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Cancelling..." : "Cancel"}
                </Button>
              </div>
            ))}
            {reservations.length === 0 && (
              <p className="text-center text-gray-500">
                No reservations found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
