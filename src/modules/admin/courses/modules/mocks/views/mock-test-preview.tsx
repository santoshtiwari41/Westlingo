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

import MockTestIdActions from "../components/mock-test-id-actions";
import { GetMockTest } from "../types";

interface MockTestPreviewProps {
  mock: GetMockTest;
}
export default function MockTestPreview({ mock }: MockTestPreviewProps) {
  return (
    <div className="mb-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{mock.title}</CardTitle>
          <CardDescription>{mock.description}</CardDescription>
          <Badge
            variant={mock.isActive ? "default" : "destructive"}
            className="text-sm"
          >
            {mock.isActive ? "Active Course" : "Inactive Course"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div>
            <p>{mock.content}</p>
          </div>
        </CardContent>
      </Card>

      <div className="div">
        <MockTestIdActions
          mock={mock}
          haveFaqs={!!mock.faq}
          havePricings={!!mock.pricing}
          haveCarousels={!!mock.carousel}
        />
      </div>

      {mock.pricing && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <DollarSignIcon />
            PRICINGS
          </h2>
          <PricingsPreview
            pricing={mock.pricing}
            parentRef={{ mockTestId: mock.id }}
          />
        </div>
      )}

      {mock.faq && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <FileQuestionIcon />
            FAQS
          </h2>
          <FaqsPreview faq={mock.faq} parentRef={{ mockTestId: mock.id }} />
        </div>
      )}

      {mock.carousel && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <GalleryHorizontalIcon />
            CAROUSELS
          </h2>
          <CarouselsPreview
            carousel={mock.carousel}
            parentRef={{ mockTestId: mock.id }}
          />
        </div>
      )}
    </div>
  );
}
