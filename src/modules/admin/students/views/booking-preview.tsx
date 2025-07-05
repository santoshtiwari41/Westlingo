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

import BookingIdAction from "../components/booking-id-actions";
import { GetBooking } from "../types";

interface BookingPreviewProps {
  booking: GetBooking;
}
export default function BookingPreview({ booking }: BookingPreviewProps) {
  return (
    <div className="mb-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{booking.title}</CardTitle>
          <CardDescription>{booking.description}</CardDescription>
          <Badge
            variant={booking.isActive ? "default" : "destructive"}
            className="text-sm"
          >
            {booking.isActive ? "Active Course" : "Inactive Course"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div>
            <p>{booking.content}</p>
          </div>
        </CardContent>
      </Card>

      <div className="div">
        <BookingIdAction
          booking={booking}
          haveFaqs={!!booking.faq}
          havePricings={!!booking.pricing}
          haveCarousels={!!booking.carousel}
        />
      </div>

      {booking.pricing && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <DollarSignIcon />
            PRICINGS
          </h2>
          <PricingsPreview
            pricing={booking.pricing}
            parentRef={{ testBookingId: booking.id }}
          />
        </div>
      )}

      {booking.faq && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <FileQuestionIcon />
            FAQS
          </h2>
          <FaqsPreview
            faq={booking.faq}
            parentRef={{ testBookingId: booking.id }}
          />
        </div>
      )}

      {booking.carousel && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <GalleryHorizontalIcon />
            CAROUSELS
          </h2>
          <CarouselsPreview
            carousel={booking.carousel}
            parentRef={{ testBookingId: booking.id }}
          />
        </div>
      )}
    </div>
  );
}
