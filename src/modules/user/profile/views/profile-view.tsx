"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Briefcase,
  FileText,
  GraduationCap,
  MapPin,
  Star,
  User,
} from "lucide-react";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import PaymentHistoryTab from "@/components/profile/PaymentHistoryTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTRPC } from "@/trpc/client";

import { DocumentsTab } from "../components/documents-tab";
import { EducationTab } from "../components/education-tab";
import { PersonalInfoTab } from "../components/personal-info-tab";

export const ProfileView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.users.getProfile.queryOptions());

  return (
    <div className="container mx-auto">
      <Tabs defaultValue="personal" className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full min-w-[300px] grid-cols-7 sm:min-w-0">
            <TabsTrigger
              value="personal"
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger
              value="address"
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Address</span>
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger
              value="payment-history"
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Payment History</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="personal">
          <PersonalInfoTab initialValues={data.profile} />
        </TabsContent>

        <TabsContent value="education">
          <EducationTab initialValues={data.education} />
        </TabsContent>

        <TabsContent value="experience">
          {/* <ExperienceTab initialValues={data.experience} /> */}
        </TabsContent>

        <TabsContent value="skills">
          {/* <SkillsTab initialValues={data.skills} /> */}
        </TabsContent>

        <TabsContent value="address">
          {/* <AddressTab initialValues={address} /> */}
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab initialValues={data.documents} />
        </TabsContent>

        <TabsContent value="payment-history">
          <PaymentHistoryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const ProfileViewLoading = () => {
  return (
    <LoadingState
      title="Loading Profile"
      description="This may take a few seconds..."
    />
  );
};
export const ProfileViewError = () => {
  return (
    <ErrorState
      title="Error Loading Profile"
      description="Something went wrong!"
    />
  );
};
