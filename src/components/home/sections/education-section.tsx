import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EducationSection() {
  return (
    <section className="rounded-md bg-gray-200 py-20">
      <div>
        <Card className="relative overflow-hidden rounded-3xl border-0 bg-blue-600 p-8 text-white md:p-12">
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Further Studies!
              <br />
              Foreign Employment!
              <br />
              Working Visa!
            </h2>
            <p className="mb-6 text-xl text-blue-100">
              most trusted consultancy!
            </p>
            <Button className="transform transition-all duration-300 hover:scale-105">
              Explore
            </Button>
          </div>

          <div className="absolute top-4 right-4 h-16 w-16 rotate-12 transform rounded-2xl bg-white/10" />
          <div className="absolute right-8 bottom-4 h-12 w-12 -rotate-12 transform rounded-xl bg-white/10" />
          <div className="absolute top-1/2 right-1/4 h-8 w-8 rotate-45 transform rounded-lg bg-white/10" />
        </Card>
      </div>
    </section>
  );
}
