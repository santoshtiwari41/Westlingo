"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { uploadToCloudinary } from "@/actions/cloudinary";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useTRPC } from "@/trpc/client";

import { testimonialsInsertSchema } from "../schema";

const NewTestimonialForm = ({
  onSuccess,
  initialValues,
}: {
  onSuccess?: () => void;
  initialValues?: any;
}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const isEdit = !!initialValues?.id;

  const create = useMutation(
    trpc.testimonials.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.testimonials.getMany.queryOptions()
        );
        toast.success("Testimonial created!");
        router.refresh();
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const update = useMutation(
    trpc.testimonials.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.testimonials.getMany.queryOptions()
        );
        toast.success("Testimonial updated!");
        router.refresh();
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof testimonialsInsertSchema>>({
    resolver: zodResolver(testimonialsInsertSchema),
    defaultValues: initialValues || {
      name: "",
      image: "",
      quote: "",
      isActive: true,
      bio: "",
    },
  });

  const isPending = create.isPending || update.isPending;

  const [uploading, setUploading] = useState(false);

  const onSubmit = (values: z.infer<typeof testimonialsInsertSchema>) => {
    if (isEdit) {
      update.mutate({ ...values, id: initialValues.id });
    } else {
      create.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Student name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploading(true);
                        const formData = new FormData();
                        formData.append("file", file);
                        const result = await uploadToCloudinary(
                          formData,
                          "testimonial"
                        );
                        setUploading(false);
                        if (typeof result === "object" && "url" in result) {
                          field.onChange(result.url);
                        } else {
                          toast.error("Image upload failed");
                        }
                      }
                    }}
                  />
                  {uploading && (
                    <div className="mt-2 text-xs text-zinc-500">
                      Uploading...
                    </div>
                  )}
                  {field.value && (
                    <img
                      src={field.value}
                      alt="Preview"
                      className="mt-2 h-20 w-20 rounded-full border object-cover"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Bio <span className="text-gray-400">(e.g. IELTS aspirant)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Bio or short description"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quote</FormLabel>
              <FormControl>
                <Input
                  placeholder="Testimonial text"
                  {...field}
                  value={field.value ?? ""}
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
        <div className="flex justify-end gap-x-2">
          <Button disabled={isPending} type="submit">
            {isEdit ? "Save" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewTestimonialForm;
