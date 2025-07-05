"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Edit, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

import { type PersonalInfoSchema, personalInfoSchema } from "../schema";
import { type GetProfile } from "../types";

interface PersonalInfoTabProps {
  initialValues: GetProfile["profile"];
}

export function PersonalInfoTab({ initialValues }: PersonalInfoTabProps) {
  const [editMode, setEditMode] = useState(false);

  function toggleEdit() {
    setEditMode((prev) => !prev);
  }

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <CardTitle>Personal Information</CardTitle>
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
          <PersonalInformationForm
            initialValues={initialValues}
            onSubmit={toggleEdit}
          />
        ) : (
          <PreviewPersonalInformation initialValues={initialValues} />
        )}
      </CardContent>
    </Card>
  );
}

function PreviewPersonalInformation({
  initialValues,
}: {
  initialValues: GetProfile["profile"];
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label className="text-muted-foreground text-sm font-medium">
            First Name
          </Label>
          <p className="text-lg">{initialValues?.firstName}</p>
        </div>
        <div>
          <Label className="text-muted-foreground text-sm font-medium">
            Middle Name
          </Label>
          <p className="text-lg">{initialValues?.middleName}</p>
        </div>
        <div>
          <Label className="text-muted-foreground text-sm font-medium">
            Last Name
          </Label>
          <p className="text-lg">{initialValues?.lastName}</p>
        </div>
      </div>
      <div>
        <Label className="text-muted-foreground text-sm font-medium">
          Phone Number
        </Label>
        <p className="text-lg">{initialValues?.phoneNumber}</p>
      </div>
      <div>
        <Label className="text-muted-foreground text-sm font-medium">
          Date of Birth
        </Label>
        <p className="text-lg">{initialValues?.dob}</p>
      </div>
    </div>
  );
}

function PersonalInformationForm({
  initialValues,
  onSubmit,
}: {
  initialValues: GetProfile["profile"];
  onSubmit: () => void;
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: initialValues?.firstName ?? "",
      middleName: initialValues?.middleName ?? "",
      lastName: initialValues?.lastName ?? "",
      phoneNumber: initialValues?.phoneNumber ?? "",
      dob: initialValues?.dob ? new Date(initialValues?.dob) : undefined,
    },
  });

  const updateProfile = useMutation(
    trpc.users.createPersonalInfo.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.users.getProfile.queryOptions()
        );
        onSubmit();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const isPending = updateProfile.isPending;
  const handleSubmit = (values: PersonalInfoSchema) => {
    updateProfile.mutate({
      ...values,
      dob: values.dob ? values.dob.toISOString() : "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Middle Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
