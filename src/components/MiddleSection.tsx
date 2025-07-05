"use client";

import { BookOpen, Headphones, ShieldCheck, Users } from "lucide-react";

export default function MiddleSection() {
  const features = [
    {
      icon: <BookOpen size={28} className="text-indigo-600" />,
      title: "Expert Instructors",
      description:
        "Learn from certified trainers with years of experience in IELTS, PTE, and SAT coaching.",
    },
    {
      icon: <ShieldCheck size={28} className="text-indigo-600" />,
      title: "Proven Success",
      description:
        "Our students consistently achieve top band scores with our tested strategies and practice.",
    },
    {
      icon: <Users size={28} className="text-indigo-600" />,
      title: "Small Class Sizes",
      description:
        "We prioritize quality with small batches, ensuring personal attention and guidance.",
    },
    {
      icon: <Headphones size={28} className="text-indigo-600" />,
      title: "Live & Recorded Sessions",
      description:
        "Attend live online/offline classes or revisit sessions anytime with recorded content.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Why Choose Our Platform?
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          We’re committed to delivering the best preparation experience for
          IELTS, PTE, and other global exams.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-50 p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
