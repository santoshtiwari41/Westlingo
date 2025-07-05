"use client";

import {
  ArrowRight,
  CheckCircle,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface CTASectionProps {
  fadeInUp: string;
}

export default function CTASection({ fadeInUp }: CTASectionProps) {
  const features = [
    { icon: CheckCircle, text: "Flexible pricing plans" },
    { icon: CheckCircle, text: "Expert instructors" },
    { icon: CheckCircle, text: "Guaranteed score improvement" },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "Call us",
      value: "+977-1-XXXXXXX",
    },
    {
      icon: Mail,
      label: "Email us",
      value: "info@studyabroadnepal.com",
    },
    {
      icon: MessageCircle,
      label: "Live chat",
      value: "Available 24/7",
    },
  ];

  return (
    <section className="bg-slate-900 py-24 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-4xl text-center transition-all delay-200 duration-1000 ease-out ${fadeInUp}`}
        >
          <h2 className="mb-6 text-4xl font-semibold md:text-5xl">
            Ready to ace your
            <span className="block text-blue-400">
              English proficiency test?
            </span>
          </h2>
          <p className="mb-12 text-xl leading-relaxed text-slate-300">
            Choose from our flexible pricing plans and start your test
            preparation journey today. From basic mock tests to premium
            one-on-one coaching.
          </p>

          <div className="mb-12 grid gap-8 md:grid-cols-3">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-3"
              >
                <item.icon className="h-6 w-6 text-emerald-400" />
                <span className="text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-8 text-center md:grid-cols-3">
            {contactInfo.map((item, index) => (
              <div key={index} className="space-y-2">
                <item.icon className="mx-auto h-8 w-8 text-blue-400" />
                <div className="text-slate-300">{item.label}</div>
                <div className="font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
