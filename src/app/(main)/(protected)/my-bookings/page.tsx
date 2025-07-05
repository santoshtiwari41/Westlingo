"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export default function MyBookingsPage() {
  const trpc = useTRPC();
  const {
    data: reservationsData,
    isLoading: reservationsLoading,
    error: reservationsError,
  } = useQuery(trpc.reservations.getMany.queryOptions());
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
  const reservations = reservationsData?.items || [];
  const transactions = transactionsData?.items || [];

  return (
    <div className="mx-auto max-w-3xl p-0 sm:p-8 sm:pt-15">
      <h2 className="mb-4 text-xl font-semibold text-purple-700">
        Reservations
      </h2>
      {reservationsLoading ? (
        <div>Loading reservations...</div>
      ) : reservationsError ? (
        <div className="text-red-500">Failed to load reservations.</div>
      ) : reservations.length === 0 ? (
        <div className="mb-8 text-gray-500">No reservations found.</div>
      ) : (
        <div className="mb-10 overflow-x-auto">
          <table className="min-w-[600px] border text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 whitespace-nowrap">Course</th>
                <th className="px-4 py-2 whitespace-nowrap">Type</th>
                <th className="px-4 py-2 whitespace-nowrap">Date</th>
                <th className="px-4 py-2 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((b: any) => (
                <tr key={b.id}>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {b.course?.title || "-"}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {b.type
                      ?.replace(/_/g, " ")
                      .replace(/\b\w/g, (l: string) => l.toUpperCase()) || "-"}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {new Date(b.validFrom).toLocaleDateString()}
                  </td>
                  <td
                    className={
                      "border px-4 py-2 whitespace-nowrap " +
                      (b.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : b.status === "active"
                            ? "bg-blue-100 text-blue-700"
                            : b.status === "processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700")
                    }
                  >
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h2 className="mb-4 text-xl font-semibold text-purple-700">
        Transactions
      </h2>
      {transactionsLoading ? (
        <div>Loading transactions...</div>
      ) : transactionsError ? (
        <div className="text-red-500">Failed to load transactions.</div>
      ) : transactions.length === 0 ? (
        <div className="text-gray-500">No transactions found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[600px] border text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 whitespace-nowrap">Course</th>
                <th className="px-4 py-2 whitespace-nowrap">Type</th>
                <th className="px-4 py-2 whitespace-nowrap">Amount</th>
                <th className="px-4 py-2 whitespace-nowrap">Status</th>
                <th className="px-4 py-2 whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t: any) => (
                <tr key={t.id}>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {t.courseName || "-"}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {t.testTypeName
                      ?.replace(/_/g, " ")
                      .replace(/\b\w/g, (l: string) => l.toUpperCase()) || "-"}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    NPR {t.amount}
                  </td>
                  <td
                    className={
                      "border px-4 py-2 whitespace-nowrap " +
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
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {t.createdAt
                      ? new Date(t.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
