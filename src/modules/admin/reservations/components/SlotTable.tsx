import React from "react";

import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SlotTableProps {
  slots: any[];
  onEdit: (slot: any) => void;
  onDelete: (slot: any) => void;
  isDeleting: string | null;
}

const typeColors: Record<string, string> = {
  mock_test: "bg-green-100 text-green-800",
  preparation_class: "bg-blue-100 text-blue-800",
  test_booking: "bg-purple-100 text-purple-800",
};

export const SlotTable: React.FC<SlotTableProps> = ({
  slots,
  onEdit,
  onDelete,
  isDeleting,
}) => (
  <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
    <table className="min-w-full text-sm">
      <thead className="bg-zinc-100">
        <tr>
          <th className="px-3 py-2 text-left">Course</th>
          <th className="px-3 py-2 text-left">Type</th>
          <th className="px-3 py-2 text-left">Date</th>
          <th className="px-3 py-2 text-left">Time</th>
          <th className="px-3 py-2 text-left">Total Seats</th>
          <th className="px-3 py-2 text-left">Booked</th>
          <th className="px-3 py-2 text-left">Available</th>
          <th className="px-3 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {slots.map((slot) => (
          <tr key={slot.id} className="border-b hover:bg-zinc-50">
            <td className="px-3 py-2 font-medium">
              {slot.course?.title || "Unknown"}
            </td>
            <td className="px-3 py-2">
              <Badge
                className={typeColors[slot.type] || "bg-gray-100 text-gray-800"}
              >
                {slot.type
                  .replace("_", " ")
                  .replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </Badge>
            </td>
            <td className="px-3 py-2">{slot.date}</td>
            <td className="px-3 py-2">{slot.time}</td>
            <td className="px-3 py-2">{slot.seats}</td>
            <td className="px-3 py-2">{slot.bookedSeats}</td>
            <td className="px-3 py-2">
              <Badge
                className={
                  slot.availableSeats > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {slot.availableSeats}
              </Badge>
            </td>
            <td className="px-3 py-2">
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(slot)}
                  className="text-purple-700 hover:bg-purple-100"
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    /* onView(slot) */
                  }}
                  className="text-blue-700 hover:bg-blue-100"
                >
                  View
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDelete(slot)}
                        disabled={isDeleting === slot.id}
                        className="p-2 hover:bg-red-100"
                        aria-label="Delete Slot"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Slot</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
