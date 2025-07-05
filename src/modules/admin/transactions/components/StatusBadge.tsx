import React from "react";

import { CheckCircle, Loader2, RotateCcw, XCircle } from "lucide-react";

const statusConfig: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  pending: { icon: Loader2, color: "text-yellow-600", label: "Pending" },
  paid: { icon: CheckCircle, color: "text-green-600", label: "Paid" },
  failed: { icon: XCircle, color: "text-red-600", label: "Failed" },
  refunded: { icon: RotateCcw, color: "text-blue-600", label: "Refunded" },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig["pending"];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 font-medium text-gray-800`}
      style={{ minWidth: 90 }}
    >
      {config.icon &&
        React.createElement(config.icon, {
          className: `w-4 h-4 ${config.color}`,
        })}
      <span>{config.label}</span>
    </span>
  );
}
