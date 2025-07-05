"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  ImageIcon,
  Loader2,
  QrCode,
  Upload,
} from "lucide-react";

import { uploadToCloudinary } from "@/actions/cloudinary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";

interface PaymentStepProps {
  reservationId: string | null;
  planId: string | null;
  price: string | null;
}

export default function PaymentStep({
  reservationId,
  planId,
  price,
}: PaymentStepProps) {
  const trpc = useTRPC();
  const router = useRouter();

  const { data, isLoading, error } = useQuery(
    trpc.publics.getPaymentQr.queryOptions()
  );
  const qrUrl = data?.url;

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const createTransaction = useMutation(
    trpc.pricings.createTransaction.mutationOptions()
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const result = await uploadToCloudinary(formData, "payment-proof");
      setUploading(false);
      if ("error" in result) {
        setImageUrl(null);
      } else {
        setImageUrl(result.url);
      }
    } else {
      setImageUrl(null);
    }
  };

  const handleSubmit = async () => {
    if (!reservationId || !price || !imageUrl) {
      alert("Missing required info");
      return;
    }
    setSubmitError(null);
    try {
      await createTransaction.mutateAsync({
        reservationId,
        amount: price,
        imageUrl,
        paymentMethod,
      });
      setSuccess(true);
    } catch (err: any) {
      setSubmitError(
        err?.message || "Failed to submit payment proof. Please try again."
      );
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  if (success) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
            <CheckCircle className="h-10 w-10" />
          </div>
          <div>
            <h2 className="mb-2 text-3xl font-bold text-green-700">
              Payment Submitted!
            </h2>
            <p className="mb-4 text-gray-700">
              Your payment proof has been successfully submitted.
            </p>
            <Badge className="bg-green-100 text-green-700">
              Redirecting to homepage...
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Complete Your Payment
        </h2>
        <p className="text-gray-600">
          Scan the QR code below and upload your payment proof
        </p>
      </div>

      {/* Payment Amount */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Amount to Pay
              </span>
            </div>
            <div className="text-4xl font-bold text-blue-900">NPR {price}</div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Section */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <QrCode className="h-5 w-5" />
            Payment QR Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-green-500" />
              <p className="text-gray-600">Loading payment QR code...</p>
            </div>
          ) : error ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load QR code. Please refresh the page and try again.
              </AlertDescription>
            </Alert>
          ) : qrUrl ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-lg border-2 border-green-200 bg-white p-4 shadow-sm">
                <img
                  src={qrUrl || "/placeholder.svg"}
                  alt="Payment QR Code"
                  className="h-64 w-64 object-contain"
                />
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                Scan with your banking app
              </Badge>
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                QR code is not available at the moment.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Upload Payment Proof */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Upload className="h-5 w-5" />
            Upload Payment Proof
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select payment screenshot or receipt
            </label>
            <div className="flex w-full items-center justify-center">
              <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-purple-300 bg-white transition-colors hover:bg-purple-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploading ? (
                    <>
                      <Loader2 className="mb-2 h-8 w-8 animate-spin text-purple-500" />
                      <p className="text-sm text-purple-600">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mb-2 h-8 w-8 text-purple-500" />
                      <p className="mb-2 text-sm text-purple-600">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or JPEG (MAX. 10MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {imageUrl && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Preview
              </label>
              <div className="flex justify-center">
                <div className="rounded-lg border-2 border-purple-200 bg-white p-2">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Payment proof preview"
                    className="h-40 w-40 rounded object-contain"
                  />
                </div>
              </div>
              <div className="text-center">
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Image uploaded successfully
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <div className="space-y-4 text-center">
            {submitError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {submitError}
                </AlertDescription>
              </Alert>
            )}

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 px-12 font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-violet-700 hover:shadow-xl sm:w-auto"
              onClick={handleSubmit}
              disabled={
                !imageUrl ||
                !reservationId ||
                !price ||
                createTransaction.status === "pending" ||
                uploading
              }
            >
              {createTransaction.status === "pending" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Payment Proof
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500">
              Your booking will be confirmed once payment is verified
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
