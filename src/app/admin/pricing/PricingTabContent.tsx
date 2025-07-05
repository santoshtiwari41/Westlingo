import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PricingsPreview from "@/modules/admin/common/pricings/components/pricings-preview";

interface PricingTabContentProps {
  items: any[];
  entityType: "preparation" | "mockTest" | "testBooking";
  selectedCourseId: string;
  loading: boolean;
  setPricingModal: (modal: any) => void;
}

const PricingTabContent: React.FC<PricingTabContentProps> = ({
  items,
  entityType,
  selectedCourseId,
  loading,
  setPricingModal,
}) => {
  if (!selectedCourseId) return null;
  if (loading) return <div className="text-gray-500">Loading...</div>;
  if (!items || items.length === 0)
    return <div className="text-gray-500">No items found for this course.</div>;

  return (
    <>
      {items.map((item: any) => (
        <div key={item.id} className="mb-8 w-full max-w-4xl overflow-hidden">
          <h3 className="mb-2 text-lg font-semibold">
            {item.title}

            <span className="ml-2 text-sm text-gray-500">
              ({item.description})
            </span>
          </h3>

          {item.pricing ? (
            <div className="w-full">
              <div className="flex w-full flex-col items-start gap-2">
                {item?.pricing?.features?.map((feature: string) => ({
                  feature,
                }))}
              </div>

              <div className="mt-4">
                <PricingsPreview
                  pricing={item.pricing}
                  parentRef={
                    entityType === "preparation"
                      ? { preparationClassId: item.id }
                      : entityType === "mockTest"
                        ? { mockTestId: item.id }
                        : { testBookingId: item.id }
                  }
                  courseId={selectedCourseId}
                  entityType={entityType}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    setPricingModal({ type: "edit", entityType, entity: item })
                  }
                >
                  Edit Pricing
                </Button>
                {/* <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setPricingModal({ type: "edit", entityType, entity: item })
                  }
                >
                  Delete Pricing
                </Button> */}
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() =>
                setPricingModal({ type: "add", entityType, entity: item })
              }
            >
              Add Pricing
            </Button>
          )}
        </div>
      ))}
    </>
  );
};

export default PricingTabContent;
