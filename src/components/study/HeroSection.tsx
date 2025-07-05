import Image from "next/image";

import { Globe, GraduationCap, Plane } from "lucide-react";

export default function StudyAbroadHero() {
  return (
    <section className="bg-white px-6 py-16 md:px-20">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h1 className="mb-4 text-4xl leading-tight font-bold text-gray-900">
            Your Global Education Journey Starts Here
          </h1>
          <p className="mb-6 text-gray-600">
            Get expert guidance on IELTS, university selection, visa success,
            and more. Study in Canada, Australia, UK, or your dream destination.
          </p>

          <div className="mb-6 flex gap-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-indigo-600" />
              <span className="text-sm text-gray-700">Test Preparation</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="text-indigo-600" />
              <span className="text-sm text-gray-700">Visa Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="text-indigo-600" />
              <span className="text-sm text-gray-700">Global Reach</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
              Book Free Consultation
            </button>
            <button className="rounded-full border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50">
              Watch Success Story
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              className="h-64 w-full object-cover"
            />
          </div>
          <div className="mt-4 rounded-lg bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              Real Student Visa Success: Australia 🇦🇺
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Hear how our team helped Sita Karki achieve her dream education in
              Melbourne.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
