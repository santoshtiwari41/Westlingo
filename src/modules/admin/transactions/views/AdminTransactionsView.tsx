"use client";

import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import TransactionsTable from "../components/TransactionsTable";

const STATUS_OPTIONS = ["pending", "paid", "failed", "refunded"];

export default function AdminTransactionsView() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(
    trpc.pricings.getAllTransactions.queryOptions()
  );
  const transactions = data?.items || [];

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateStatus = useMutation(
    trpc.pricings.updateTransactionStatus.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.pricings.getAllTransactions.queryKey
        );
      },
    })
  );

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Transactions</h1>
      <TransactionsTable
        transactions={transactions}
        isLoading={isLoading}
        error={error}
        updatingId={updatingId}
        setUpdatingId={setUpdatingId}
        updateStatus={updateStatus}
        STATUS_OPTIONS={STATUS_OPTIONS}
      />
    </div>
  );
}
