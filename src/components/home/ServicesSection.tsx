"use client";

import { Award, BookOpen, GraduationCap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServicesSectionProps {
  fadeInUp: string;
}

export default function ServicesSection({ fadeInUp }: ServicesSectionProps) {
  const services = [
    {
      icon: BookOpen,
      title: "Mock Tests",
      description: "Real exam simulation with detailed performance analysis",
      color: "blue",
      delay: "delay-300",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      icon: GraduationCap,
      title: "Preparation Classes",
      description:
        "Expert-led classes with personalized attention and strategies",
      color: "emerald",
      delay: "delay-500",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      icon: Award,
      title: "Test Booking",
      description: "Hassle-free test registration and scheduling assistance",
      color: "amber",
      delay: "delay-700",
      image: "/placeholder.svg?height=150&width=200",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Get Started",
      desc: "Discuss your goals and preferences",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      step: "02",
      title: "Course Selection",
      desc: "Find the perfect match for you",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      step: "03",
      title: "Preparation Process",
      desc: "We handle all the paperwork",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      step: "04",
      title: "Test & Results",
      desc: "Get ready for your new adventure",
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-20 text-center transition-all delay-200 duration-1000 ease-out ${fadeInUp}`}
        >
          <h2 className="mb-6 text-4xl font-semibold text-slate-900 md:text-5xl">
            Everything you need,
            <span className="block text-slate-600">all in one place</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            From initial consultation to landing in your dream destination
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group border-0 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${service.delay} ${fadeInUp}`}
            >
              <CardHeader className="pt-8 pb-4 text-center">
                <div
                  className={`h-20 w-20 bg-${service.color}-50 mx-auto mb-6 flex items-center justify-center rounded-2xl group-hover:bg-${service.color}-100 transition-all duration-300 group-hover:scale-110`}
                >
                  <service.icon
                    className={`h-10 w-10 text-${service.color}-600`}
                  />
                </div>
                <CardTitle className="text-2xl font-semibold text-slate-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 text-center">
                <p className="mb-6 leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          className={`rounded-3xl bg-slate-50 p-12 transition-all delay-900 duration-1000 ease-out ${fadeInUp}`}
        >
          <h3 className="mb-12 text-center text-3xl font-semibold text-slate-900">
            Your journey in 4 simple steps
          </h3>
          <div className="grid gap-8 md:grid-cols-4">
            {processSteps.map((item, index) => (
              <div key={index} className="group text-center">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-semibold text-white transition-transform duration-300 group-hover:scale-110">
                  {item.step}
                </div>
                <h4 className="mb-2 text-lg font-semibold text-slate-900">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
