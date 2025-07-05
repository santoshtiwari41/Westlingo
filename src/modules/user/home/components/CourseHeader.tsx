import Image from "next/image";

import { BookOpen, CheckCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const CourseHeader = ({ data }: { data: any }) => {
  return (
    <div className="relative mt-5 mb-8 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 z-0 bg-white opacity-80 dark:from-zinc-900 dark:via-zinc-800 dark:to-purple-900" />
      <div className="relative z-10 flex flex-col items-center gap-6 p-4 md:flex-row md:p-6">
        <div className="flex w-full flex-shrink-0 items-center justify-center md:w-1/3">
          <div className="relative h-48 w-48 overflow-hidden rounded-xl bg-purple-200 shadow-lg sm:h-56 sm:w-56 md:h-64 md:w-64">
            {data.url ? (
              <Image
                src={data.url}
                alt={data.title}
                fill
                className="object-cover"
                quality={90}
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-purple-50 text-purple-300">
                <BookOpen className="size-20" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 text-center md:items-start md:text-left">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant={data.isActive ? "default" : "destructive"}
              className={`flex items-center gap-1 px-3 py-1 text-base font-semibold ${data.isActive ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
            >
              <CheckCircle className="size-4" />
              {data.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <h1 className="mb-1 text-3xl font-extrabold text-zinc-900 sm:text-4xl dark:text-white">
            {data.title}
          </h1>
          <p className="mb-2 max-w-2xl text-base text-zinc-700 sm:text-lg dark:text-zinc-200">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
