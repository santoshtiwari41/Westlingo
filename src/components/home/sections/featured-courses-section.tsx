import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ShowcaseProduct {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  bgColor: string;
}

const showcaseProducts: ShowcaseProduct[] = [
  {
    title: "TITLE",
    subtitle: "DESCRIPTION",
    description: "CONTENT",
    image: "/study.avif",
    badge: "BADGE",
    bgColor: "bg-gradient-to-br from-gray-900 to-gray-700",
  },
  {
    title: "TITLE2",
    subtitle: "DESCRIPTION2",
    description: "CONTENT2",
    image: "/study.avif",
    badge: "BADGE2",
    bgColor: "bg-gradient-to-br from-pink-200 to-pink-400",
  },
];

export function FeaturedCoursesSection() {
  return (
    <section className="py-20">
      <div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {showcaseProducts.map((product) => (
            <Card
              key={product.title}
              className={`${product.bgColor} group overflow-hidden transition-transform duration-500 hover:opacity-95`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  {product.title}
                  <Badge>{product.badge}</Badge>
                </CardTitle>
                <CardDescription>{product.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <p className="mb-8 max-w-md text-sm opacity-75 md:text-base">
                  {product.description}
                </p>
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </AspectRatio>

                <div className="absolute top-4 right-4 h-12 w-12 rotate-12 transform rounded-xl bg-white/20 opacity-50" />
                <div className="absolute right-8 bottom-8 h-8 w-8 -rotate-12 transform rounded-lg bg-white/20 opacity-30" />
              </CardContent>
              <CardFooter className="flex">
                <Button>Learn more</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
