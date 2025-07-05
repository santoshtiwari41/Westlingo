"use client";

import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserProfile } from "@/hooks/queries/useUserProfile";
import { cn } from "@/lib/utils";

interface ProfileTabProps {
  userName: string;
  userEmail: string;
}

export default function ProfileTab({ userName, userEmail }: ProfileTabProps) {
  const { profile, isLoading, updateProfile, isUpdatingProfile } =
    useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [fields, setFields] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    permanentAddress: "",
    temporaryAddress: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (profile?.profile) {
      setFields({
        firstName: profile.profile.firstName || "",
        middleName: profile.profile.middleName || "",
        lastName: profile.profile.lastName || "",
        phoneNumber: profile.profile.phoneNumber || "",
        dob: profile.profile.dob
          ? format(new Date(profile.profile.dob), "yyyy-MM-dd")
          : "",
        permanentAddress:
          typeof profile.profile.permanentAddress === "string"
            ? profile.profile.permanentAddress
            : "",
        temporaryAddress:
          typeof profile.profile.temporaryAddress === "string"
            ? profile.profile.temporaryAddress
            : "",
      });
    }
  }, [profile]);

  function handleEdit() {
    setIsEditing(true);
    setErrors({});
  }

  function handleCancel() {
    setIsEditing(false);
    setErrors({});
    if (profile?.profile) {
      setFields({
        firstName: profile.profile.firstName || "",
        middleName: profile.profile.middleName || "",
        lastName: profile.profile.lastName || "",
        phoneNumber: profile.profile.phoneNumber || "",
        dob: profile.profile.dob
          ? format(new Date(profile.profile.dob), "yyyy-MM-dd")
          : "",
        permanentAddress:
          typeof profile.profile.permanentAddress === "string"
            ? profile.profile.permanentAddress
            : "",
        temporaryAddress:
          typeof profile.profile.temporaryAddress === "string"
            ? profile.profile.temporaryAddress
            : "",
      });
    }
  }

  function validateFields() {
    const newErrors: Record<string, string> = {};

    if (!fields.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!fields.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!fields.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(fields.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!fields.dob) {
      newErrors.dob = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave() {
    if (!validateFields()) {
      return;
    }

    const result = await updateProfile({
      firstName: fields.firstName,
      middleName: fields.middleName,
      lastName: fields.lastName,
      phoneNumber: fields.phoneNumber,
      dob: fields.dob,
      permanentAddress: fields.permanentAddress,
      temporaryAddress: fields.temporaryAddress,
    });

    if (result.success) {
      setIsEditing(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Personal Information</h1>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="text-xs"
          >
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isUpdatingProfile}
              className="text-xs"
            >
              {isUpdatingProfile ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isUpdatingProfile}
              className="text-xs"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 font-semibold text-gray-800">
            Basic Information
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name *
              </Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  name="firstName"
                  value={fields.firstName}
                  onChange={handleChange}
                  className={cn(errors.firstName && "border-red-500")}
                  placeholder="Enter first name"
                />
              ) : (
                <div className="text-sm text-gray-900">
                  {fields.firstName || "Not provided"}
                </div>
              )}
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="middleName"
                className="text-sm font-medium text-gray-700"
              >
                Middle Name
              </Label>
              {isEditing ? (
                <Input
                  id="middleName"
                  name="middleName"
                  value={fields.middleName}
                  onChange={handleChange}
                  placeholder="Enter middle name"
                />
              ) : (
                <div className="text-sm text-gray-900">
                  {fields.middleName || "Not provided"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name *
              </Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  name="lastName"
                  value={fields.lastName}
                  onChange={handleChange}
                  className={cn(errors.lastName && "border-red-500")}
                  placeholder="Enter last name"
                />
              ) : (
                <div className="text-sm text-gray-900">
                  {fields.lastName || "Not provided"}
                </div>
              )}
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dob"
                className="text-sm font-medium text-gray-700"
              >
                Date of Birth *
              </Label>
              {isEditing ? (
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={fields.dob}
                  onChange={handleChange}
                  className={cn(errors.dob && "border-red-500")}
                />
              ) : (
                <div className="text-sm text-gray-900">
                  {fields.dob
                    ? format(new Date(fields.dob), "MMMM dd, yyyy")
                    : "Not provided"}
                </div>
              )}
              {errors.dob && (
                <p className="text-xs text-red-500">{errors.dob}</p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 font-semibold text-gray-800">
            Contact Information
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <div className="text-sm text-gray-900">{userEmail}</div>
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number *
              </Label>
              {isEditing ? (
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={fields.phoneNumber}
                  onChange={handleChange}
                  className={cn(errors.phoneNumber && "border-red-500")}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                />
              ) : (
                <div className="text-sm text-gray-900">
                  {fields.phoneNumber || "Not provided"}
                </div>
              )}
              {errors.phoneNumber && (
                <p className="text-xs text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center space-x-2 font-semibold text-gray-800">
            <MapPin className="h-4 w-4" />
            <span>Address Information</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="permanentAddress"
                className="text-sm font-medium text-gray-700"
              >
                Permanent Address
              </Label>
              {isEditing ? (
                <Textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  value={fields.permanentAddress}
                  onChange={handleChange}
                  placeholder="Enter your permanent address"
                  rows={3}
                />
              ) : (
                <div className="text-sm text-gray-900">
                  {fields.permanentAddress || "Not provided"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="temporaryAddress"
                className="text-sm font-medium text-gray-700"
              >
                Temporary Address
              </Label>
              {isEditing ? (
                <Textarea
                  id="temporaryAddress"
                  name="temporaryAddress"
                  value={fields.temporaryAddress}
                  onChange={handleChange}
                  placeholder="Enter your temporary address (if different from permanent)"
                  rows={3}
                />
              ) : (
                <div className="text-sm text-gray-900">
                  {fields.temporaryAddress || "Not provided"}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 font-semibold text-gray-800">
            Account Information
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <div className="text-sm text-gray-900">
                {fields.firstName && fields.lastName
                  ? `${fields.firstName} ${fields.middleName ? fields.middleName + " " : ""}${fields.lastName}`
                  : userName}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Member Since
              </Label>
              <div className="text-sm text-gray-900">
                {profile?.createdAt
                  ? format(new Date(profile.createdAt), "MMMM yyyy")
                  : "Not available"}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
