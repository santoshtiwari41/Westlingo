"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, PlusCircleIcon, Trash2, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/trpc/client";

import { type EducationSchema, educationSchema } from "../schema";
import { type GetProfile } from "../types";

interface EducationTabProps {
  initialValues: GetProfile["education"];
}

export function EducationTab({ initialValues }: EducationTabProps) {
  const [editMode, setEditMode] = useState(false);

  function toggleEdit() {
    setEditMode((prev) => !prev);
  }

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <CardTitle>Educational Information</CardTitle>
        <CardDescription></CardDescription>
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
          <EducationForm initialValues={initialValues} onSubmit={toggleEdit} />
        ) : (
          <PreviewEducation initialValues={initialValues} />
        )}
      </CardContent>
    </Card>
  );
}

function PreviewEducation({
  initialValues,
}: {
  initialValues: GetProfile["education"];
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const removeEducationalInfo = useMutation(
    trpc.users.removeEducationalInfo.mutationOptions({
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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {initialValues.map((edu) => (
        <Card key={edu.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {edu.degree}
              <Badge variant="outline">{edu.year}</Badge>
            </CardTitle>
            <CardDescription>{edu.institution}</CardDescription>
            <CardAction>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeEducationalInfo.mutate({ id: edu.id })}
                disabled={removeEducationalInfo.isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1">
              {edu.gpa && (
                <div>
                  <Label className="text-muted-foreground text-sm font-medium">
                    GPA
                  </Label>
                  <p>{edu.gpa}</p>
                </div>
              )}
              {edu.description && (
                <div>
                  <Label className="text-muted-foreground text-sm font-medium">
                    Description
                  </Label>
                  <p>{edu.description}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EducationForm({
  initialValues,
  onSubmit,
}: {
  initialValues: GetProfile["education"];
  onSubmit: () => void;
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: initialValues.map((edu) => ({
        ...edu,
        description: edu.description ?? undefined,
        gpa: edu.gpa ?? undefined,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const updateProfile = useMutation(
    trpc.users.createEducationalInfo.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.users.getProfile.queryOptions()
        );
        onSubmit();
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
    })
  );

  const addEducation = () => {
    append({
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: "",
      gpa: "",
      description: "",
    });
  };

  const isPending = updateProfile.isPending;
  const handleSubmit = (values: EducationSchema) => {
    updateProfile.mutate(values);
  };

  return (
    <div>
      <Button type="button" onClick={addEducation} disabled={isPending}>
        <PlusCircleIcon />
        Add
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="my-6 space-y-6"
        >
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Education {index + 1}</Badge>
                {fields.length && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    disabled={isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`education.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Degree <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.institution`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Institution <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="University Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`education.${index}.year`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Graduation Year <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="2023" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.gpa`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GPA (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="3.8" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`education.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Brief description of your studies, achievements, or relevant coursework"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          {fields.length ? (
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          ) : (
            <></>
          )}
        </form>
      </Form>
    </div>
  );
}
