import { useState } from "react";

import { Edit2Icon, PlusCircleIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditPricingDialog from "@/modules/admin/common/pricings/components/dialog/edit-pricing-dialog";
import NewPricingItemDialog from "@/modules/admin/common/pricings/components/dialog/new-pricing-item-dialog";
import PricingItemActions from "@/modules/admin/common/pricings/components/pricing-item-actions";
import { OneOfFaqParent } from "@/types/types";

import type { GetPricing } from "../types";

interface PricingsPreviewProps {
  pricing: GetPricing;
  parentRef: OneOfFaqParent;
  courseId: string;
  entityType: "preparation" | "mockTest" | "testBooking";
}
const PricingsPreview = ({
  pricing,
  parentRef,
  courseId,
  entityType,
}: PricingsPreviewProps) => {
  const [open, setOpen] = useState(false);
  const [isEditFaqOpen, setIsEditFaqOpen] = useState(false);

  return (
    <div>
      <NewPricingItemDialog
        open={open}
        onOpenChange={setOpen}
        pricing={pricing}
        courseId={courseId}
        entityType={entityType}
      />
      <EditPricingDialog
        open={isEditFaqOpen}
        onOpenChange={setIsEditFaqOpen}
        initialValues={pricing}
        parentRef={parentRef}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{pricing.title}</CardTitle>
          <CardDescription>{pricing.description}</CardDescription>
          <Badge
            variant={pricing.isActive ? "default" : "destructive"}
            className="text-sm"
          >
            {pricing.isActive ? "Active" : "Inactive"}
          </Badge>
          <CardAction className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditFaqOpen(true)}
            >
              <Edit2Icon />
            </Button>
            <Button size="icon" onClick={() => setOpen(true)}>
              <PlusCircleIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {pricing.items.map((item) => (
              <PricingItemActions
                key={item.id}
                pricing={pricing}
                selectedPricing={item}
                courseId={courseId}
                entityType={entityType}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingsPreview;
