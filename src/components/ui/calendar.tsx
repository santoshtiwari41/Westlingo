"use client";

import * as React from "react";

import { DayPicker, type DayPickerProps } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "@/lib/utils";

export function Calendar({
  className,
  modifiersClassNames,
  ...props
}: DayPickerProps) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("bg-background", className)}
      modifiersClassNames={{
        ...modifiersClassNames,
        available: "rdp-day_available",
      }}
      {...props}
    />
  );
}
