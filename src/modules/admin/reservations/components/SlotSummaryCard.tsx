import React from "react";

import { Calendar, CheckCircle, Clock, Users, VideoIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface SlotSummaryCardProps {
  type: string;
  date: string;
  time: string;
  totalSeats: number;
  bookedSeats: number;
  availableSeats: number;
  status?: string;
  isVerified?: boolean;
  course?: string;
}

const typeColors: Record<string, string> = {
  mock_test: "bg-green-100 text-green-800",
  preparation_class: "bg-blue-100 text-blue-800",
  test_booking: "bg-purple-100 text-purple-800",
};

export const SlotSummaryCard: React.FC<SlotSummaryCardProps> = ({
  type,
  date,
  time,
  totalSeats,
  bookedSeats,
  availableSeats,
  status,
  isVerified,
  course,
}) => (
  <Card className="mb-6">
    <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Badge
          className={`flex items-center gap-2 px-3 py-1 text-base ${typeColors[type] || "bg-gray-100 text-gray-800"}`}
        >
          <VideoIcon className="h-4 w-4" />
          {type
            .replace("_", " ")
            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
        </Badge>
        {course && (
          <Badge
            variant="secondary"
            className="flex items-center gap-2 px-3 py-1"
          >
            <Users className="h-4 w-4" /> {course}
          </Badge>
        )}
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-3 py-1"
        >
          <Calendar className="h-4 w-4" /> {date}
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-3 py-1"
        >
          <Clock className="h-4 w-4" /> {time}
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Badge className="flex items-center gap-2 bg-blue-100 px-3 py-1 text-blue-800">
          <Users className="h-4 w-4" /> {totalSeats} Seats
        </Badge>
        <Badge className="flex items-center gap-2 bg-purple-100 px-3 py-1 text-purple-800">
          <CheckCircle className="h-4 w-4" /> {bookedSeats} Booked
        </Badge>
        <Badge
          className={
            availableSeats > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800" + " flex items-center gap-2 px-3 py-1"
          }
        >
          <Clock className="h-4 w-4" /> {availableSeats} Available
        </Badge>
        {typeof isVerified === "boolean" && (
          <Badge
            variant={isVerified ? "default" : "secondary"}
            className={
              isVerified
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }
          >
            {isVerified ? "Verified" : "Not Verified"}
          </Badge>
        )}
        {status && (
          <Badge variant="outline" className="ml-2">
            {status}
          </Badge>
        )}
      </div>
    </CardContent>
  </Card>
);
