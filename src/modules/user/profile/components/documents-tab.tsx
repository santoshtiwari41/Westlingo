"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DownloadIcon,
  Edit,
  EyeIcon,
  Loader2Icon,
  Trash2,
  UploadIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { uploadToCloudinary } from "@/actions/cloudinary";
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
import { useTRPC } from "@/trpc/client";

import type { GetProfile } from "../types";

interface DocumentsTabProps {
  initialValues: GetProfile["documents"];
}

export function DocumentsTab({ initialValues }: DocumentsTabProps) {
  const [editMode, setEditMode] = useState(false);
  const toggleEdit = () => setEditMode((prev) => !prev);

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <CardTitle>Documents Information</CardTitle>
        <CardDescription />
        <CardAction>
          <Button
            variant={editMode ? "outline" : "default"}
            size="sm"
            onClick={toggleEdit}
          >
            {editMode ? (
              <X className="mr-2 h-4 w-4" />
            ) : (
              <Edit className="mr-2 h-4 w-4" />
            )}
            {editMode ? "Cancel" : "Edit"}
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        {editMode ? (
          <DocumentForm initialValues={initialValues} onSubmit={toggleEdit} />
        ) : (
          <PreviewDocument initialValues={initialValues} />
        )}
      </CardContent>
    </Card>
  );
}

function PreviewDocument({
  initialValues,
}: {
  initialValues: GetProfile["documents"];
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation(
    trpc.users.removeDocumentInfo.mutationOptions({
      onSuccess: () =>
        queryClient.invalidateQueries(trpc.users.getProfile.queryOptions()),
      onError: (error) => toast.error(error.message),
    })
  );

  // const isImage = (url: string) => {
  //   return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  // };
  function bytesToKB(bytes: number): string {
    return (bytes / 1024).toFixed(1) + " KB";
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {initialValues.map((doc) => (
        <Card key={doc.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {doc.type}
              <Badge variant="outline"> {doc.name}</Badge>
            </CardTitle>
            <CardDescription>{bytesToKB(Number(doc.size))}</CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  <EyeIcon className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href={doc.url} download>
                  <DownloadIcon className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="flex items-center gap-1 hover:bg-red-600 hover:text-white"
              onClick={() => mutate({ id: doc.id })}
              disabled={isPending}
              title="Delete document"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function DocumentForm({
  initialValues,
  onSubmit,
}: {
  initialValues: GetProfile["documents"];
  onSubmit: () => void;
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [uploadingType, setUploadingType] = useState<string | null>(null);

  const { mutate } = useMutation(
    trpc.users.createDocumentInfo.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.users.getProfile.queryOptions()
        );
        onSubmit();
      },
      onError: (error) => {
        toast.error(error.message);
        setUploadingType(null);
      },
    })
  );

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploadingType(type);

    try {
      const result = await uploadToCloudinary(formData);

      if ("error" in result) {
        toast.error(result.error);
        setUploadingType(null);
        return;
      }
      mutate({
        name: result.name,
        type: type,
        size: result.size,
        appId: result.appId,
        url: result.url,
      });
    } catch {
      toast.error("Upload failed");
      setUploadingType(null);
    }
  };

  const docTypes = [
    "Citizenship",
    "Driving License",
    "Passport",
    "ID Card",
    "Birth Certificate",
    "Other",
  ];

  const uploadedTypes = initialValues.map((doc) => doc.type);
  const remainingTypes = docTypes.filter(
    (type) => !uploadedTypes.includes(type)
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {remainingTypes.map((docType) => {
        const isUploading = uploadingType === docType;

        return (
          <div
            key={docType}
            className="relative rounded-lg border-2 border-dashed border-gray-300 p-4 text-center"
          >
            {isUploading && (
              <div className="bg-opacity-70 absolute inset-0 z-10 flex items-center justify-center bg-white">
                <Loader2Icon className="h-10 w-10 animate-spin text-gray-600" />
              </div>
            )}

            <UploadIcon className="mx-auto mb-2 h-8 w-8 text-gray-400" />
            <p className="mb-2 text-sm font-medium">{docType}</p>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="hidden"
              id={`upload-${docType}`}
              onChange={(e) => handleFileUpload(e, docType)}
              disabled={isUploading}
            />

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                document.getElementById(`upload-${docType}`)?.click()
              }
              disabled={isUploading}
            >
              Upload File
            </Button>

            <p className="text-muted-foreground mt-1 text-xs">Max 10MB</p>
          </div>
        );
      })}
    </div>
  );
}
