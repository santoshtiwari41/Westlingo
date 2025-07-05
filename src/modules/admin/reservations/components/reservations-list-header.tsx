"use client";

import { useState } from "react";

import { PlusIcon, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useReservationsFilters } from "../hooks/use-reservations-filters";
import NewreservationDialog from "./new-reservation-dialog";
import ReservationsearchFilter from "./reservation-search-filter";

const ReservationsListHeader = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useReservationsFilters();

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: 1,
    });
  };
  return (
    <>
      <NewreservationDialog open={open} openOpenChange={setOpen} />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">reservations</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            New Reservation
          </Button>
        </div>

        <div className="flex items-center gap-x-2 p-1">
          <ReservationsearchFilter />

          {isAnyFilterModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationsListHeader;
