"use client";

import Image from "next/image";

import { useSuspenseQuery } from "@tanstack/react-query";

import CustomContainer from "@/components/common/custom-container";
import TipTap from "@/components/tiptap";
import { Badge } from "@/components/ui/badge";
import { useTRPC } from "@/trpc/client";

export default function BlogPreview({ slug }: { slug: string }) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.public.getBlog.queryOptions({
      slug: slug,
    })
  );

  return (
    <CustomContainer>
      <div className="flex flex-col gap-6 md:flex-row">
        {data.image && (
          <div className="relative h-48 w-full overflow-hidden rounded-lg bg-zinc-100 shadow-sm md:w-48">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 12rem"
              priority
            />
          </div>
        )}

        <div className="flex flex-1 flex-col">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-zinc-800">{data.title}</h1>
            <Badge
              variant={data.isActive ? "outline" : "destructive"}
              className={`h-6 text-xs ${
                data.isActive
                  ? "border-green-600 text-green-600"
                  : "border-red-600 text-red-600"
              }`}
            >
              {data.isActive ? "Active Course" : "Inactive"}
            </Badge>
          </div>
          <p className="text-base leading-relaxed text-zinc-600">
            {data.description}
          </p>
        </div>
      </div>

      <div className="prose prose-zinc prose-headings:text-zinc-800 prose-p:text-zinc-700 max-w-none">
        <TipTap content={data.content} />
      </div>
    </CustomContainer>
  );
}
