"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

const MOCK_RESULTS = [
  {
    id: "1",
    title: "IELTS Intensive Batch (Morning)",
    provider: "Global Language Institute",
    location: "Kathmandu, Nepal",
    startDate: "2024-07-10",
    mode: "offline",
    duration: "1-month",
    price: 12000,
    image: "/images/course1.jpeg",
    type: "preparation",
  },
  {
    id: "2",
    title: "PTE Academic Crash Course",
    provider: "EduWorld Academy",
    location: "Pokhara, Nepal",
    startDate: "2024-07-15",
    mode: "online",
    duration: "3-months",
    price: 9500,
    image: "/images/course1.jpeg",
    type: "preparation",
  },
];

const TEST_TYPE_NAMES: Record<string, string> = {
  preparation_class: "Preparation Classes",
  mock_test: "Mock Test",
  test_booking: "Test Booking",
};

export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const courseId = params.get("course");
  const resultId = params.get("resultId");

  const result = MOCK_RESULTS.find((r) => r.id === resultId);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "Nepal",
    phone: "",
  });

  const { testDetails, userInfo } = useSelector(
    (state: RootState) => state.booking
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto max-w-5xl px-2 py-8 md:px-0">
      <div className="mb-8 flex items-center justify-center gap-3 text-sm md:gap-8 md:text-base">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white md:h-6 md:w-6 md:text-sm">
            1
          </div>
          <span className="text-xs font-medium text-blue-700 md:text-sm">
            Your selection
          </span>
        </div>
        <div className="h-0.5 w-12 bg-gray-300 md:w-40" />
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white md:h-6 md:w-6 md:text-sm">
            2
          </div>
          <span className="text-xs font-medium text-blue-700 md:text-sm">
            Your details
          </span>
        </div>
        <div className="h-0.5 w-12 bg-gray-300 md:w-40" />
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-500 md:h-6 md:w-6 md:text-sm">
            3
          </div>
          <span className="text-xs font-medium text-gray-500 md:text-sm">
            Finish booking
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow md:flex-row">
            <img
              src={result?.image || "/images/mock-ielts.jpg"}
              alt={result?.title}
              className="h-32 w-32 rounded-lg border object-cover"
            />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {result?.provider}
                </div>
                <div className="mb-1 text-lg font-bold text-gray-900">
                  {result?.title}
                </div>
                <div className="mb-1 text-sm text-gray-600">
                  {result?.location}
                </div>
                <div className="mb-1 text-xs font-medium text-green-600">
                  Excellent course — 9.6
                </div>
                <div className="flex gap-2 text-xs text-gray-500">
                  <span>Duration: {result?.duration}</span>
                  <span>Mode: {result?.mode}</span>
                </div>
              </div>
              <div className="mt-2 text-lg font-bold text-neutral-600 underline">
                NPR {result?.price?.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow">
            <div className="mb-2 font-semibold">Your booking details</div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span>Start date</span>
                <span className="font-medium">{result?.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Mode</span>
                <span className="font-medium capitalize">{result?.mode}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-medium">{result?.duration}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="mb-4 text-xl font-bold">Enter your details</div>
            <div className="mb-4 flex items-center gap-2 rounded border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
              <span className="mr-2 flex inline-block h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-blue-600">
                i
              </span>
              Almost done! Just fill in the{" "}
              <span className="text-red-500">*</span> required info
            </div>
            <form className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2 text-sm"
                    required={true}
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2 text-sm"
                    required={true}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2 text-sm"
                  required={true}
                />
                <div className="mt-1 text-xs text-gray-500">
                  Confirmation email goes to this address
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Country/region <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="Nepal">Nepal</option>
                  <option value="India">India</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Phone number
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required={true}
                  className="w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Selected Test Type
                </label>
                <input
                  value={
                    TEST_TYPE_NAMES[testDetails.testType] || "Not selected"
                  }
                  readOnly
                  className="w-full rounded border bg-gray-100 px-3 py-2 text-sm"
                />
              </div>
              <button
                type="button"
                className="mt-2 w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-base font-semibold text-white hover:bg-blue-700"
                onClick={() =>
                  router.push(
                    `/finish-booking?course=${courseId}&resultId=${resultId}`
                  )
                }
              >
                Finish booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
