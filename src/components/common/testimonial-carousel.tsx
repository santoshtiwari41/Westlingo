"use client";

import { useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export interface ITestimonials {
  id: string;
  type: string | null;
  name: string;
  image: string | null;
  quote: string;
}

interface TestimonialCarouselProps {
  items: ITestimonials[];
  autoplayDelay?: number;
  variant?: "student" | "teacher";
}

export function TestimonialCarousel({
  items,
  autoplayDelay = 4000,
  variant = "student",
}: TestimonialCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const isTeacher = variant === "teacher";

  return (
    <div>
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className="basis-full">
              <Card
                className={`mx-4 border-0 shadow-lg ${
                  isTeacher ? "bg-gradient-to-r from-red-200 to-red-300" : ""
                }`}
              >
                <CardContent
                  className={`relative ${isTeacher ? "" : "text-center"}`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-center gap-6">
                      <Avatar className="h-14 w-14">
                        <AvatarImage
                          src={
                            item.image ??
                            "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751374513/testimonial/fvbl6usmgesn2ruxnk2x.svg"
                          }
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="">
                        <h4 className="mb-2 text-xl font-bold text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-xs">{item.quote}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-3 flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === current
                ? "scale-125 bg-red-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to ${isTeacher ? "teacher profile" : "testimonial"} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
