import { Calendar, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import CustomSection from "./custom-section";

interface CustomHeroProps {
  course: string;
  title: string;
  description: string;
}

const CustomHero = ({ course }: CustomHeroProps) => {
  return (
    <CustomSection className="relative min-h-96 overflow-hidden">
      <div className="bg-grid-pattern absolute inset-0 opacity-5" />

      <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Button
          size="lg"
          className="transform bg-rose-500 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-rose-600 hover:shadow-xl sm:rounded-l-none sm:rounded-r-2xl"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Reserve Your Seat
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="transform border-rose-500 bg-transparent px-8 py-3 text-rose-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-rose-50 hover:shadow-xl sm:rounded-l-2xl sm:rounded-r-none"
        >
          <Users className="mr-2 h-5 w-5" />
          Book Your Counselor
        </Button>
      </div>

      <div className="flex h-full w-full items-center justify-center space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl leading-tight font-bold md:text-4xl lg:text-5xl">
            <span className="block text-gray-800">
              English Proficiency TEST
            </span>
            <span className="mt-2 block text-rose-600">Preperation Class</span>
            <span className="mt-4 block text-3xl font-black tracking-wider text-gray-900 uppercase md:text-4xl lg:text-6xl">
              {course}
            </span>
          </h1>
        </div>
      </div>

      <div className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-rose-200 opacity-20"></div>
      <div className="absolute right-10 bottom-20 h-32 w-32 animate-pulse rounded-full bg-gray-200 opacity-20 delay-1000"></div>
      <div className="absolute top-1/2 left-5 h-16 w-16 animate-bounce rounded-full bg-rose-300 opacity-15"></div>
    </CustomSection>
  );
};

export default CustomHero;
