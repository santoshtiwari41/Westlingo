import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Download as DownloadIcon,
  Eye as EyeIcon,
  Loader2,
  Trash2,
  Upload as UploadIcon,
} from "lucide-react";
import { toast } from "sonner";

import { uploadToCloudinary } from "@/actions/cloudinary";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";

interface DocumentItem {
  id?: string;
  name: string;
  type: string;
  url: string;
  size?: string;
  appId?: string;
}

interface OnboardingDocumentsStepProps {
  initialValues: DocumentItem[];
  onContinue: (values: DocumentItem[]) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

const docTypes = [
  "Citizenship",
  "Driving License",
  "Passport",
  "ID Card",
  "Birth Certificate",
  "Other",
];

export default function OnboardingDocumentsStep({
  initialValues,
  onContinue,
  onBack,
  isLoading,
}: OnboardingDocumentsStepProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [uploadingType, setUploadingType] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<DocumentItem[]>(
    initialValues || []
  );

  const createDocMutation = useMutation(
    trpc.users.createDocumentInfo.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.users.getProfile.queryOptions()
        );
      },
      onError: (error) => {
        toast.error(error.message);
        setUploadingType(null);
      },
    })
  );

  const removeDocMutation = useMutation(
    trpc.users.removeDocumentInfo.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.users.getProfile.queryOptions()
        );
      },
      onError: (error) => {
        toast.error(error.message);
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
      createDocMutation.mutate(
        {
          name: result.name,
          type: type,
          size: result.size,
          appId: result.appId,
          url: result.url,
        },
        {
          onSuccess: (data: any) => {
            setUploadedDocs((prev) => [...prev, { ...result, type }]);
            setUploadingType(null);
          },
          onError: () => setUploadingType(null),
        }
      );
    } catch {
      toast.error("Upload failed");
      setUploadingType(null);
    }
  };

  const handleRemove = (doc: DocumentItem) => {
    if (!doc.id) return;
    removeDocMutation.mutate(
      { id: doc.id },
      {
        onSuccess: () => {
          setUploadedDocs((prev) => prev.filter((d) => d.id !== doc.id));
        },
      }
    );
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(uploadedDocs);
  };

  const uploadedTypes = uploadedDocs.map((doc) => doc.type);
  const remainingTypes = docTypes.filter(
    (type) => !uploadedTypes.includes(type)
  );

  return (
    <form onSubmit={handleContinue} className="space-y-4">
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
                  <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
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
                type="button"
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
        {uploadedDocs.map((doc) => (
          <div
            key={doc.id || doc.name}
            className="relative flex flex-col items-center rounded-lg border p-4 text-center"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="font-medium text-purple-600">{doc.type}</span>
              <span className="text-xs text-gray-500">{doc.name}</span>
            </div>
            <div className="mb-2 flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  <EyeIcon className="h-4 w-4 text-purple-600" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href={doc.url} download>
                  <DownloadIcon className="h-4 w-4 text-purple-600" />
                </a>
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemove(doc)}
                disabled={removeDocMutation.isPending}
                title="Delete document"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-xs text-gray-400">
              {doc.size ? `${(Number(doc.size) / 1024).toFixed(1)} KB` : ""}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        {onBack ? (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Continue
        </Button>
      </div>
    </form>
  );
}
