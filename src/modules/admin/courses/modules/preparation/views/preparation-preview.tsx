"use client";

import {
  DollarSignIcon,
  FileQuestionIcon,
  GalleryHorizontalIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CarouselsPreview from "@/modules/admin/common/carousels/components/carousels-preview";
import FaqsPreview from "@/modules/admin/common/faqs/components/faqs-preview";
import PricingsPreview from "@/modules/admin/common/pricings/components/pricings-preview";

import PreparationIdActions from "../components/preparation-id-actions";
import { GetPreparation } from "../types";

interface PreparationPreviewProps {
  preparation: GetPreparation;
}
export default function PreparationPreview({
  preparation,
}: PreparationPreviewProps) {
  return (
    <div className="mb-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{preparation.title}</CardTitle>
          <CardDescription>{preparation.description}</CardDescription>
          <Badge
            variant={preparation.isActive ? "default" : "destructive"}
            className="text-sm"
          >
            {preparation.isActive ? "Active Course" : "Inactive Course"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div>
            <p>{preparation.content}</p>
          </div>
        </CardContent>
      </Card>

      <div className="div">
        <PreparationIdActions
          preparation={preparation}
          haveFaqs={!!preparation.faq}
          havePricings={!!preparation.pricing}
          haveCarousels={!!preparation.carousel}
        />
      </div>

      {preparation.pricing && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <DollarSignIcon />
            PRICINGS
          </h2>
          <PricingsPreview
            pricing={preparation.pricing}
            parentRef={{ preparationClassId: preparation.id }}
          />
        </div>
      )}

      {preparation.faq && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <FileQuestionIcon />
            FAQS
          </h2>
          <FaqsPreview
            faq={preparation.faq}
            parentRef={{ preparationClassId: preparation.id }}
          />
        </div>
      )}

      {preparation.carousel && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <GalleryHorizontalIcon />
            CAROUSELS
          </h2>
          <CarouselsPreview
            carousel={preparation.carousel}
            parentRef={{ preparationClassId: preparation.id }}
          />
        </div>
      )}
    </div>
  );
}
