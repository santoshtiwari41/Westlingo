import React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const PaginationControls = ({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        className="border-purple-200 text-purple-700 disabled:opacity-50"
        onClick={() => setPage((p: number) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        <ChevronLeft className="size-5" />
      </Button>
      <span className="text-sm text-zinc-700 dark:text-zinc-200">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="border-purple-200 text-purple-700 disabled:opacity-50"
        onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
};

export default PaginationControls;
