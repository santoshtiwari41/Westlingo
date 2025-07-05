"use client";

import React, { useEffect, useState } from "react";

import { Edit3, Plus, Save, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserProfile } from "@/hooks/queries/useUserProfile";
import { cn } from "@/lib/utils";

interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
  description?: string;
}

export default function AcademicTab() {
  const { profile, isLoading, updateEducation, isUpdatingEducation } =
    useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>(
    []
  );
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>(
    {}
  );

  useEffect(() => {
    if (profile?.education) {
      setEducationEntries(
        profile.education.map((edu) => ({
          id: edu.id,
          degree: edu.degree || "",
          institution: edu.institution || "",
          year: edu.year || "",
          gpa: edu.gpa || "",
          description: edu.description || "",
        }))
      );
    }
  }, [profile]);

  function handleEdit() {
    setIsEditing(true);
    setErrors({});
  }

  function handleCancel() {
    setIsEditing(false);
    setErrors({});
    // Reset to original values
    if (profile?.education) {
      setEducationEntries(
        profile.education.map((edu) => ({
          id: edu.id,
          degree: edu.degree || "",
          institution: edu.institution || "",
          year: edu.year || "",
          gpa: edu.gpa || "",
          description: edu.description || "",
        }))
      );
    }
  }

  function validateEntries() {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;

    educationEntries.forEach((entry, index) => {
      const entryErrors: Record<string, string> = {};

      if (!entry.degree.trim()) {
        entryErrors.degree = "Degree is required";
        isValid = false;
      }

      if (!entry.institution.trim()) {
        entryErrors.institution = "Institution is required";
        isValid = false;
      }

      if (!entry.year.trim()) {
        entryErrors.year = "Year is required";
        isValid = false;
      } else {
        const year = parseInt(entry.year);
        if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
          entryErrors.year = "Please enter a valid year";
          isValid = false;
        }
      }

      if (entry.gpa && entry.gpa.trim()) {
        const gpa = parseFloat(entry.gpa);
        if (isNaN(gpa) || gpa < 0 || gpa > 4) {
          entryErrors.gpa = "GPA must be between 0 and 4";
          isValid = false;
        }
      }

      if (Object.keys(entryErrors).length > 0) {
        newErrors[index] = entryErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  }

  async function handleSave() {
    if (!validateEntries()) {
      return;
    }

    const result = await updateEducation({
      education: educationEntries.map((entry) => ({
        degree: entry.degree,
        institution: entry.institution,
        year: parseInt(entry.year),
        gpa: entry.gpa ? parseFloat(entry.gpa) : undefined,
        description: entry.description,
      })),
    });

    if (result.success) {
      setIsEditing(false);
    }
  }

  function addEducationEntry() {
    const newEntry: EducationEntry = {
      id: `temp-${Date.now()}`,
      degree: "",
      institution: "",
      year: "",
      gpa: "",
      description: "",
    };
    setEducationEntries((prev) => [...prev, newEntry]);
  }

  function removeEducationEntry(index: number) {
    setEducationEntries((prev) => prev.filter((_, i) => i !== index));
    // Clear errors for this entry
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  }

  function updateEducationEntry(
    index: number,
    field: keyof EducationEntry,
    value: string
  ) {
    setEducationEntries((prev) =>
      prev.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      )
    );

    if (errors[index]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [field]: "",
        },
      }));
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-gray-500">
          Loading academic information...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-32px)] flex-col gap-4 rounded-xl border border-gray-300 bg-white px-3 pt-2 pb-8 sm:px-8">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pt-4 pb-1">
        <h1 className="text-base font-medium tracking-tight text-gray-800">
          Academic Information
        </h1>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="text-xs"
          >
            <Edit3 className="mr-1 h-3 w-3" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isUpdatingEducation}
              className="text-xs"
            >
              <Save className="mr-1 h-3 w-3" />
              {isUpdatingEducation ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isUpdatingEducation}
              className="text-xs"
            >
              <X className="mr-1 h-3 w-3" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {educationEntries.length === 0 && !isEditing ? (
          <div className="py-8 text-center text-gray-500">
            <p className="mb-4">No academic information added yet.</p>
            <Button variant="outline" onClick={handleEdit} className="text-xs">
              <Edit3 className="mr-1 h-3 w-3" />
              Add Academic Information
            </Button>
          </div>
        ) : (
          educationEntries.map((entry, index) => (
            <div
              key={entry.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium text-gray-800">
                  Education Entry {index + 1}
                </h3>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducationEntry(index)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Degree/Course *
                  </Label>
                  {isEditing ? (
                    <Input
                      value={entry.degree}
                      onChange={(e) =>
                        updateEducationEntry(index, "degree", e.target.value)
                      }
                      className={cn(errors[index]?.degree && "border-red-500")}
                      placeholder="e.g., Bachelor of Science"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {entry.degree || "Not provided"}
                    </div>
                  )}
                  {errors[index]?.degree && (
                    <p className="text-xs text-red-500">
                      {errors[index].degree}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Institution *
                  </Label>
                  {isEditing ? (
                    <Input
                      value={entry.institution}
                      onChange={(e) =>
                        updateEducationEntry(
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                      className={cn(
                        errors[index]?.institution && "border-red-500"
                      )}
                      placeholder="e.g., University of Example"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {entry.institution || "Not provided"}
                    </div>
                  )}
                  {errors[index]?.institution && (
                    <p className="text-xs text-red-500">
                      {errors[index].institution}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Year *
                  </Label>
                  {isEditing ? (
                    <Input
                      value={entry.year}
                      onChange={(e) =>
                        updateEducationEntry(index, "year", e.target.value)
                      }
                      className={cn(errors[index]?.year && "border-red-500")}
                      placeholder="e.g., 2020"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {entry.year || "Not provided"}
                    </div>
                  )}
                  {errors[index]?.year && (
                    <p className="text-xs text-red-500">{errors[index].year}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    GPA (Optional)
                  </Label>
                  {isEditing ? (
                    <Input
                      value={entry.gpa}
                      onChange={(e) =>
                        updateEducationEntry(index, "gpa", e.target.value)
                      }
                      className={cn(errors[index]?.gpa && "border-red-500")}
                      placeholder="e.g., 3.5"
                      type="number"
                      step="0.1"
                      min="0"
                      max="4"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {entry.gpa || "Not provided"}
                    </div>
                  )}
                  {errors[index]?.gpa && (
                    <p className="text-xs text-red-500">{errors[index].gpa}</p>
                  )}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Description (Optional)
                  </Label>
                  {isEditing ? (
                    <Textarea
                      value={entry.description}
                      onChange={(e) =>
                        updateEducationEntry(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Additional details about your education..."
                      rows={3}
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {entry.description || "No description provided"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {isEditing && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={addEducationEntry}
              className="text-xs"
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Another Education Entry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
