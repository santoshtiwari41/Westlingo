import Image from "next/image";
import React from "react";

import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AspectRatio } from "../ui/aspect-ratio";
import CustomSection from "./custom-section";

const CustomOnlineCoaching = ({
  onlineCoachingBenefits,
  onlineCoachingBenefitsUrl,
}: {
  onlineCoachingBenefits: string[];
  onlineCoachingBenefitsUrl: string;
}) => {
  return (
    <CustomSection>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
          <Image
            src={onlineCoachingBenefitsUrl}
            alt="Online coaching character"
            fill
            className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </AspectRatio>

        <div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Online Coaching
          </h2>
          <p className="mb-6 text-lg text-gray-700">
            Prepare for IELTS with the expert
            <br />
            Achieve your desired IELTS score with us
          </p>

          <ul className="mb-8 space-y-3">
            {onlineCoachingBenefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-green-600" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>

          <Button>Get Started</Button>
        </div>
      </div>
    </CustomSection>
  );
};

export default CustomOnlineCoaching;
