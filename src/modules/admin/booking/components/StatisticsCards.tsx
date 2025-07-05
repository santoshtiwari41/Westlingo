import React from "react";

import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Loader2,
  XCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface StatisticsCardsProps {
  total: number;
  completed: number;
  processing: number;
  active: number;
  upcoming: number;
  cancelled: number;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  total,
  completed,
  processing,
  active,
  upcoming,
  cancelled,
}) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium">Total</p>
            <p className="text-2xl font-bold">{total}</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-medium">Completed</p>
            <p className="text-2xl font-bold">{completed}</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="text-sm font-medium">Processing</p>
            <p className="text-2xl font-bold">{processing}</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-purple-600" />
          <div>
            <p className="text-sm font-medium">Active</p>
            <p className="text-2xl font-bold">{active}</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium">Upcoming</p>
            <p className="text-2xl font-bold">{upcoming}</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <XCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="text-sm font-medium">Cancelled</p>
            <p className="text-2xl font-bold">{cancelled}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);
