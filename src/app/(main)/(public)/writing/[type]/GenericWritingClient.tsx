"use client";

import Image from "next/image";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTRPC } from "@/trpc/client";

import { submitCVWriting, submitWritingTransaction } from "../actions";
import { getWritingPrice } from "../priceActions";

export default function GenericWritingClient({
  userId,
  writingTypeId,
  tiers,
  visaTypes,
  typeName,
  imageUrl,
}: {
  userId: string | null;
  writingTypeId: number;
  tiers: { id: number; name: string }[];
  visaTypes: { id: number; name: string }[];
  typeName: string;
  imageUrl: string;
}) {
  const [tierId, setTierId] = useState("");
  const [country, setCountry] = useState("");
  const [visaTypeId, setVisaTypeId] = useState("");
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [writingId, setWritingId] = useState<number | null>(null);
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const trpc = useTRPC();
  const { data: qrData, isLoading: qrLoading } = useQuery(
    trpc.publics.getPaymentQr.queryOptions()
  );
  const qrUrl = qrData?.url;

  const handleTierChange = async (value: string) => {
    setTierId(value);
    if (value) {
      const fetchedPrice = await getWritingPrice({
        writingTypeId,
        tierId: Number(value),
      });
      setPrice(fetchedPrice ? String(fetchedPrice) : "");
    } else {
      setPrice("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setFormLoading(true);
    setError("");
    try {
      const writing = await submitCVWriting({
        userId,
        writingTypeId,
        tierId: Number(tierId),
        country,
        visaTypeId: Number(visaTypeId),
        price: Number(price),
      });
      setWritingId(writing.id);
      setSuccess(true);
      toast.success(`${typeName} writing request submitted successfully!`, {
        description: "Please upload your payment screenshot below.",
      });
    } catch (err: any) {
      const errorMessage = err.message || "Failed to submit. Please try again.";
      setError(errorMessage);
      toast.error("Submission failed", {
        description: errorMessage,
      });
    }
    setFormLoading(false);
  };

  const handleTransaction = async () => {
    if (!userId || !writingId) return;
    setPaymentLoading(true);
    setError("");
    try {
      await submitWritingTransaction({
        writingId,
        userId,
        price: Number(price),
        file: files[0] || null,
      });
      setTransactionSuccess(true);
      toast.success("Payment uploaded successfully!", {
        description: "Your request is now complete and under review.",
      });
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to upload payment. Please try again.";
      setError(errorMessage);
      toast.error("Payment upload failed", {
        description: errorMessage,
      });
    }
    setPaymentLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white py-8">
      <div className="mb-10 flex w-full flex-col items-center justify-center gap-6 px-4 md:flex-row md:gap-8">
        <h1 className="text-center text-5xl font-bold md:text-left">
          {typeName}
        </h1>
        <div className="relative h-[200px] w-[300px] overflow-hidden rounded-md border shadow-md md:h-[250px] md:w-[350px]">
          <Image
            src={imageUrl}
            alt={`${typeName} Sample`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <Card className="mb-8 w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Submit Your {typeName} Writing Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div>
                <label className="mb-2 block font-medium">Tier</label>
                <Select
                  value={tierId}
                  onValueChange={handleTierChange}
                  disabled={!userId || !!writingId}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiers.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block font-medium">Country</label>
                <Input
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  disabled={!userId || !!writingId}
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">Visa Type</label>
                <Select
                  value={visaTypeId}
                  onValueChange={setVisaTypeId}
                  disabled={!userId || !!writingId}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    {visaTypes.map((v) => (
                      <SelectItem key={v.id} value={String(v.id)}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block font-medium">Price</label>
                <Input
                  placeholder="Price"
                  className="h-10"
                  value={price}
                  readOnly
                  required
                  type="number"
                  disabled={!userId || !!writingId}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded bg-blue-600 px-6 py-2 text-white"
                disabled={formLoading || !price || !userId || !!writingId}
              >
                {formLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>

            {!userId && (
              <div className="mt-4 text-center font-medium text-red-600">
                Please sign in to submit your {typeName} writing request.
              </div>
            )}
            {success && (
              <div className="mt-4 text-center font-medium text-green-600">
                Your {typeName} writing request has been submitted! Please
                upload your payment screenshot below.
              </div>
            )}
            {error && (
              <div className="mt-4 text-center font-medium text-red-600">
                {error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8 w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <Card className="mb-4 flex h-[220px] w-[220px] items-center justify-center">
                {qrLoading ? (
                  <span className="text-gray-400">Loading QR...</span>
                ) : qrUrl ? (
                  <Image
                    src={qrUrl}
                    alt="Payment QR Code"
                    width={200}
                    height={200}
                    className="rounded object-contain"
                  />
                ) : (
                  <span className="text-gray-400">QR code not available</span>
                )}
              </Card>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-gray-700">
                  Amount to Pay
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  NPR {price || "---"}
                </div>
              </div>
            </div>
            <div>
              <label className="mb-2 block font-medium">
                Upload Payment Screenshot
              </label>
              <FileUpload
                value={files}
                onValueChange={setFiles}
                accept="image/*"
                maxFiles={1}
                required
              >
                <FileUploadDropzone className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-6">
                  <span className="text-gray-500">
                    Drag and drop your screenshot here, or click to select
                  </span>
                </FileUploadDropzone>
                <FileUploadList className="mt-2">
                  {files.map((file) => (
                    <FileUploadItem key={file.name} value={file}>
                      <FileUploadItemPreview />
                      <FileUploadItemMetadata />
                      <FileUploadItemDelete />
                    </FileUploadItem>
                  ))}
                </FileUploadList>
              </FileUpload>
              <Button
                className="mt-4 rounded bg-green-600 px-6 py-2 text-white"
                onClick={handleTransaction}
                disabled={paymentLoading || files.length === 0 || !writingId}
              >
                {paymentLoading ? "Uploading..." : "Submit Payment"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {transactionSuccess && (
        <div className="mt-8 text-center font-medium text-green-600">
          Payment uploaded successfully! Your request is complete.
        </div>
      )}
    </div>
  );
}
