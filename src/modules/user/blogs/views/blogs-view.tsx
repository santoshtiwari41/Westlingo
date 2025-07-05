"use client";

import Image from "next/image";
import Link from "next/link";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "lucide-react";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";

export const BlogsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.publics.getBlogs.queryOptions());

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
      {data.items.map((blog) => (
        <Card key={blog.id}>
          <CardHeader>
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
              <Image
                src={
                  blog?.image ??
                  "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751371868/blog/uyqqrzlagkjdwi6vlifv.png"
                }
                alt={blog.title}
                fill
                className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </AspectRatio>
            <CardTitle>{blog.title}</CardTitle>
            <CardDescription>
              {blog.description.substring(0, 50)}...
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" asChild>
              <Link href={`/blogs/${blog.slug}`}>
                Read <ArrowRightIcon />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export const BlogsViewLoading = () => {
  return <LoadingState title="" description="" />;
};
export const BlogsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Blogs"
      description="Something went wrong!"
    />
  );
};
