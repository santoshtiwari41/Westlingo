"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { CloudUploadIcon, TrashIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { uploadToCloudinary } from "@/actions/cloudinary";
import TipTap from "@/components/tiptap";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/trpc/client";

import {
  type EditCourseFormSchema,
  UpdateCourseFormSchema,
  editCourseFormSchema,
} from "../../schema";
import { CourseGetOne } from "../../types";

interface CourseFormProps {
  initialValues: CourseGetOne;
}

export default function EditCourse({ courseId }: { courseId: string }) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.courses.getOne.queryOptions({ id: courseId })
  );

  if (!data) {
    return (
      <Alert>
        <AlertTitle>NO DATA</AlertTitle>
      </Alert>
    );
  }
  return <EditCourseForm initialValues={data} />;
}

const EditCourseForm = ({ initialValues }: CourseFormProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);

  const updateCourse = useMutation(
    trpc.courses.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.courses.getMany.queryOptions()
        );
        await queryClient.invalidateQueries(
          trpc.courses.getOne.queryOptions({ id: initialValues.id })
        );
        router.push(`/admin/courses/${initialValues.id}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<EditCourseFormSchema>({
    resolver: zodResolver(editCourseFormSchema),
    defaultValues: {
      id: initialValues.id,
      title: initialValues.title,
      description: initialValues.description,
      content: initialValues.content,
      isActive: !!initialValues.isActive,
      files: [],
    },
  });

  const isPending = uploading || updateCourse.isPending;

  const handleRemoveCurrentImage = () => {
    setImageRemoved(true);
    toast.success("Please upload new thumbnail!");
  };

  const onSubmit = async (values: EditCourseFormSchema) => {
    let uploadResult = null;
    const hasExistingImage = initialValues.url && !imageRemoved;

    // Only upload if there are new files selected AND no existing image (or existing image removed)
    if (values.files && values.files.length > 0 && !hasExistingImage) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", values.files[0]);

      uploadResult = await uploadToCloudinary(formData, "course");

      setUploading(false);
      if ("error" in uploadResult) {
        toast.error("Error while uploading!");
        return;
      }
    }
    const updateData: UpdateCourseFormSchema = {
      id: initialValues.id,
      title: values.title,
      description: values.description,
      content: values.content,
      isActive: values.isActive,
    };

    if (!hasExistingImage) {
      if (uploadResult) {
        updateData.url = uploadResult.url;
        updateData.appId = uploadResult.appId;
        updateData.config = uploadResult.config;
      } else if (imageRemoved) {
        updateData.url = "";
        updateData.appId = "";
        updateData.config = {};
      }
    }
    updateCourse.mutate(updateData);
  };

  const showImageUpload = !initialValues.url || imageRemoved;
  const showCurrentImage = initialValues.url && !imageRemoved;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g CourseIC AI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Current Image Display with Remove Option */}
        {showCurrentImage && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FormLabel>Thumbnail</FormLabel>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemoveCurrentImage}
              >
                <TrashIcon className="mr-2 size-4" />
                Remove
              </Button>
            </div>
            {initialValues.url && (
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
                <Image
                  src={initialValues.url}
                  alt={initialValues.title}
                  fill
                  className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </AspectRatio>
            )}
          </div>
        )}

        {/* File Upload Field - Only show when no initial image or image was removed */}
        {showImageUpload && (
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {imageRemoved
                    ? "Upload New Image (Optional)"
                    : "Upload Image"}
                </FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onValueChange={field.onChange}
                    accept="image/*"
                    maxFiles={1}
                    maxSize={5 * 1024 * 1024}
                    onFileReject={(_, message) => {
                      form.setError("files", {
                        message,
                      });
                    }}
                    multiple
                  >
                    <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                      <CloudUploadIcon className="size-4" />
                      Drag and drop or
                      <FileUploadTrigger asChild>
                        <Button variant="link" size="sm" className="p-0">
                          choose files
                        </Button>
                      </FileUploadTrigger>
                      to upload
                    </FileUploadDropzone>
                    <FileUploadList>
                      {field?.value &&
                        field?.value.map((file, index) => (
                          <FileUploadItem key={index} value={file}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                              >
                                <XIcon />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        ))}
                    </FileUploadList>
                  </FileUpload>
                </FormControl>
                <FormDescription>
                  Upload up to 1 image up to 5MB each.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TipTap
                  content={field.value ?? ""}
                  onChange={field.onChange}
                  editable
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>ACTIVE</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-x-2">
          <Button
            variant="ghost"
            disabled={isPending}
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};
