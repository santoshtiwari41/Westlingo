"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Laptop,
  Search,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { setBookingDetails, setCourse, setDate } from "@/store/uiSlice";
import { useTRPC } from "@/trpc/client";

export default function SearchBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedService, selectedCourse, selectedDate, bookingDetails } =
    useSelector((state: RootState) => state.ui);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const trpc = useTRPC();
  const {
    data: coursesData,
    error,
    isLoading,
  } = useQuery(trpc.public.getCourses.queryOptions());

  useEffect(() => {
    if (!coursesData?.items) return;

    const filtered = coursesData.items.filter((course) => {
      const matchesService =
        selectedService === "preparation"
          ? true
          : course.title.toLowerCase().includes("language") ||
            course.title.toLowerCase().includes("ielts") ||
            course.title.toLowerCase().includes("pte") ||
            course.title.toLowerCase().includes("toefl");
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesService && matchesSearch;
    });
    setFilteredCourses(filtered);
  }, [searchQuery, selectedService, coursesData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedCourse && coursesData?.items) {
      const selectedCourseData = coursesData.items.find(
        (course) => course.id === selectedCourse
      );
      if (selectedCourseData) {
        setSearchQuery(selectedCourseData.title);
      }
    }
  }, [selectedCourse, coursesData]);

  const handleSearch = () => {
    if (
      !selectedCourse ||
      !selectedDate ||
      !bookingDetails.mode ||
      !bookingDetails.duration
    ) {
      alert("Please fill all fields.");
      return;
    }
    const params = new URLSearchParams({
      course: selectedCourse,
      date: selectedDate,
      mode: bookingDetails.mode,
      duration: bookingDetails.duration,
      service: selectedService,
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative z-10 mx-auto -mt-4 w-full px-30">
      <div className="flex flex-col items-stretch gap-1.5 rounded-xl border-[3px] border-yellow-400 bg-white p-1.5 shadow-md lg:flex-row lg:gap-0">
        <div className="relative flex flex-1 items-center gap-1.5 border-r border-gray-200 px-3 py-2">
          <Search className="shrink-0 text-gray-500" size={16} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Choose course"
            className="w-full bg-transparent text-sm placeholder-gray-500 outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
              if (!e.target.value) dispatch(setCourse(""));
            }}
            onFocus={() => setIsDropdownOpen(true)}
          />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-auto rounded border border-gray-200 bg-white shadow-md"
            >
              <div className="p-1">
                {isLoading ? (
                  <div className="p-2 text-center text-sm text-slate-500">
                    Loading courses...
                  </div>
                ) : error || filteredCourses.length === 0 ? (
                  <div className="p-2 text-center text-sm text-slate-500">
                    {error ? "Error loading courses" : "No courses found"}
                  </div>
                ) : (
                  filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className={`cursor-pointer rounded-md px-3 py-2 text-sm ${
                        selectedCourse === course.id
                          ? "bg-teal-50 text-teal-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        dispatch(setCourse(course.id));
                        setSearchQuery(course.title);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-xs text-gray-500">
                            {course.description.substring(0, 30)}...
                          </div>
                        </div>
                        {selectedCourse === course.id && (
                          <Check className="text-teal-600" size={14} />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative flex flex-1 items-center gap-1.5 border-r border-gray-200 px-3 py-2">
          <Calendar className="shrink-0 text-gray-500" size={16} />
          <input
            type="date"
            className="w-full bg-transparent text-sm outline-none"
            value={selectedDate || ""}
            onChange={(e) => dispatch(setDate(e.target.value))}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="relative flex flex-1 items-center gap-1.5 border-r border-gray-200 px-3 py-2">
          <Laptop className="shrink-0 text-gray-500" size={16} />
          <select
            className="w-full appearance-none bg-transparent pr-5 text-sm outline-none"
            value={bookingDetails.mode}
            onChange={(e) =>
              dispatch(
                setBookingDetails({
                  mode: e.target.value as "online" | "offline" | "hybrid",
                })
              )
            }
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <ChevronDown className="absolute right-3 text-gray-400" size={12} />
        </div>

        <div className="relative flex flex-1 items-center gap-1.5 px-3 py-2">
          <Clock className="shrink-0 text-gray-500" size={16} />
          <select
            className="w-full appearance-none bg-transparent pr-5 text-sm outline-none"
            value={bookingDetails.duration}
            onChange={(e) =>
              dispatch(
                setBookingDetails({
                  duration: e.target.value as
                    | "1-month"
                    | "3-months"
                    | "6-months"
                    | "custom",
                })
              )
            }
          >
            <option value="1-month">1 Month</option>
            <option value="3-months">3 Months</option>
            <option value="6-months">6 Months</option>
            <option value="custom">Custom</option>
          </select>
          <ChevronDown className="absolute right-3 text-gray-400" size={12} />
        </div>

        <div className="flex items-center justify-center px-2 py-2">
          <button
            onClick={handleSearch}
            className="cursor-pointer rounded-md bg-blue-600 px-5 py-[10px] text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
