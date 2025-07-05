import React from "react";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export default function PaymentHistoryTab() {
  const trpc = useTRPC();
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useQuery(
    trpc.pricings.getUserTransactions?.queryOptions() || {
      data: null,
      isLoading: false,
      error: null,
    }
  );
  const transactions = transactionsData?.items || [];

  return (
    <div
      className="relative flex min-h-[calc(100vh-32px)] flex-col gap-4 rounded-xl border border-gray-300 bg-white px-3 pt-2 pb-8 sm:px-8"
      style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.03)" }}
    >
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pt-4 pb-1">
        <h1 className="text-base font-medium tracking-tight text-gray-800">
          Payment history
        </h1>
      </div>
      <section className="rounded-lg border border-gray-300 bg-white p-4">
        <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="text-xs font-semibold text-gray-700">
            Payment Transactions
          </div>
        </div>
        {transactionsLoading ? (
          <div>Loading transactions...</div>
        ) : transactionsError ? (
          <div className="text-red-500">Failed to load transactions.</div>
        ) : transactions.length === 0 ? (
          <div className="text-gray-500">No transactions found.</div>
        ) : (
          <div className="block w-full overflow-x-auto">
            <table className="min-w-[600px] border text-xs sm:text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-2 whitespace-nowrap sm:px-4">
                    Course
                  </th>
                  <th className="px-2 py-2 whitespace-nowrap sm:px-4">Type</th>
                  <th className="px-2 py-2 whitespace-nowrap sm:px-4">
                    Amount
                  </th>
                  <th className="px-2 py-2 whitespace-nowrap sm:px-4">
                    Status
                  </th>
                  <th className="px-2 py-2 whitespace-nowrap sm:px-4">Date</th>
                  <th className="px-2 py-2 whitespace-nowrap sm:px-4">Image</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t: any) => (
                  <tr key={t.id}>
                    <td className="border px-2 py-2 whitespace-nowrap sm:px-4">
                      {t.courseName || "-"}
                    </td>
                    <td className="border px-2 py-2 whitespace-nowrap sm:px-4">
                      {t.testTypeName
                        ?.replace(/_/g, " ")
                        .replace(/\b\w/g, (l: string) => l.toUpperCase()) ||
                        "-"}
                    </td>
                    <td className="border px-2 py-2 whitespace-nowrap sm:px-4">
                      NPR {t.amount}
                    </td>
                    <td
                      className={
                        "border px-2 py-2 whitespace-nowrap sm:px-4 " +
                        (t.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : t.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : t.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : t.status === "refunded"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700")
                      }
                    >
                      {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </td>
                    <td className="border px-2 py-2 whitespace-nowrap sm:px-4">
                      {t.createdAt
                        ? new Date(t.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="border px-2 py-2 whitespace-nowrap sm:px-4">
                      {t.imageUrl ? (
                        <a
                          href={t.imageUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={t.imageUrl}
                            alt="Payment Proof"
                            className="h-8 w-8 rounded border object-contain sm:h-10 sm:w-10"
                          />
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
