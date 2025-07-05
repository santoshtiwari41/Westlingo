"use client";

import { useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { CalendarIcon, CheckCircle2, Clock, Users } from "lucide-react";

import { uploadToCloudinary } from "@/actions/cloudinary";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useUserProfile } from "@/hooks/queries/useUserProfile";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

export default function StepOne({ formData, onChange }: any) {
  const searchParams = useSearchParams();
  const course = searchParams?.get("course");
  const service = searchParams?.get("service");
  const planId = formData.plan;
  const trpc = useTRPC();
  const { profile } = useUserProfile();

  const { data: courseData, isLoading } = useQuery(
    trpc.courses.getOne.queryOptions({ id: course || "" })
  );

  const { data: pricingItem, isLoading: priceLoading } = useQuery(
    trpc.pricings.getPricingItemById.queryOptions(
      { id: planId },
      { enabled: !!planId }
    )
  );
  const price = pricingItem?.price;

  const typeMap: Record<
    string,
    "mock_test" | "preparation_class" | "test_booking"
  > = {
    "mock-test": "mock_test",
    mocktest: "mock_test",
    mockTest: "mock_test",
    mock_test: "mock_test",
    mockTestaration: "mock_test",
    mocktestaration: "mock_test",
    "mock-testaration": "mock_test",
    mock_testaration: "mock_test",
    MockTest: "mock_test",

    preparation: "preparation_class",
    "preparation-class": "preparation_class",
    preparationClass: "preparation_class",
    preparation_class: "preparation_class",
    preparationclass: "preparation_class",
    prep: "preparation_class",
    "prep-class": "preparation_class",
    prepClass: "preparation_class",
    prep_class: "preparation_class",
    PreparationClass: "preparation_class",

    "test-booking": "test_booking",
    testbooking: "test_booking",
    testBooking: "test_booking",
    test_booking: "test_booking",
    testBookingaration: "test_booking",
    testbookingaration: "test_booking",
    "test-bookingaration": "test_booking",
    test_bookingaration: "test_booking",
    booking: "test_booking",
    test: "test_booking",
    TestBooking: "test_booking",
  };

  const mappedType = typeMap[formData.testType] || formData.testType;

  console.log("StepOne - Test booking debug:", {
    formDataTestType: formData.testType,
    mappedType,
    course: formData.course,
    hasCourse: !!formData.course,
    hasTestType: !!formData.testType,
  });

  const { data: slotsData, isLoading: slotsLoading } = useQuery(
    trpc.reservationSlots.getByCourseAndType.queryOptions(
      {
        courseId: formData.course,
        type: mappedType,
      },
      {
        enabled: !!formData.course && !!formData.testType,
      }
    )
  );

  console.log("StepOne - Slots data:", {
    slotsData,
    slotsLoading,
    filteredSlots: slotsData || [],
  });

  const filteredSlots = slotsData || [];

  const availableDates = Array.from(
    new Set(filteredSlots.map((slot: any) => slot.date))
  ).map((date) => new Date(date));

  const selectedDate = formData.date ? new Date(formData.date) : null;

  const slotsForSelectedDate = selectedDate
    ? filteredSlots.filter((slot: any) => {
        const slotDate =
          typeof slot.date === "string"
            ? slot.date
            : format(new Date(slot.date), "yyyy-MM-dd");
        const selected = format(selectedDate, "yyyy-MM-dd");
        return slotDate === selected;
      })
    : [];

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 480;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const result = await uploadToCloudinary(formData, "payment-proof");
      setUploading(false);
      if ("error" in result) {
        setImageUrl(null);
      } else {
        setImageUrl(result.url);
      }
    } else {
      setImageUrl(null);
    }
  };

  useEffect(() => {
    if (course && formData.course !== course) {
      onChange({ course });
    }
    if (service && formData.testType !== service) {
      onChange({ testType: service });
    }
  }, [course, service, formData.course, formData.testType, onChange]);

  useEffect(() => {
    if (price !== undefined && price !== formData.price) {
      onChange({ price });
    }
  }, [price]);

  const dynamicTestOptions = useMemo(() => {
    if (!formData.course || !courseData) return [];
    return [
      {
        id: formData.course,
        label: courseData.title + " " + (formData.testType || "Mock Test"),
      },
    ];
  }, [formData.course, formData.testType, courseData]);

  useEffect(() => {
    if (profile && profile.profile) {
      const fullName = [
        profile.profile.firstName,
        profile.profile.middleName,
        profile.profile.lastName,
      ]
        .filter(Boolean)
        .join(" ");
      if (!formData.name || !formData.email || !formData.phone) {
        onChange({
          name: formData.name || fullName,
          email: formData.email || (profile && profile.email) || "",
          phone: formData.phone || profile.profile.phoneNumber || "",
        });
      }
    }
  }, [profile]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:gap-4 md:gap-8 lg:grid-cols-2">
        {isMobile ? (
          <div className="w-full">
            <div className="mb-2 flex items-center gap-2 text-green-700">
              <CalendarIcon className="h-5 w-5" />
              <span className="font-semibold">Choose Date</span>
            </div>
            <div className="flex w-full justify-center px-2">
              <div className="w-full max-w-full">
                {slotsLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                    <span className="mt-2 text-blue-600">
                      Loading available dates...
                    </span>
                  </div>
                ) : (
                  <Calendar
                    mode="single"
                    selected={selectedDate || undefined}
                    onSelect={(date) =>
                      onChange({
                        ...formData,
                        date: date ? format(date, "yyyy-MM-dd") : null,
                        time: null,
                        slotId: null,
                      })
                    }
                    disabled={(date) =>
                      !availableDates.some(
                        (d) =>
                          d.getFullYear() === date.getFullYear() &&
                          d.getMonth() === date.getMonth() &&
                          d.getDate() === date.getDate()
                      )
                    }
                    modifiers={{
                      available: (date) =>
                        availableDates.some(
                          (d) =>
                            d.getFullYear() === date.getFullYear() &&
                            d.getMonth() === date.getMonth() &&
                            d.getDate() === date.getDate()
                        ),
                      selected: selectedDate
                        ? (date) =>
                            selectedDate.getFullYear() === date.getFullYear() &&
                            selectedDate.getMonth() === date.getMonth() &&
                            selectedDate.getDate() === date.getDate()
                        : () => false,
                    }}
                    modifiersStyles={{
                      available: {
                        backgroundColor: "#dbeafe",
                        color: "#1e40af",
                        fontWeight: "600",
                        border: "2px solid #60a5fa",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "auto",
                      },
                      selected: {
                        backgroundColor: "#2563eb",
                        color: "white",
                        fontWeight: "700",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "auto",
                      },
                    }}
                    className="w-full min-w-0 rounded-lg border-0"
                  />
                )}
              </div>
            </div>
            {availableDates.length > 0 && (
              <div className="mt-4 text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  {availableDates.length} dates available
                </Badge>
              </div>
            )}
          </div>
        ) : (
          <Card className="w-full border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CalendarIcon className="h-5 w-5" />
                Choose Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center px-2 sm:justify-start">
                <div className="mx-auto w-full max-w-full rounded-xl border border-green-200 bg-white p-0 shadow-sm sm:max-w-none sm:p-4">
                  <div className="w-full">
                    {slotsLoading ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                        <span className="mt-2 text-blue-600">
                          Loading available dates...
                        </span>
                      </div>
                    ) : (
                      <div className="flex w-full justify-center px-2">
                        <div className="w-full max-w-full">
                          <Calendar
                            mode="single"
                            selected={selectedDate || undefined}
                            onSelect={(date) =>
                              onChange({
                                ...formData,
                                date: date ? format(date, "yyyy-MM-dd") : null,
                                time: null,
                                slotId: null,
                              })
                            }
                            disabled={(date) =>
                              !availableDates.some(
                                (d) =>
                                  d.getFullYear() === date.getFullYear() &&
                                  d.getMonth() === date.getMonth() &&
                                  d.getDate() === date.getDate()
                              )
                            }
                            modifiers={{
                              available: (date) =>
                                availableDates.some(
                                  (d) =>
                                    d.getFullYear() === date.getFullYear() &&
                                    d.getMonth() === date.getMonth() &&
                                    d.getDate() === date.getDate()
                                ),
                              selected: selectedDate
                                ? (date) =>
                                    selectedDate.getFullYear() ===
                                      date.getFullYear() &&
                                    selectedDate.getMonth() ===
                                      date.getMonth() &&
                                    selectedDate.getDate() === date.getDate()
                                : () => false,
                            }}
                            modifiersStyles={{
                              available: {
                                backgroundColor: "#dbeafe",
                                color: "#1e40af",
                                fontWeight: "600",
                                border: "2px solid #60a5fa",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "auto",
                              },
                              selected: {
                                backgroundColor: "#2563eb",
                                color: "white",
                                fontWeight: "700",
                                border: "none",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "auto",
                              },
                            }}
                            className="w-full min-w-0 rounded-lg border-0"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {availableDates.length > 0 && (
                <div className="mt-4 text-center">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    {availableDates.length} dates available
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="w-full border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Clock className="h-5 w-5" />
              Choose Time Slot
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarIcon className="mb-4 h-12 w-12 text-gray-300" />
                <p className="text-gray-500">Please select a date first</p>
              </div>
            ) : slotsForSelectedDate.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Clock className="mb-4 h-12 w-12 text-gray-300" />
                <p className="text-gray-500">
                  No slots available for this date
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Available slots for {format(selectedDate, "PPP")}:
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {slotsForSelectedDate.map((slot: any) => {
                    const isSelected = formData.slotId === slot.id;
                    const isAvailable = slot.seats > 0;

                    return (
                      <div
                        key={slot.id}
                        className={cn(
                          "relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200",
                          isSelected
                            ? "border-blue-600 bg-blue-50 text-blue-900 shadow-lg ring-2 ring-blue-200"
                            : isAvailable
                              ? "border-blue-200 bg-white hover:border-blue-400 hover:bg-blue-50 hover:shadow-md"
                              : "cursor-not-allowed border-gray-200 bg-gray-50 opacity-50"
                        )}
                        onClick={() => {
                          if (isAvailable) {
                            onChange({
                              ...formData,
                              slotId: slot.id,
                              time: slot.time,
                              date: slot.date,
                            });
                          }
                        }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="font-semibold">{slot.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs opacity-80">
                            <Users className="h-3 w-3" />
                            <span>
                              {slot.availableSeats} seat
                              {slot.availableSeats !== 1 ? "s" : ""} left
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedDate && formData.slotId && (
        <Card className="border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Selection Summary
              </h3>
              <Separator className="my-4" />
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Course</p>
                  <p className="text-gray-900">{courseData?.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Date</p>
                  <p className="text-gray-900">{format(selectedDate, "PPP")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Time</p>
                  <p className="text-gray-900">{formData.time}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
