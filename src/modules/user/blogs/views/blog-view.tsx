"use client";

import Image from "next/image";

import { useSuspenseQuery } from "@tanstack/react-query";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import TipTap from "@/components/tiptap";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";

export const BlogView = ({ slug }: { slug: string }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.public.getBlog.queryOptions({ slug: slug })
  );

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader>
        {data.image && (
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </AspectRatio>
        )}
        <CardTitle className="text-2xl">{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <TipTap content={data.content} />
      </CardContent>
    </Card>
  );
};

export const BlogViewLoading = () => {
  return (
    <LoadingState
      title="Loading Course"
      description="This may take a few seconds..."
    />
  );
};
export const BlogViewError = () => {
  return (
    <ErrorState
      title="Error Loading Course"
      description="Something went wrong!"
    />
  );
};
