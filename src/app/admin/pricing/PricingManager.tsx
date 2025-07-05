"use client";

import React, { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { uploadToCloudinary } from "@/actions/cloudinary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingsForm from "@/modules/admin/common/pricings/components/form/pricings-form";
import PricingsPreview from "@/modules/admin/common/pricings/components/pricings-preview";
import { useTRPC } from "@/trpc/client";

import PricingTabContent from "./PricingTabContent";
import { deletePaymentQr, getPaymentQr, savePaymentQr } from "./actions";

const PricingManager = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>("preparation");

  const { data: coursesData, isLoading: coursesLoading } = useQuery(
    trpc.public.getCourses.queryOptions()
  );
  const allCourses = coursesData?.items || [];

  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const { data: preparations = [], isLoading: preparationsLoading } = useQuery({
    ...trpc.preparations.getAllByCourse.queryOptions({
      courseId: selectedCourseId,
    }),
    enabled: !!selectedCourseId,
  });
  const { data: mockTests = [], isLoading: mockTestsLoading } = useQuery({
    ...trpc.mockTests.getAllByCourse.queryOptions({
      courseId: selectedCourseId,
    }),
    enabled: !!selectedCourseId,
  });
  const { data: testBookings = [], isLoading: testBookingsLoading } = useQuery({
    ...trpc.bookings.getAllByCourse.queryOptions({
      courseId: selectedCourseId,
    }),
    enabled: !!selectedCourseId,
  });

  const [pricingModal, setPricingModal] = useState<{
    type: "add" | "edit";
    entityType: "preparation" | "mockTest" | "testBooking";
    entity: any;
  } | null>(null);

  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrUploading, setQrUploading] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const qrInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQrLoading(true);
    getPaymentQr()
      .then((data) => setQrUrl(data?.url || null))
      .catch(() => setQrError("Failed to load QR"))
      .finally(() => setQrLoading(false));
  }, []);

  const handleQrChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setQrUploading(true);
    setQrError(null);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadToCloudinary(formData, "qr");
    if ("error" in result) {
      setQrError("Cloudinary upload failed");
      setQrUploading(false);
      return;
    }

    try {
      const qr = await savePaymentQr(result.url);
      setQrUrl(qr.url);
    } catch {
      setQrError("Failed to save QR to DB");
    }
    setQrUploading(false);
  };

  const handleQrRemove = async () => {
    setQrLoading(true);
    await deletePaymentQr();
    setQrUrl(null);
    setQrLoading(false);
  };

  const invalidateEntityQuery = (entityType: string) => {
    if (entityType === "preparation") {
      queryClient.invalidateQueries({
        queryKey: [
          "preparations.getAllByCourse",
          { courseId: selectedCourseId },
        ],
      });
    } else if (entityType === "mockTest") {
      queryClient.invalidateQueries({
        queryKey: ["mockTests.getAllByCourse", { courseId: selectedCourseId }],
      });
    } else if (entityType === "testBooking") {
      queryClient.invalidateQueries({
        queryKey: ["bookings.getAllByCourse", { courseId: selectedCourseId }],
      });
    }
  };

  return (
    <div className="flex flex-row gap-6 p-4 md:p-8">
      <div className="order-1 min-w-0 flex-1">
        <h1 className="mb-4 text-2xl font-bold">Course Pricing Management</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="preparation">Preparation Classes</TabsTrigger>
            <TabsTrigger value="mockTest">Mock Test</TabsTrigger>
            <TabsTrigger value="testBooking">Test Booking</TabsTrigger>
          </TabsList>
          <div className="mb-6">
            <label className="mb-1 block font-medium">Select Course</label>
            <Select
              value={selectedCourseId}
              onValueChange={setSelectedCourseId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a course..." />
              </SelectTrigger>
              <SelectContent>
                {coursesLoading ? (
                  <SelectItem value="__loading__" disabled>
                    Loading...
                  </SelectItem>
                ) : allCourses.length > 0 ? (
                  allCourses.map((course: any) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title} {course.type ? `(${course.type})` : ""}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="__no_courses__" disabled>
                    No courses found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="preparation">
            <PricingTabContent
              items={preparations}
              entityType="preparation"
              selectedCourseId={selectedCourseId}
              loading={preparationsLoading}
              setPricingModal={setPricingModal}
            />
          </TabsContent>
          <TabsContent value="mockTest">
            <PricingTabContent
              items={mockTests}
              entityType="mockTest"
              selectedCourseId={selectedCourseId}
              loading={mockTestsLoading}
              setPricingModal={setPricingModal}
            />
          </TabsContent>
          <TabsContent value="testBooking">
            <PricingTabContent
              items={testBookings}
              entityType="testBooking"
              selectedCourseId={selectedCourseId}
              loading={testBookingsLoading}
              setPricingModal={setPricingModal}
            />
          </TabsContent>
          {pricingModal &&
            (() => {
              let parentRef: any = null;
              if (pricingModal.entityType === "preparation")
                parentRef = { preparationClassId: pricingModal.entity.id };
              if (pricingModal.entityType === "mockTest")
                parentRef = { mockTestId: pricingModal.entity.id };
              if (pricingModal.entityType === "testBooking")
                parentRef = { testBookingId: pricingModal.entity.id };
              if (!parentRef) return null;
              return (
                <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black">
                  <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                    <PricingsForm
                      parentRef={parentRef}
                      initialValues={
                        pricingModal.type === "edit"
                          ? pricingModal.entity.pricing
                          : undefined
                      }
                      onSuccess={() => {
                        setPricingModal(null);
                        invalidateEntityQuery(pricingModal.entityType);
                        toast.success("Pricing changes saved successfully.");
                      }}
                      onCancel={() => setPricingModal(null)}
                    />
                  </div>
                </div>
              );
            })()}
        </Tabs>
      </div>
      <div className="order-2 mb-6 w-full flex-shrink-0 md:mb-0 md:w-64">
        <div className="flex w-full flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          <div className="mb-2 flex items-center gap-2 font-semibold">
            <UploadCloudIcon className="h-5 w-5 text-blue-500" /> Payment QR
            Upload
          </div>
          {qrLoading ? (
            <div className="mb-2 text-sm text-gray-400">Loading...</div>
          ) : qrUrl ? (
            <div className="mb-2 flex w-full flex-col items-center">
              <img
                src={qrUrl}
                alt="QR Preview"
                className="mb-2 h-32 w-32 rounded border object-contain"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={handleQrRemove}
                disabled={qrLoading}
              >
                <XIcon className="mr-1 inline h-4 w-4" /> Remove QR
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => qrInputRef.current?.click()}
                disabled={qrUploading}
                className="mt-2"
              >
                Replace QR
              </Button>
            </div>
          ) : (
            <Button
              className="mb-2 w-full px-3 py-2"
              onClick={() => qrInputRef.current?.click()}
              disabled={qrUploading}
            >
              Upload QR Code
            </Button>
          )}
          <input
            ref={qrInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleQrChange}
            disabled={qrUploading}
          />
          {qrUploading && (
            <div className="mt-1 text-xs text-blue-500">Uploading...</div>
          )}
          {qrError && (
            <div className="mt-1 text-xs text-red-500">{qrError}</div>
          )}
          <div className="mt-1 text-center text-xs text-gray-400">
            This QR will be shown on the payment page.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingManager;
