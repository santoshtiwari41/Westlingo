"use client";

import { useQuery } from "@tanstack/react-query";
import { BookOpen, CheckCircle, CreditCard, User } from "lucide-react";
import { useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/queries/useUserProfile";
import type { RootState } from "@/store/store";
import { useTRPC } from "@/trpc/client";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

interface TestDetails {
  course: string;
  testType: string;
  plan?: string;
}

interface Course {
  id: string;
  title: string;
}

export default function UserInfoStep({
  userInfo,
  testDetails,
  courses = [],
}: {
  userInfo: UserInfo;
  testDetails: TestDetails;
  courses?: Course[];
}) {
  const { profile } = useUserProfile();
  const userInfoRedux = useSelector(
    (state: RootState) => state.booking.userInfo
  );

  let displayName = userInfo.name || userInfoRedux.name;
  let displayEmail = userInfo.email || userInfoRedux.email;
  let displayPhone = userInfo.phone || userInfoRedux.phone;

  if (profile && profile.profile) {
    const fullName = [
      profile.profile.firstName,
      profile.profile.middleName,
      profile.profile.lastName,
    ]
      .filter(Boolean)
      .join(" ");
    if (!displayName) displayName = fullName;
    if (!displayEmail && profile.email) displayEmail = profile.email;
    if (!displayPhone && profile.profile.phoneNumber)
      displayPhone = profile.profile.phoneNumber;
  }

  const selectedCourse = courses.find((c) => c.id === testDetails.course);
  const trpc = useTRPC();
  const { data: planDetails } = useQuery(
    trpc.pricings.getPricingItemById.queryOptions(
      { id: testDetails.plan || "" },
      { enabled: !!testDetails.plan }
    )
  );

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <User className="h-5 w-5" />
            Your Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <div className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-gray-900">
                {displayName || "Not provided"}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <div className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-gray-900">
                {displayEmail || "Not provided"}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <div className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-gray-900">
              {displayPhone || "Not provided"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-green-700">
            <BookOpen className="h-5 w-5" />
            Course & Test Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Selected Course
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-white px-4 py-3">
                <span className="text-gray-900">
                  {selectedCourse?.title || "Not selected"}
                </span>
                {selectedCourse && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Selected
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Test Type
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-white px-4 py-3">
                <span className="text-gray-900">
                  {testDetails.testType || "Not selected"}
                </span>
                {testDetails.testType && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Selected
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {testDetails.plan && planDetails && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <CreditCard className="h-5 w-5" />
              Plan Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border border-purple-200 bg-white p-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-purple-900">
                  {planDetails.title}
                </h3>
                <p className="text-sm text-gray-600">Selected plan</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-900">
                  NPR {planDetails.price}
                </div>
                <Badge className="bg-purple-100 text-purple-700">
                  Premium Plan
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Ready to Continue?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Review your information above and click Continue to select your
              preferred date and time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
