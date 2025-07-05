"use client";

import React, { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2Icon, PlusCircleIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PricingItemForm from "@/modules/admin/common/pricings/components/form/pricing-item-form";
import { useTRPC } from "@/trpc/client";

interface PricingItem {
  id: string;
  title: string;
  description: string;
  price: number | string;
  features: string[];
  isActive?: boolean;
}

interface PricingListEditableProps {
  pricing: PricingItem[];
  parentRef: Record<string, string>;
  type: "preparation" | "mockTest" | "testBooking";
}

const PricingListEditable: React.FC<PricingListEditableProps> = ({
  pricing,
  parentRef,
  type,
}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<PricingItem | null>(null);
  const [adding, setAdding] = useState(false);

  const invalidatePricingQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [
        type === "preparation"
          ? "preparations.getAllByCourse"
          : type === "mockTest"
            ? "mockTests.getAllByCourse"
            : "bookings.getAllByCourse",
        { courseId: parentRef.courseId },
      ],
    });
  };
  const removePricingItem = useMutation(
    trpc.pricings.removePricingItem.mutationOptions({
      onSuccess: () => invalidatePricingQuery(),
    })
  );

  const handleEdit = (item: PricingItem) => setEditingItem(item);
  const handleDelete = (id: string) => removePricingItem.mutate({ id });
  const handleAdd = () => setAdding(true);

  return (
    <div className="space-y-4">
      {adding && (
        <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <PricingItemForm
              pricing={{
                id: "new",
                title: "",
                description: "",
                isActive: true,
                items: [],
                ...parentRef,
              }}
              onSuccess={() => {
                setAdding(false);
                invalidatePricingQuery();
              }}
              onCancel={() => setAdding(false)}
            />
          </div>
        </div>
      )}
      {editingItem && (
        <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <PricingItemForm
              pricing={{
                id: editingItem.id,
                title: editingItem.title,
                description: editingItem.description ?? "",
                isActive: editingItem.isActive ?? true,
                items: [],
                ...parentRef,
              }}
              initialValues={{
                ...editingItem,
                isActive: editingItem.isActive ?? true,
                price: String(editingItem.price),
              }}
              onSuccess={() => {
                setEditingItem(null);
                invalidatePricingQuery();
              }}
              onCancel={() => setEditingItem(null)}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {pricing.length === 0 && (
          <div className="text-gray-400">No pricing set for this item.</div>
        )}
        {pricing.map((item) => (
          <Card key={item.id} className="group relative">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  {item.title}
                  {!item.isActive && (
                    <Badge variant="destructive">Inactive</Badge>
                  )}
                </CardTitle>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(item)}
                >
                  <Edit2Icon className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                  disabled={removePricingItem.isPending}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pt-0">
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-blue-700">
                  ₹{item.price}
                </span>
                <div className="flex flex-wrap gap-1">
                  {item.features.map((feature) => (
                    <Badge key={feature} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-2 flex justify-end">
        <Button
          onClick={handleAdd}
          size="sm"
          className="flex items-center gap-2"
        >
          <PlusCircleIcon className="h-4 w-4" /> Add Pricing
        </Button>
      </div>
    </div>
  );
};

export default PricingListEditable;
