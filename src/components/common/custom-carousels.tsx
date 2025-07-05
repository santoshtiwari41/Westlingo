"use client";

import Image from "next/image";
import * as React from "react";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { AspectRatio } from "../ui/aspect-ratio";
import CustomSection from "./custom-section";

interface CarouselItem {
  id: string;
  name: string;
  url: string;
  order: number;
}

const CustomCarousels = ({ items }: { items: CarouselItem[] }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <CustomSection>
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </CustomSection>
  );
};

export default CustomCarousels;
