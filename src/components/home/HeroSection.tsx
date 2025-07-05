"use client";

import { ArrowRight, CheckCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  fadeInUp: string;
}

export default function HeroSection({ fadeInUp }: HeroSectionProps) {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-slate-50 to-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className={`transition-all duration-1000 ease-out ${fadeInUp}`}>
            <Badge className="mb-8 border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700 hover:bg-blue-50">
              Professional Test Preparation & Study Abroad Services
            </Badge>
            <h1 className="mb-8 text-5xl leading-tight font-semibold tracking-tight text-slate-900 md:text-6xl">
              Master your tests,
              <span className="block text-blue-600">achieve your dreams</span>
            </h1>
            <p className="mb-12 text-xl leading-relaxed text-slate-600">
              Expert-led IELTS, PTE, TOEFL preparation with flexible pricing
              plans. From basic mock tests to premium one-on-one coaching.
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full bg-blue-600 px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
              >
                View Course Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div
            className={`relative transition-all delay-300 duration-1000 ease-out ${fadeInUp}`}
          >
            <div className="relative">
              <img
                src="/ielts1.png"
                alt="Students studying abroad"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      15,000+ Students
                    </div>
                    <div className="text-sm text-slate-600">
                      Successfully placed worldwide
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 rounded-2xl bg-blue-600 p-4 text-white shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm">Visa Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
