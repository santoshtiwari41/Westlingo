"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  GraduationCap,
  Loader2,
  MoreHorizontal,
  Plus,
  Save,
  Target,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/trpc/client";

import { GetStudent } from "../types";

interface StudentAcademicsProps {
  studentId: string;
  data: GetStudent;
}

export default function StudentAcademics({
  studentId,
  data,
}: StudentAcademicsProps) {
  const [editingEducation, setEditingEducation] = useState<string | null>(null);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    year: "",
    gpa: "",
    description: "",
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const updateEducationMutation = useMutation(
    trpc.students.updateEducation.mutationOptions({
      onSuccess: () => {
        toast.success("Education record updated successfully");
        setEditingEducation(null);
        queryClient.invalidateQueries(
          trpc.students.getOne.queryOptions({ id: studentId })
        );
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update education record");
      },
    })
  );

  const deleteEducationMutation = useMutation(
    trpc.students.deleteEducation.mutationOptions({
      onSuccess: () => {
        toast.success("Education record deleted successfully");
        queryClient.invalidateQueries(
          trpc.students.getOne.queryOptions({ id: studentId })
        );
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete education record");
      },
    })
  );

  const addEducationMutation = useMutation(
    trpc.students.addEducation.mutationOptions({
      onSuccess: () => {
        toast.success("Education record added successfully");
        setIsAddingEducation(false);
        setEducationForm({
          degree: "",
          institution: "",
          year: "",
          gpa: "",
          description: "",
        });
        queryClient.invalidateQueries(
          trpc.students.getOne.queryOptions({ id: studentId })
        );
      },
      onError: (error) => {
        toast.error(error.message || "Failed to add education record");
      },
    })
  );

  const handleEditEducation = (education: any) => {
    setEditingEducation(education.id);
    setEducationForm({
      degree: education.degree || "",
      institution: education.institution || "",
      year: education.year || "",
      gpa: education.gpa || "",
      description: education.description || "",
    });
  };

  const handleSaveEducation = async () => {
    if (editingEducation) {
      await updateEducationMutation.mutateAsync({
        educationId: editingEducation,
        ...educationForm,
      });
    }
  };

  const handleAddEducation = async () => {
    if (
      !educationForm.degree ||
      !educationForm.institution ||
      !educationForm.year
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    await addEducationMutation.mutateAsync({
      studentId,
      ...educationForm,
    });
  };

  const handleDeleteEducation = async (educationId: string) => {
    if (confirm("Are you sure you want to delete this education record?")) {
      await deleteEducationMutation.mutateAsync({ educationId });
    }
  };

  const handleCancelEdit = () => {
    setEditingEducation(null);
    setEducationForm({
      degree: "",
      institution: "",
      year: "",
      gpa: "",
      description: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Academic Information</h2>
          <p className="text-gray-600">
            View and manage student's educational background
          </p>
        </div>
        <Dialog open={isAddingEducation} onOpenChange={setIsAddingEducation}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Education Record</DialogTitle>
              <DialogDescription>
                Add a new education record for this student.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="degree">Degree *</Label>
                <Input
                  id="degree"
                  value={educationForm.degree}
                  onChange={(e) =>
                    setEducationForm({
                      ...educationForm,
                      degree: e.target.value,
                    })
                  }
                  placeholder="e.g., Bachelor of Science"
                />
              </div>
              <div>
                <Label htmlFor="institution">Institution *</Label>
                <Input
                  id="institution"
                  value={educationForm.institution}
                  onChange={(e) =>
                    setEducationForm({
                      ...educationForm,
                      institution: e.target.value,
                    })
                  }
                  placeholder="e.g., University of Example"
                />
              </div>
              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  value={educationForm.year}
                  onChange={(e) =>
                    setEducationForm({ ...educationForm, year: e.target.value })
                  }
                  placeholder="e.g., 2023"
                />
              </div>
              <div>
                <Label htmlFor="gpa">GPA</Label>
                <Input
                  id="gpa"
                  value={educationForm.gpa}
                  onChange={(e) =>
                    setEducationForm({ ...educationForm, gpa: e.target.value })
                  }
                  placeholder="e.g., 3.8"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={educationForm.description}
                  onChange={(e) =>
                    setEducationForm({
                      ...educationForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Additional details about this education"
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleAddEducation}
                  disabled={addEducationMutation.isPending}
                  className="flex-1"
                >
                  {addEducationMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  {addEducationMutation.isPending ? "Adding..." : "Add Record"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingEducation(false)}
                  disabled={addEducationMutation.isPending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Education History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.education && data.education.length > 0 ? (
            <div className="space-y-4">
              {data.education.map((education) => (
                <div key={education.id} className="rounded-lg border p-4">
                  {editingEducation === education.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor={`degree-${education.id}`}>
                            Degree
                          </Label>
                          <Input
                            id={`degree-${education.id}`}
                            value={educationForm.degree}
                            onChange={(e) =>
                              setEducationForm({
                                ...educationForm,
                                degree: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`institution-${education.id}`}>
                            Institution
                          </Label>
                          <Input
                            id={`institution-${education.id}`}
                            value={educationForm.institution}
                            onChange={(e) =>
                              setEducationForm({
                                ...educationForm,
                                institution: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`year-${education.id}`}>Year</Label>
                          <Input
                            id={`year-${education.id}`}
                            value={educationForm.year}
                            onChange={(e) =>
                              setEducationForm({
                                ...educationForm,
                                year: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`gpa-${education.id}`}>GPA</Label>
                          <Input
                            id={`gpa-${education.id}`}
                            value={educationForm.gpa}
                            onChange={(e) =>
                              setEducationForm({
                                ...educationForm,
                                gpa: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor={`description-${education.id}`}>
                          Description
                        </Label>
                        <Textarea
                          id={`description-${education.id}`}
                          value={educationForm.description}
                          onChange={(e) =>
                            setEducationForm({
                              ...educationForm,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleSaveEducation}
                          disabled={updateEducationMutation.isPending}
                          size="sm"
                        >
                          {updateEducationMutation.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="mr-2 h-4 w-4" />
                          )}
                          {updateEducationMutation.isPending
                            ? "Saving..."
                            : "Save"}
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          size="sm"
                          disabled={updateEducationMutation.isPending}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">
                            {education.degree}
                          </h3>
                          <Badge variant="outline">
                            GPA: {education.gpa || "N/A"}
                          </Badge>
                        </div>
                        <p className="font-medium text-gray-600">
                          {education.institution}
                        </p>
                        <p className="mb-2 text-sm text-gray-500">
                          Graduated: {education.year}
                        </p>
                        {education.description && (
                          <p className="text-sm text-gray-700">
                            {education.description}
                          </p>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditEducation(education)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteEducation(education.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <GraduationCap className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="text-gray-500">No education records found</p>
              <p className="text-sm text-gray-400">
                Add education information to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
