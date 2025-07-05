"use client";

import { useQuery } from "@tanstack/react-query";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { useTRPC } from "@/trpc/client";

export default function Footer() {
  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.public.getCourses.queryOptions()
  );

  return (
    <footer className="bg-gray-900 pt-12 pb-6 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 text-sm md:grid-cols-4">
        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">About Us</h4>
          <p className="mb-4 text-gray-400">
            Your trusted partner for IELTS, GRE, SAT preparation, consultancy,
            and mock tests. Empowering learners to achieve their study abroad
            goals.
          </p>
          <div className="mt-2 flex space-x-3">
            <a href="#" className="hover:text-white">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-white">
              <FaYoutube size={18} />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Services</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Test Preparation Classes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Mock Tests
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Consultancy Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Book Counseling
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">
            Popular Tests
          </h4>
          <ul className="space-y-2">
            {isLoading ? (
              <li className="text-gray-500">Loading courses...</li>
            ) : error || !data?.items?.length ? (
              <li className="text-gray-500">No courses available</li>
            ) : (
              data.items.slice(0, 4).map((course) => (
                <li key={course.slug}>
                  <a
                    href={`/book?course=${course.id}&service=mock-test`}
                    className="hover:text-white"
                  >
                    {course.title}
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        © 2025 YourConsultancyName. All rights reserved.
      </div>
    </footer>
  );
}
