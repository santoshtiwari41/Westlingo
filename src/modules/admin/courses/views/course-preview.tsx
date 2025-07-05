"use client";

import Image from "next/image";
import Link from "next/link";

import { Edit2, FileText, PlusIcon } from "lucide-react";

import TipTap from "@/components/tiptap";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { CourseGetOne } from "../types";

export default function CoursePreview({ data }: { data: CourseGetOne }) {
  return (
    <div>
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader className="">
          {data.url && (
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
              <Image
                src={data.url}
                alt={data.title}
                fill
                className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
              />

              <Badge
                variant={data.isActive ? "default" : "destructive"}
                className="absolute right-2 bottom-2 text-sm"
              >
                {data.isActive ? "Active" : "Inactive"}
              </Badge>
            </AspectRatio>
          )}
          <CardTitle className="text-2xl">{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <TipTap content={data.content} />
        </CardContent>
      </Card>

      <Separator />
      <div className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <FileText />
          Course Components
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.mockTest ? (
            <Card>
              <CardHeader>
                <CardTitle>{data.mockTest.title}</CardTitle>
                <CardDescription>{data.mockTest.description}</CardDescription>
                <CardAction>
                  <Button asChild>
                    <Link
                      href={`/admin/courses/${data.id}/mock-tests/${data.mockTest.id}`}
                    >
                      <Edit2 />
                    </Link>
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>{data.mockTest.content}</p>
              </CardContent>
              <CardFooter>
                {/* {format(data.mockTest.createdAt, "yyyy-MM-dd HH:mm")} */}
              </CardFooter>
            </Card>
          ) : (
            <Button asChild>
              <Link href={`/admin/courses/${data.id}/mock-tests/new`}>
                <PlusIcon />
                Create New Mock Test
              </Link>
            </Button>
          )}

          {data.preparationClass ? (
            <Card>
              <CardHeader>
                <CardTitle>{data.preparationClass.title}</CardTitle>
                <CardDescription>
                  {data.preparationClass.description}
                </CardDescription>
                <CardAction>
                  <Button asChild>
                    <Link
                      href={`/admin/courses/${data.id}/preparation-classes/${data.preparationClass.id}`}
                    >
                      <Edit2 />
                    </Link>
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>{data.preparationClass.content}</p>
              </CardContent>
              <CardFooter>
                <p>
                  {/* {format(data.preparationClass.createdAt, "yyyy-MM-dd HH:mm")} */}
                </p>
              </CardFooter>
            </Card>
          ) : (
            <Button asChild>
              <Link href={`/admin/courses/${data.id}/preparation-classes/new`}>
                <PlusIcon />
                Create New Mock Test
              </Link>
            </Button>
          )}

          {data.testBooking ? (
            <Card>
              <CardHeader>
                <CardTitle>{data.testBooking.title}</CardTitle>
                <CardDescription>
                  {data.testBooking.description}
                </CardDescription>
                <CardAction>
                  <Button asChild>
                    <Link
                      href={`/admin/courses/${data.id}/test-bookings/${data.testBooking.id}`}
                    >
                      <Edit2 />
                    </Link>
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>{data.testBooking.content}</p>
              </CardContent>
              <CardFooter>
                {/* {format(data.testBooking.createdAt, "yyyy-MM-dd HH:mm")} */}
              </CardFooter>
            </Card>
          ) : (
            <Button asChild>
              <Link href={`/admin/courses/${data.id}/test-bookings/new`}>
                <PlusIcon />
                Create New Mock Test
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
