import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const addressSchema = z.object({
  permanentAddress: z.string().optional(),
  temporaryAddress: z.string().optional(),
});
type AddressSchema = z.infer<typeof addressSchema>;

interface OnboardingAddressStepProps {
  initialValues: Partial<AddressSchema> | null;
  onContinue: (values: AddressSchema) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export default function OnboardingAddressStep({
  initialValues,
  onContinue,
  onBack,
  isLoading,
}: OnboardingAddressStepProps) {
  const form = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialValues || {
      permanentAddress: "",
      temporaryAddress: "",
    },
  });

  const handleSubmit = (values: AddressSchema) => {
    onContinue(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="permanentAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permanent Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="temporaryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temporary Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
