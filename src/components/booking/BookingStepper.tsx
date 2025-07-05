"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import type { BookingDetails, UserInfo } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBookingsManager } from "@/hooks/mutations/useBookings";
import { cn } from "@/lib/utils";
import { setTestDetails } from "@/store/bookingSlice";
import type { RootState } from "@/store/store";
import { useTRPC } from "@/trpc/client";

import PaymentStep from "./PaymentStep";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import UserInfoStep from "./UserInfoStep";

const steps = [
  { id: 0, title: "Your Info", description: "Review your information" },
  {
    id: 1,
    title: "Select Date & Time",
    description: "Choose your preferred slot",
  },
  { id: 2, title: "Create Reservation", description: "Confirm your booking" },
  { id: 3, title: "Payment", description: "Complete your payment" },
];

export default function BookingStepper() {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const { userInfo, testDetails } = useSelector(
    (state: RootState) => state.booking
  );

  const trpc = useTRPC();
  const { data: coursesData } = useQuery(trpc.public.getCourses.queryOptions());
  const courses = coursesData?.items || [];

  const { createNewBooking, isCreating } = useBookingsManager();

  const [reservationId, setReservationId] = useState<string | null>(null);

  const updateTestDetails = (updates: any) => {
    dispatch(setTestDetails(updates));
  };

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleCreateBooking = async (data: {
    courseId: string;
    slotId: string;
    type: "preparation_class" | "test_booking" | "mock_test";
    validFrom: string;
    validTill: string;
    userInfo: UserInfo;
    bookingDetails: BookingDetails;
  }) => {
    try {
      const result = await createNewBooking(data);
      if (result.success) {
        if (result.data && result.data.id) {
          setReservationId(result.data.id);
        }
        setStep(3);
      }
      return result;
    } catch (error) {
      return { success: false, error };
    }
  };

  const { data: planDetails } = useQuery(
    trpc.pricings.getPricingItemById.queryOptions(
      { id: testDetails.plan || "" },
      { enabled: !!testDetails.plan }
    )
  );

  const isStepComplete = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return userInfo.name && userInfo.email && userInfo.phone;
      case 1:
        return testDetails.date && testDetails.time && testDetails.slotId;
      case 2:
        return reservationId;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Book Your Test
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Complete your booking in {steps.length} simple steps
            </p>
          </div>

          <Card className="mb-8 border-0 bg-white/70 shadow-xl backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="relative">
                <div className="absolute top-5 left-0 h-0.5 w-full bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700 ease-out"
                    style={{
                      width: `${(step / (steps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                <div className="relative flex justify-between">
                  {steps.map((stepItem, index) => (
                    <div
                      key={stepItem.id}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-semibold transition-all duration-300",
                          index < step
                            ? "border-green-500 bg-green-500 text-white shadow-lg"
                            : index === step
                              ? "border-blue-500 bg-blue-500 text-white shadow-lg ring-4 ring-blue-100"
                              : "border-gray-300 text-gray-400"
                        )}
                      >
                        {index < step ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="mt-3 text-center">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            index === step
                              ? "text-blue-600"
                              : index < step
                                ? "text-green-600"
                                : "text-gray-400"
                          )}
                        >
                          {stepItem.title}
                        </p>
                        <p className="hidden text-xs text-gray-500 sm:block">
                          {stepItem.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    Step {step + 1} of {steps.length}
                  </Badge>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {steps[step].title}
                  </h2>
                </div>
                <p className="mt-1 text-gray-600">{steps[step].description}</p>
              </div>

              <Separator className="mb-8" />

              <div className="min-h-[400px]">
                {step === 0 && (
                  <UserInfoStep
                    userInfo={userInfo}
                    testDetails={testDetails}
                    courses={courses}
                  />
                )}
                {step === 1 && (
                  <StepOne
                    formData={testDetails}
                    onChange={updateTestDetails}
                  />
                )}
                {step === 2 && (
                  <StepThree
                    formData={{ ...userInfo, ...testDetails }}
                    loading={isCreating}
                    onCreateBooking={handleCreateBooking}
                  />
                )}
                {step === 3 && (
                  <PaymentStep
                    reservationId={reservationId}
                    planId={testDetails.plan || null}
                    price={planDetails?.price || null}
                  />
                )}
              </div>

              {/* Navigation */}
              <Separator className="my-8" />
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <Button
                  variant="outline"
                  size="lg"
                  className={cn("w-full sm:w-auto", step === 0 && "invisible")}
                  onClick={back}
                  disabled={step === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                {step < steps.length - 2 && (
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl sm:w-auto"
                    onClick={next}
                    disabled={
                      step === 1 && (!testDetails.date || !testDetails.time)
                    }
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
