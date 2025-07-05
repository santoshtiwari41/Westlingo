"use client";

import { useState } from "react";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import NewCarouselDialog from "@/modules/admin/common/carousels/components/dialog/new-carousel-dialog";
import NewFaqDialog from "@/modules/admin/common/faqs/components/dialog/new-faq-dialog";
import NewPricingDialog from "@/modules/admin/common/pricings/components/dialog/new-pricing-dialog";

import { GetMockTest } from "../types";

interface MockTestIdActionsProps {
  haveFaqs: boolean;
  havePricings: boolean;
  haveCarousels: boolean;
  mock: GetMockTest;
}

const MockTestIdActions = ({
  haveFaqs,
  havePricings,
  haveCarousels,
  mock,
}: MockTestIdActionsProps) => {
  const [isFaqOpen, setisFaqOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  return (
    <>
      <NewFaqDialog
        open={isFaqOpen}
        onOpenChange={setisFaqOpen}
        parentRef={{ mockTestId: mock.id }}
      />
      <NewPricingDialog
        open={isPricingOpen}
        onOpenChange={setIsPricingOpen}
        parentRef={{ mockTestId: mock.id }}
      />
      <NewCarouselDialog
        open={isCarouselOpen}
        onOpenChange={setIsCarouselOpen}
        parentRef={{ mockTestId: mock.id }}
      />

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {!haveFaqs && (
            <Button onClick={() => setisFaqOpen(true)}>
              <PlusIcon />
              New Faq
            </Button>
          )}
          {!havePricings && (
            <Button onClick={() => setIsPricingOpen(true)}>
              <PlusIcon />
              New Pricing
            </Button>
          )}
          {!haveCarousels && (
            <Button onClick={() => setIsCarouselOpen(true)}>
              <PlusIcon />
              New Carousel
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MockTestIdActions;
