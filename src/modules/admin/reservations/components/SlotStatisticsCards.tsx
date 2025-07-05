import React from "react";

import { Calendar, CheckCircle, Clock, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface SlotStatisticsCardsProps {
  totalSlots: number;
  totalSeats: number;
  totalBooked: number;
  totalAvailable: number;
}

export const SlotStatisticsCards: React.FC<SlotStatisticsCardsProps> = ({
  totalSlots,
  totalSeats,
  totalBooked,
  totalAvailable,
}) => (
  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium">Total Slots</p>
            <p className="text-2xl font-bold">{totalSlots}</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-medium">Total Seats</p>
            <p className="text-2xl font-bold">{totalSeats}</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-purple-600" />
          <div>
            <p className="text-sm font-medium">Booked Seats</p>
            <p className="text-2xl font-bold">{totalBooked}</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="text-sm font-medium">Available Seats</p>
            <p className="text-2xl font-bold">{totalAvailable}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);
