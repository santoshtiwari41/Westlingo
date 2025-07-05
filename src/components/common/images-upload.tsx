"use client";

import React, { useState } from "react";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { type FileWithPreview, useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import {
  removeCarouselImage,
  uploadCarouselImage,
} from "@/modules/admin/common/carousels/actions";
import { GetCarousel } from "@/modules/admin/common/carousels/types";

export interface CloudinaryImageResponse {
  public_id: string;
  secure_url: string;
  url: string;
}

interface ImagesUploadProps {
  images: GetCarousel["items"][number][];
  carouselId: string;
}

export default function ImagesUpload({
  images,
  carouselId,
}: ImagesUploadProps) {
  const [isPending, setIsPending] = useState(false);

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 6;

  const handleFilesAdded = async (addedFiles: FileWithPreview[]) => {
    setIsPending(true);
    for (const fileWithPreview of addedFiles) {
      if (fileWithPreview.file instanceof File) {
        try {
          const formData = new FormData();
          formData.append("file", fileWithPreview.file);
          formData.append("carouselId", carouselId);

          const result = await uploadCarouselImage(formData);
          if (result.success) {
            toast.success("Uploaded!");
          }
        } catch (error) {
          toast.error("Error while uploading!");
          console.error("Error uploading to Cloudinary:", error);
        } finally {
          setIsPending(false);
        }
      }
    }
  };

  const handleFileRemoved = async (removedFile: FileWithPreview) => {
    setIsPending(true);
    if (removedFile.file instanceof File) {
      try {
        const result = await removeCarouselImage(removedFile);
        removeFile(removedFile.id);
        if (result.success) {
          toast.success("Removed!");
        }
      } catch (error) {
        toast.error("Error while removing!");
        console.error("Error deleting from Cloudinary:", error);
      } finally {
        setIsPending(false);
      }
    }
  };

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
    initialFiles: images,
    onFilesAdded: handleFilesAdded, // Add this
    onFileRemoved: handleFileRemoved, // Add this
  });

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">
                Uploaded Files ({files.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                disabled={files.length >= maxFiles || isPending}
              >
                <UploadIcon
                  className="-ms-0.5 size-3.5 opacity-60"
                  aria-hidden="true"
                />
                Add more
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="bg-accent relative aspect-square rounded-md"
                >
                  <img
                    src={file.preview || "/placeholder.svg"}
                    alt={file.file.name}
                    className={cn(
                      "size-full rounded-[inherit] object-cover transition-opacity duration-300",
                      isPending && "opacity-50"
                    )}
                  />

                  <Button
                    onClick={() => handleFileRemoved(file)}
                    size="icon"
                    className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                    aria-label="Remove image"
                    disabled={isPending}
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
            <p className="text-muted-foreground text-xs">
              SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
            </p>
            <Button variant="outline" className="mt-4" onClick={openFileDialog}>
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              Select images
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-center text-xs"
      >
        Multiple image uploader w/ image grid ∙{" "}
        <a
          href="https://github.com/origin-space/originui/tree/main/docs/use-file-upload.md"
          className="hover:text-foreground underline"
        >
          API
        </a>
      </p>
    </div>
  );
}
