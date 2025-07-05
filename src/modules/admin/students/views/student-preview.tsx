"use client";

import { useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle,
  CreditCard,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
  XCircle,
} from "lucide-react";

import GeneratedAvatar from "@/components/common/generated-avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTRPC } from "@/trpc/client";

import StudentAcademics from "../components/student-academics";
import StudentBookings from "../components/student-bookings";
import StudentPayments from "../components/student-payments";
import StudentPersonalInfo from "../components/student-personal-info";
import StudentReports from "../components/student-reports";
import { GetStudent } from "../types";

export default function StudentPreview({ data }: { data: GetStudent }) {
  const [activeTab, setActiveTab] = useState("overview");
  const trpc = useTRPC();

  const { data: reservations = [], refetch: refetchReservations } =
    useSuspenseQuery(
      trpc.students.getStudentReservations.queryOptions({ id: data.id })
    );

  const refetchData = () => {
    refetchReservations();
  };

  const getStatusColor = (verified: boolean) => {
    return verified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getStatusIcon = (verified: boolean) => {
    return verified ? (
      <CheckCircle className="h-4 w-4" />
    ) : (
      <XCircle className="h-4 w-4" />
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={data.name}
              className="h-16 w-16"
            />
            <div>
              <CardTitle className="text-2xl">{data.name}</CardTitle>
              <CardDescription className="text-base">
                {data.email}
              </CardDescription>
              <div className="mt-2 flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className={`${getStatusColor(data.emailVerified)} border-0`}
                >
                  {getStatusIcon(data.emailVerified)}
                  <span className="ml-1">
                    {data.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </Badge>
                <Badge variant="secondary">ID: {data.id.slice(-8)}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Contact Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-gray-600">{data.email}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-gray-600">
                            {data.profile?.phoneNumber || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm text-gray-600">
                            {data.profile?.permanentAddress
                              ? "Address on file"
                              : "Not provided"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Member since
                        </span>
                        <span className="text-sm text-gray-600">
                          {new Date(data.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Last updated
                        </span>
                        <span className="text-sm text-gray-600">
                          {new Date(data.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="personal">
                <StudentPersonalInfo data={data} />
              </TabsContent>

              <TabsContent value="bookings">
                <StudentBookings
                  studentId={data.id}
                  reservations={reservations}
                />
              </TabsContent>

              <TabsContent value="academics">
                <StudentAcademics studentId={data.id} data={data} />
              </TabsContent>

              <TabsContent value="payments">
                <StudentPayments studentId={data.id} />
              </TabsContent>

              <TabsContent value="reports">
                <StudentReports studentId={data.id} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
