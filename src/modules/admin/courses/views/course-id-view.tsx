"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";

import CourseIdViewHeader from "../components/course-id-view-header";
import CoursePreview from "./course-preview";

interface CourseIdViewProps {
  id: string;
}

interface PricingRow {
  id: string;
  type: string;
  tier: string;
  price: string;
  features: string[];
}

const TYPE_OPTIONS = [
  { value: "test-booking", label: "Test Booking" },
  { value: "preparation-classes", label: "Preparation Classes" },
  { value: "mock-test", label: "Mock Test" },
];
const TIER_OPTIONS = [
  { value: "Basic", label: "Basic" },
  { value: "Standard", label: "Standard" },
  { value: "Premium", label: "Premium" },
];

export const CourseIdView = ({ id }: CourseIdViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.courses.getOne.queryOptions({ id }));
  return <CoursePreview data={data} />;
};

export const CourseIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Course"
      description="This may take a few seconds..."
    />
  );
};
export const CourseIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Course"
      description="Something went wrong!"
    />
  );
};
