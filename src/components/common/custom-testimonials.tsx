import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { Marquee } from "@/components/magicui/marquee";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TESTIMONIALS } from "@/data/config";
import { useTRPC } from "@/trpc/client";

interface ITestimonial {
  id: string;
  name: string;
  image: string | null;
  quote: string;
  bio: string | null;
  key: string | null;
}

export const TestimonialCard = ({ image, name, bio, quote }: ITestimonial) => {
  return (
    <Card className="hover:bg-muted/50 w-96 cursor-pointer transition-colors">
      <CardHeader className="flex flex-row items-center gap-3">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt={name}
          src={
            image ??
            "https://res.cloudinary.com/dfrb7mglo/image/upload/v1751374513/testimonial/fvbl6usmgesn2ruxnk2x.svg"
          }
        />
        <div>
          <CardTitle className="text-base">{name}</CardTitle>
          <CardDescription className="text-xs">{bio}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="text-muted-foreground text-sm">
          {quote}
        </blockquote>
      </CardContent>
    </Card>
  );
};
const CustomTestimonials = ({
  title = "Our Student Stories",
  description = "Our Student Stories",
}: {
  title?: string;
  description?: string;
}) => {
  const trpc = useTRPC();
  // const { data } = useQuery({
  //   ...trpc.testimonials.getActive.queryOptions(),
  //   initialData: TESTIMONIALS,
  //   refetchOnMount: true,
  // });
  const { data } = useQuery({
    ...trpc.testimonials.getActive.queryOptions(),
    initialData: TESTIMONIALS,
    refetchOnMount: true,
    retry: 1,
    staleTime: 0,
  });

  const firstRow = data?.slice(0, data?.length / 2);
  const secondRow = data?.slice(data?.length / 2);

  return (
    <div className="space-y-10 py-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          {description}
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow?.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow?.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
      </div>
    </div>
  );
};

export default CustomTestimonials;
