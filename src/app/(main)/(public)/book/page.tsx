"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import BookingStepper from "@/components/booking/BookingStepper";
import { setTestDetails } from "@/store/bookingSlice";
import type { TestDetails } from "@/store/bookingSlice";
import { RootState } from "@/store/store";

export default function BookPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { userInfo, isUserInfoComplete } = useSelector(
    (state: RootState) => state.booking
  );

  useEffect(() => {
    const course = searchParams?.get("course");
    const service = searchParams?.get("service");
    const plan = searchParams?.get("plan");

    const typeMap: Record<string, string> = {
      "mock-test": "mock_test",
      mocktest: "mock_test",
      mockTest: "mock_test",
      mock_test: "mock_test",
      mockTestaration: "mock_test",
      mocktestaration: "mock_test",
      "mock-testaration": "mock_test",
      mock_testaration: "mock_test",

      preparation: "preparation_class",
      "preparation-class": "preparation_class",
      preparationClass: "preparation_class",
      preparation_class: "preparation_class",
      preparationclass: "preparation_class",
      prep: "preparation_class",
      "prep-class": "preparation_class",
      prepClass: "preparation_class",
      prep_class: "preparation_class",

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
    };
    const mappedType =
      service && typeMap[service] ? typeMap[service] : service || "";

    console.log("Service mapping:", { service, mappedType });

    const details: Partial<TestDetails> = {};
    if (course) details.course = course;
    if (mappedType) details.testType = mappedType;
    if (plan) details.plan = plan;
    if (Object.keys(details).length > 0) {
      console.log("Setting test details:", details);
      dispatch(setTestDetails(details));
    }
  }, [searchParams, dispatch]);

  return <BookingStepper />;
}
