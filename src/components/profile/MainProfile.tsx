"use client";

import { useState } from "react";

import { format } from "date-fns";

import { useUserProfile } from "@/hooks/queries/useUserProfile";
import { authClient } from "@/lib/auth-client";
import { DocumentsTab } from "@/modules/user/profile/components/documents-tab";

import AcademicTab from "./AcademicTab";
import AdditionalReportsTab from "./AdditionalReportsTab";
import ExperienceLetterTab from "./ExperienceLetterTab";
import LanguageProficiencyTab from "./LanguageProficiencyTab";
import PaymentHistoryTab from "./PaymentHistoryTab";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";

const TEST_TYPES = ["IELTS", "PTE", "SAT", "DUOLINGO", "NAT/JLPT"];

const SIDEBAR_ITEMS = [
  { key: "personal", label: "Personal Information" },
  { key: "academic", label: "Academic" },
  { key: "reports", label: "General Documents" },
  { key: "language", label: "Language proficiency test" },
  { key: "experience", label: "Experience Letter" },
  { key: "payment", label: "Payment history" },
  { key: "security", label: "Security" },
];

export default function PublicProfileClient() {
  const { data: session } = authClient.useSession();
  const { profile, isLoading } = useUserProfile();
  const [activeSection, setActiveSection] = useState("personal");

  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";

  const fullName = profile?.profile
    ? `${profile.profile.firstName || ""} ${profile.profile.middleName ? profile.profile.middleName + " " : ""}${profile.profile.lastName || ""}`.trim()
    : userName;

  function renderMainContent() {
    switch (activeSection) {
      case "personal":
        return <ProfileTab userName={userName} userEmail={userEmail} />;
      case "academic":
        return <AcademicTab />;
      case "language":
        return <LanguageProficiencyTab />;
      case "experience":
        return <ExperienceLetterTab />;
      case "reports":
        return <DocumentsTab initialValues={profile?.documents || []} />;
      case "payment":
        return <PaymentHistoryTab />;
      case "security":
        return <SecurityTab />;
      default:
        return (
          <div className="p-10 text-center text-sm text-gray-400">
            Coming soon...
          </div>
        );
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafbfc]">
        <div className="text-sm text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fafbfc] pt-2 text-gray-900 lg:flex-row">
      <aside className="flex w-full flex-row gap-2 overflow-x-auto border-b border-gray-200 bg-white px-0 py-4 lg:w-60 lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0">
        <nav className="flex w-full flex-row gap-1 lg:flex-col">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`cursor-pointer px-4 py-2 text-left font-medium whitespace-nowrap transition-all ${
                activeSection === item.key
                  ? "border-b-2 border-indigo-500 bg-transparent text-indigo-500 lg:border-r-4 lg:border-b-0"
                  : "border-b-2 border-transparent text-gray-700 hover:text-indigo-500 lg:border-b-0"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="w-full max-w-full flex-1 px-2 py-4 sm:px-4 md:px-8">
        {renderMainContent()}
      </main>

      <aside className="flex w-full max-w-full flex-col gap-6 px-2 py-4 sm:px-6 lg:w-80">
        <div className="mb-2 rounded-xl bg-gray-900 p-4 text-white sm:p-6">
          <div className="mb-1 text-lg font-semibold">Hi, {fullName}</div>
          <div className="mb-1 text-sm">{userEmail}</div>
          <div className="text-sm">
            {profile?.profile?.phoneNumber || "No phone number"}
          </div>
          {profile?.profile?.dob && (
            <div className="text-sm text-gray-300">
              Born: {format(new Date(profile.profile.dob), "MMMM dd, yyyy")}
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 text-sm text-gray-700">Available Test Types</div>
          <hr className="mb-4 border-gray-300" />
          <div className="flex flex-col gap-3">
            {TEST_TYPES.map((type) => (
              <button
                key={type}
                className="cursor-pointer rounded-full bg-indigo-400 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {profile?.education && profile.education.length > 0 && (
          <div>
            <div className="mb-2 text-sm text-gray-700">Education Summary</div>
            <hr className="mb-4 border-gray-300" />
            <div className="space-y-3">
              {profile.education.slice(0, 3).map((edu, index) => (
                <div key={edu.id} className="rounded-lg bg-gray-50 p-3">
                  <div className="text-sm font-medium text-gray-800">
                    {edu.degree}
                  </div>
                  <div className="text-xs text-gray-600">
                    {edu.institution} • {edu.year}
                  </div>
                  {edu.gpa && (
                    <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>
                  )}
                </div>
              ))}
              {profile.education.length > 3 && (
                <div className="text-center text-xs text-gray-500">
                  +{profile.education.length - 3} more entries
                </div>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
