import Image from "next/image";
import React from "react";

import { CheckIcon } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import CustomSection from "./custom-section";

const CustomBenefits = ({
  benefits,
  benefitUrl,
}: {
  benefits: string[];
  benefitUrl: string;
}) => {
  return (
    <CustomSection>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              What you get??
            </h2>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckIcon className="text-red-400" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <Image
              src={benefitUrl}
              alt="Students studying together"
              fill
              className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </AspectRatio>
        </div>
      </div>
    </CustomSection>
  );
};

export default CustomBenefits;
