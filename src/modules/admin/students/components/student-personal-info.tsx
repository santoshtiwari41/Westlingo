"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  CreditCard,
  Download,
  Edit,
  Eye,
  FileText,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/trpc/client";

import { GetStudent } from "../types";

interface StudentPersonalInfoProps {
  data: GetStudent;
}

export default function StudentPersonalInfo({
  data,
}: StudentPersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: data.profile?.firstName || "",
    middleName: data.profile?.middleName || "",
    lastName: data.profile?.lastName || "",
    phoneNumber: data.profile?.phoneNumber || "",
    dob: data.profile?.dob
      ? new Date(data.profile.dob).toISOString().split("T")[0]
      : "",
    permanentAddress:
      typeof data.profile?.permanentAddress === "string"
        ? data.profile.permanentAddress
        : "",
    temporaryAddress:
      typeof data.profile?.temporaryAddress === "string"
        ? data.profile.temporaryAddress
        : "",
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation(
    trpc.students.updateProfile.mutationOptions({
      onSuccess: () => {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        queryClient.invalidateQueries(
          trpc.students.getOne.queryOptions({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update profile");
      },
    })
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfileMutation.mutateAsync({
        studentId: data.id,
        ...formData,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: data.profile?.firstName || "",
      middleName: data.profile?.middleName || "",
      lastName: data.profile?.lastName || "",
      phoneNumber: data.profile?.phoneNumber || "",
      dob: data.profile?.dob
        ? new Date(data.profile.dob).toISOString().split("T")[0]
        : "",
      permanentAddress:
        typeof data.profile?.permanentAddress === "string"
          ? data.profile.permanentAddress
          : "",
      temporaryAddress:
        typeof data.profile?.temporaryAddress === "string"
          ? data.profile.temporaryAddress
          : "",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <p className="text-gray-600">Manage student's personal details</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} size="sm" disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                disabled={isSaving}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="First name"
                />
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) =>
                    setFormData({ ...formData, middleName: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Middle name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={data.email}
                disabled
                className="bg-gray-50"
              />
              <p className="mt-1 text-xs text-gray-500">
                Email cannot be changed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Address Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="permanentAddress">Permanent Address</Label>
              <Textarea
                id="permanentAddress"
                value={formData.permanentAddress}
                onChange={(e) =>
                  setFormData({ ...formData, permanentAddress: e.target.value })
                }
                disabled={!isEditing}
                placeholder="Enter permanent address"
                rows={3}
              />
            </div>

            <Separator />

            <div>
              <Label htmlFor="temporaryAddress">Temporary Address</Label>
              <Textarea
                id="temporaryAddress"
                value={formData.temporaryAddress}
                onChange={(e) =>
                  setFormData({ ...formData, temporaryAddress: e.target.value })
                }
                disabled={!isEditing}
                placeholder="Enter temporary address (if different from permanent)"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Render all uploaded documents from documents table */}
      {data.documents && data.documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {data.documents.map((doc) => (
                <Card key={doc.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {doc.type}
                      <Badge variant="outline">{doc.name}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {(Number(doc.size) / 1024).toFixed(1)} KB
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={doc.url} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
