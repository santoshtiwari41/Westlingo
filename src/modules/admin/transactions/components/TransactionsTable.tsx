import { Loader2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import StatusBadge from "./StatusBadge";

export default function TransactionsTable({
  transactions,
  isLoading,
  error,
  updatingId,
  setUpdatingId,
  updateStatus,
  STATUS_OPTIONS,
}: any) {
  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div className="text-red-500">Failed to load transactions.</div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Test Type</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Payment Method</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-4 text-center">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((tx: any) => (
              <tr key={tx.id}>
                <td className="border px-4 py-2">{tx.courseName || "-"}</td>
                <td className="border px-4 py-2">{tx.testTypeName || "-"}</td>
                <td className="border px-4 py-2">
                  <div>
                    <span className="font-medium">{tx.name || "Unknown"}</span>
                    <div className="text-xs text-gray-500">
                      {tx.email || "No email"}
                    </div>
                  </div>
                </td>
                <td className="border px-4 py-2">{tx.amount}</td>
                <td className="border px-4 py-2">{tx.paymentMethod}</td>
                <td className="border px-4 py-2">
                  {tx.imageUrl ? (
                    <a
                      href={tx.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={tx.imageUrl}
                        alt="Proof"
                        className="h-10 w-10 rounded border object-contain"
                      />
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border px-4 py-2">
                  {tx.createdAt ? new Date(tx.createdAt).toLocaleString() : "-"}
                </td>
                <td className="border px-4 py-2">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="border px-4 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={
                          updateStatus.isPending && updatingId === tx.id
                        }
                      >
                        {updateStatus.isPending && updatingId === tx.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {STATUS_OPTIONS.filter(
                        (opt: string) => opt !== tx.status
                      ).map((opt: string) => (
                        <DropdownMenuItem
                          key={opt}
                          onClick={async () => {
                            setUpdatingId(tx.id);
                            await updateStatus.mutateAsync({
                              id: tx.id,
                              status: opt as
                                | "pending"
                                | "paid"
                                | "failed"
                                | "refunded",
                            });
                            setUpdatingId(null);
                          }}
                          disabled={
                            updateStatus.isPending && updatingId === tx.id
                          }
                        >
                          Set as {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
