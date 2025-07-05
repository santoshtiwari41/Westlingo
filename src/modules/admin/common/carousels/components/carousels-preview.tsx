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
import CarouselItemActions from "@/modules/admin/common/carousels/components/carousel-item-actions";
import EditCarouselDialog from "@/modules/admin/common/carousels/components/dialog/edit-carousel-dialog";
import NewCarouselItemDialog from "@/modules/admin/common/carousels/components/dialog/new-carousel-item-dialog";
import { OneOfFaqParent } from "@/types/types";

import type { GetCarousel } from "../types";

interface CarouselsPreviewProps {
  carousel: GetCarousel;
  parentRef: OneOfFaqParent;
}

const CarouselsPreview = ({ carousel, parentRef }: CarouselsPreviewProps) => {
  const [open, setOpen] = useState(false);
  const [isEditCarouselOpen, setIsEditCarouselOpen] = useState(false);

  return (
    <div>
      <NewCarouselItemDialog
        open={open}
        onOpenChange={setOpen}
        carousel={carousel}
      />
      <EditCarouselDialog
        open={isEditCarouselOpen}
        onOpenChange={setIsEditCarouselOpen}
        initialValues={carousel}
        parentRef={parentRef}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{carousel.title}</CardTitle>
          <CardDescription>{carousel.description}</CardDescription>
          <Badge
            variant={carousel.isActive ? "default" : "destructive"}
            className="text-sm"
          >
            {carousel.isActive ? "Active Course" : "Inactive Course"}
          </Badge>
          <CardAction className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditCarouselOpen(true)}
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
            {carousel.items.map((item) => (
              <CarouselItemActions
                key={item.id}
                data={carousel}
                selectedCarousel={item}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarouselsPreview;
