"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import type { BookingDetails, UserInfo } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTRPC } from "@/trpc/client";

interface StepThreeProps {
  formData: {
    testType: string;
    date: string | null;
    time: string;
    name: string;
    email: string;
    phone: string;
    course?: string;
    slotId?: string;
  };
  loading: boolean;
  onCreateBooking: (data: {
    courseId: string;
    slotId: string;
    type: "preparation_class" | "test_booking" | "mock_test";
    validFrom: string;
    validTill: string;
    userInfo: UserInfo;
    bookingDetails: BookingDetails;
    planId: string;
  }) => Promise<{ success: boolean; data?: any; error?: any }>;
  onSuccess?: () => void;
}

export default function StepThree({
  formData,
  loading,
  onCreateBooking,
  onSuccess,
}: StepThreeProps) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const testDetails = useSelector((state: any) => state.booking.testDetails);
  const userInfoRedux = useSelector((state: any) => state.booking.userInfo);

  const trpc = useTRPC();
  const { data: courseData, isLoading: courseLoading } = useQuery(
    trpc.courses.getOne.queryOptions({
      id: formData.course || testDetails.course || "",
    })
  );

  const userInfo: UserInfo = {
    name: formData.name || userInfoRedux.name,
    email: formData.email || userInfoRedux.email,
    phone: formData.phone || userInfoRedux.phone,
  };

  const bookingDetails: BookingDetails = {
    course: formData.course || testDetails.course || "",
    testType: formData.testType || testDetails.testType,
    date: formData.date || testDetails.date,
    time: formData.time || testDetails.time,
    plan: testDetails.plan,
  };

  const formattedDate = formData.date
    ? format(new Date(formData.date), "PPP")
    : "N/A";

  const { data: planDetails } = useQuery(
    trpc.pricings.getPricingItemById.queryOptions(
      { id: testDetails.plan || "" },
      { enabled: !!testDetails.plan }
    )
  );

  const handleSubmit = async () => {
    if (!courseData?.id) {
      console.error("Course not found");
      return;
    }
    if (!formData.slotId) {
      alert("Please select a time slot.");
      setSubmitted(false);
      return;
    }

    try {
      let validFrom: string;
      let validTill: string;
      if (formData.date) {
        const selectedDate = new Date(formData.date);
        validFrom = selectedDate.toISOString();
        validTill = selectedDate.toISOString();
      } else {
        const now = new Date();
        validFrom = now.toISOString();
        validTill = now.toISOString();
      }
      const bookingData = {
        courseId: courseData.id,
        slotId: formData.slotId || testDetails.slotId,
        type: formData.testType as
          | "preparation_class"
          | "test_booking"
          | "mock_test",
        validFrom,
        validTill,
        userInfo,
        bookingDetails,
        planId: bookingDetails.plan || "",
      };

      console.log("StepThree - Test booking submission:", {
        bookingData,
        formDataTestType: formData.testType,
        mappedType: formData.testType as
          | "preparation_class"
          | "test_booking"
          | "mock_test",
      });

      const result = await onCreateBooking(bookingData);

      if (result.success) {
        setSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        if (
          result.error?.data?.code === "CONFLICT" ||
          result.error?.message?.includes("already booked")
        ) {
          toast.error(
            "You have already booked this slot for the same course and test type.",
            {
              description: "Please choose a different slot or course.",
              className: "bg-red-100 text-red-800 border border-red-200",
              icon: "🚫",
            }
          );
        } else {
          toast.error(result.error?.message || "Failed to create booking.");
        }
        setSubmitted(false);
      }
    } catch (error: any) {
      if (
        error?.data?.code === "CONFLICT" ||
        error?.message?.includes("already booked")
      ) {
        toast.error(
          "You have already booked this slot for the same course and test type.",
          {
            description: "Please choose a different slot or course.",
            className: "bg-red-100 text-red-800 border border-red-200",
            icon: "🚫",
          }
        );
      } else {
        toast.error(error?.message || "Booking submission error.");
      }
      setSubmitted(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100"
          >
            <motion.div
              className="space-y-6 text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <motion.div
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.8 }}
              >
                <CheckCircle className="h-12 w-12" />
              </motion.div>
              <div>
                <h2 className="mb-2 text-4xl font-bold text-green-700">
                  🎉 Congratulations!
                </h2>
                <p className="mb-1 text-xl text-gray-700">
                  Your booking is now pending.
                </p>
                <p className="text-gray-500">We will notify you soon...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted && (
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Booking Summary
            </h2>
            <p className="text-gray-600">
              Please review your details before confirming your booking
            </p>
          </div>

          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="text-gray-900">{userInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-gray-900">{userInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-gray-900">{userInfo.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <BookOpen className="h-5 w-5" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Course
                      </p>
                      <p className="text-gray-900">
                        {courseLoading
                          ? "Loading..."
                          : courseData?.title || bookingDetails.course || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Test Type
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        {bookingDetails.testType || "-"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Date</p>
                      <p className="text-gray-900">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Time</p>
                      <p className="text-gray-900">
                        {bookingDetails.time || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plan & Pricing */}
          {planDetails && (
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <CreditCard className="h-5 w-5" />
                  Plan & Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-lg border border-purple-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-purple-900">
                        {planDetails.title}
                      </h3>
                      <p className="text-sm text-gray-600">Selected plan</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-900">
                      NPR {planDetails.price}
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">
                      Premium
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Confirmation */}
          <Card className="border-gray-200">
            <CardContent className="pt-6">
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ready to Confirm?
                  </h3>
                  <p className="text-gray-600">
                    By clicking "Confirm & Pay", you agree to proceed with this
                    booking.
                  </p>
                </div>
                <Separator className="my-4" />
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl sm:w-auto"
                  onClick={handleSubmit}
                  disabled={loading || !courseData?.id || courseLoading}
                >
                  {loading || courseLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirm & Pay
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
