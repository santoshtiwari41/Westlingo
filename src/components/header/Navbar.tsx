import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Menu, Search } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";

import ExploreDropdown from "./ExploreDropdown";
import LogoSection from "./LogoSection";
import StudyAbroadDropdown from "./StudyAbroadDropdown";
import UserActions from "./UserActions";

export default function Navbar() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const trpc = useTRPC();
  const {
    data: coursesData,
    error: coursesError,
    isLoading: coursesLoading,
  } = useQuery(trpc.public.getCourses.queryOptions());

  const handlelogin = () => {
    router.push("/sign-in");
  };
  const handleregister = () => {
    router.push("/sign-up");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const courseServices = [
    { label: "Mock Test", service: "mock-test" },
    { label: "Preparation Classes", service: "preparation" },
    { label: "Test Booking", service: "test-booking" },
  ];
  const studyAbroadCountries = [
    { name: "USA", slug: "usa" },
    { name: "UK", slug: "uk" },
    { name: "Canada", slug: "canada" },
    { name: "Australia", slug: "australia" },
    { name: "New Zealand", slug: "new-zealand" },
    { name: "Germany", slug: "germany" },
  ];
  const visaTypes = [
    { label: "Student Visa", type: "student-visa" },
    { label: "Work Visa", type: "work-visa" },
  ];
  const visaCountries = [
    { name: "USA", slug: "usa" },
    { name: "UK", slug: "uk" },
    { name: "Canada", slug: "canada" },
    { name: "Australia", slug: "australia" },
    { name: "New Zealand", slug: "new-zealand" },
    { name: "Germany", slug: "germany" },
  ];

  const writingMenu = [
    {
      label: "Academy",
      children: [
        { label: "Essay Writing", slug: "essay-writing" },
        { label: "Report Writing", slug: "report-writing" },
      ],
    },
    {
      label: "Creative",
      children: [
        { label: "Story Writing", slug: "story-writing" },
        { label: "Poetry", slug: "poetry" },
      ],
    },
    {
      label: "Resume",
      children: [
        { label: "CV Drafting", slug: "cv-drafting" },
        { label: "Cover Letter", slug: "cover-letter" },
      ],
    },
  ];

  return (
    <nav className="bg-white px-4 py-2 text-gray-800 shadow-sm md:px-8">
      <div className="mx-auto hidden max-w-7xl items-center justify-between gap-8 md:flex">
        <div className="flex w-full items-center justify-between whitespace-nowrap">
          <div className="flex items-center gap-4">
            <LogoSection />
            <ExploreDropdown />
            <StudyAbroadDropdown />
            <div className="group relative hidden md:block">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:border-indigo-200 hover:bg-indigo-50 focus:ring-indigo-300">
                Writing <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              <div className="animate-fade-in invisible absolute top-full left-0 z-50 mt-1 min-w-[200px] rounded-xl border border-indigo-100 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <ul className="py-2">
                  {writingMenu.map((section) => (
                    <li key={section.label} className="group/submenu relative">
                      <button className="flex w-full items-center justify-between rounded px-4 py-1.5 text-gray-800 hover:bg-indigo-50 hover:text-indigo-700">
                        {section.label}
                        <ChevronDown className="ml-2 h-3 w-3 text-gray-400" />
                      </button>
                      <div className="animate-fade-in invisible absolute top-0 left-full z-40 ml-2 min-w-[180px] rounded-xl border border-indigo-100 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover/submenu:visible group-hover/submenu:opacity-100">
                        <ul className="py-2">
                          {section.children.map((item) => (
                            <li key={item.slug}>
                              <a
                                href={`/writing/${item.slug}`}
                                className="block rounded px-4 py-1.5 whitespace-nowrap text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              onClick={() => router.push("/visa")}
              className="hidden items-center gap-1 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:border-indigo-200 hover:bg-indigo-50 focus:ring-indigo-300 md:flex"
              type="button"
            >
              Visa Services
            </button>
            <a
              href="/blog"
              className="hidden items-center gap-1 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:border-indigo-200 hover:bg-indigo-50 focus:ring-indigo-300 md:flex"
            >
              Blogs
            </a>
            <div className="ml-4 hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses, services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 rounded-full border border-purple-300 bg-purple-50 py-2 pr-4 pl-10 text-sm transition-colors hover:bg-white focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-purple-400" />
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center">
            <UserActions
              user={data?.user}
              isPending={isPending}
              handlelogin={handlelogin}
              handleregister={handleregister}
              handleProfile={() => router.push("/profile")}
              handleSettings={() => router.push("/profile")}
              handleBookings={() => router.push("/my-bookings")}
              handleLogout={() => authClient.signOut({})}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:hidden">
        <button
          onClick={() => setIsSheetOpen(true)}
          className="rounded p-2 text-gray-700 hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
        <div className="flex flex-1 justify-center">
          <Image
            src="/logo.png"
            alt="Smart Consult Logo"
            width={120}
            height={38}
            className="w-auto"
          />
        </div>
        <div className="w-8" />
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="left" className="w-[320px] p-0">
          <div className="flex h-full min-h-0 flex-col">
            <div className="px-4 pt-10 pb-2">
              {isPending ? null : data?.user ? (
                <>
                  <button
                    className="mb-2 flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-left transition hover:bg-indigo-100"
                    onClick={() => {
                      router.push("/profile");
                      setIsSheetOpen(false);
                    }}
                    aria-label="Go to profile"
                  >
                    {data.user.image ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={data.user.image} />
                      </Avatar>
                    ) : (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                        {data.user.name?.[0]}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-base font-semibold text-gray-900">
                        {data.user.name}
                      </div>
                      {data.user.email && (
                        <div className="truncate text-xs text-gray-500">
                          {data.user.email}
                        </div>
                      )}
                    </div>
                    <ChevronDown className="h-5 w-5 rotate-[-90deg] text-indigo-500" />
                  </button>
                  <button
                    className="mb-4 flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-left transition hover:bg-indigo-100"
                    onClick={() => {
                      router.push("/my-bookings");
                      setIsSheetOpen(false);
                    }}
                    aria-label="Go to my bookings"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-base font-semibold text-gray-900">
                        My Bookings
                      </div>
                    </div>
                  </button>
                </>
              ) : null}
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <a
                href="/blog"
                className="block rounded px-3 py-2 text-base font-semibold text-indigo-700 hover:bg-indigo-50"
              >
                Blog
              </a>
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50">
                  <span className="flex items-center gap-2">
                    Explore{" "}
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </span>
                </summary>
                <div className="mt-2 flex flex-col gap-2 pl-2">
                  {coursesLoading ? (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Loading courses...
                    </div>
                  ) : (
                    coursesData?.items.map((course) => (
                      <a
                        key={course.id}
                        href={`/courses/${course.slug}`}
                        className="block rounded px-3 py-2 text-gray-700 hover:bg-indigo-50"
                      >
                        {course.title}
                      </a>
                    ))
                  )}
                </div>
              </details>
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50">
                  <span className="flex items-center gap-2">
                    Study Abroad{" "}
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </span>
                </summary>
                <div className="mt-2 flex flex-col gap-2 pl-2">
                  {studyAbroadCountries.map((country) => (
                    <details key={country.slug} className="group">
                      <summary className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-gray-800 hover:bg-indigo-50">
                        <span>{country.name}</span>
                        <ChevronDown className="h-3 w-3 text-gray-400 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-1 flex flex-col gap-1 pl-4">
                        <a
                          href={`/abroad/${country.slug}/application`}
                          className="block rounded px-3 py-2 text-gray-700 hover:bg-indigo-50"
                        >
                          Application
                        </a>
                        <a
                          href={`/abroad/${country.slug}/visa-guidance`}
                          className="block rounded px-3 py-2 text-gray-700 hover:bg-indigo-50"
                        >
                          Visa Guidance
                        </a>
                      </div>
                    </details>
                  ))}
                </div>
              </details>
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50">
                  <span className="flex items-center gap-2">
                    Writing{" "}
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </span>
                </summary>
                <div className="mt-2 flex flex-col gap-2 pl-2">
                  {writingMenu.map((section) => (
                    <details key={section.label} className="group">
                      <summary className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-gray-800 hover:bg-indigo-50">
                        <span>{section.label}</span>
                        <ChevronDown className="h-3 w-3 text-gray-400 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-1 flex flex-col gap-1 pl-4">
                        {section.children.map((item) => (
                          <a
                            key={item.slug}
                            href={`/writing/${item.slug}`}
                            className="block rounded px-3 py-2 text-gray-700 hover:bg-indigo-50"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </details>
            </div>
            <div className="px-4 pt-2 pb-6">
              {isPending ? null : data?.user ? (
                <button
                  className="w-full rounded-full border border-red-500 bg-white px-5 py-3 font-semibold text-red-600 shadow-sm transition hover:bg-red-50 hover:text-red-700"
                  onClick={() => {
                    authClient.signOut({});
                    setIsSheetOpen(false);
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleregister();
                      setIsSheetOpen(false);
                    }}
                    className="mb-2 w-full rounded-full border border-indigo-600 bg-white px-5 py-3 font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => {
                      handlelogin();
                      setIsSheetOpen(false);
                    }}
                    className="mb-2 w-full rounded-full border border-indigo-600 bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
