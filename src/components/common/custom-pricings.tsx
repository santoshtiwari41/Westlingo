import { useRouter } from "next/navigation";

import { Check, Star } from "lucide-react";

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

import CustomSection from "./custom-section";

interface PricingItem {
  id: string;
  title: string;
  description: string | null;
  isActive: boolean;
  features: string[];
  price: string;
  pricingId: string;
  isFeatured?: boolean;
}

type CustomPricingsProps = {
  items: PricingItem[];
  courseId: string;
  type: string;
};

const CustomPricings = ({ items, courseId, type }: CustomPricingsProps) => {
  const router = useRouter();
  return (
    <CustomSection>
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Pricings!
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          Pricings!
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.id}
            className={`relative ${item.isFeatured ? "border-primary scale-105 shadow-lg" : ""}`}
          >
            {item.isFeatured && (
              <Badge className="bg-primary absolute -top-3 left-1/2 -translate-x-1/2 transform">
                <Star className="mr-1 h-3 w-3" />
                Most Popular
              </Badge>
            )}

            <CardHeader className="pb-8 text-center">
              <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
              {item.description && (
                <CardDescription className="mt-2 text-base">
                  {item.description}
                </CardDescription>
              )}
              <div className="mt-4">
                <span className="text-4xl font-bold">{item.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                variant={item.isFeatured ? "default" : "outline"}
                size="lg"
                onClick={() => {
                  router.push(
                    `/book?course=${courseId}&service=${type}&plan=${item.id}`
                  );
                }}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </CustomSection>
  );
};
export default CustomPricings;
