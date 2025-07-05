import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

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
import {
  type EducationSchema,
  educationSchema,
} from "@/modules/user/profile/schema";

interface OnboardingEducationStepProps {
  initialValues: EducationSchema["education"];
  onContinue: (values: EducationSchema["education"]) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export default function OnboardingEducationStep({
  initialValues,
  onContinue,
  onBack,
  isLoading,
}: OnboardingEducationStepProps) {
  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education:
        initialValues && initialValues.length
          ? initialValues
          : [
              {
                id: String(Date.now()),
                degree: "",
                institution: "",
                year: "",
                gpa: "",
                description: "",
              },
            ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({ education: initialValues });
    }
  }, [initialValues]);

  const handleSubmit = (values: EducationSchema) => {
    onContinue(values.education);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {fields.map((item, idx) => (
          <div key={item.id} className="mb-2 rounded border p-2">
            <FormField
              control={form.control}
              name={`education.${idx}.degree`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${idx}.institution`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${idx}.year`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${idx}.gpa`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPA</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${idx}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => remove(idx)}
              className="mt-2"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            append({
              id: String(Date.now()),
              degree: "",
              institution: "",
              year: "",
              gpa: "",
              description: "",
            })
          }
        >
          Add Education
        </Button>
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
    </Form>
  );
}
