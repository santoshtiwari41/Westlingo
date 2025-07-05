import { useState } from "react";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  {
    title: "Visa Application",
    subtitle: "Know more >",
    bg: "bg-pink-100",
    icon: "🛂",
  },
  {
    title: "Education Counseling",
    subtitle: "Know more >",
    bg: "bg-yellow-100",
    icon: "🎓",
  },
  {
    title: "University Admissions",
    subtitle: "Know more >",
    bg: "bg-purple-100",
    icon: "🏛️",
  },
  {
    title: "Test Booking",
    subtitle: "Know more >",
    bg: "bg-indigo-100",
    icon: "📝",
  },
];

export default function StudyAbroadBanner() {
  const [index, setIndex] = useState(0);
  const visible = features.slice(index, index + 3);

  const next = () =>
    setIndex((prev) => (prev < features.length - 3 ? prev + 1 : prev));
  const prev = () => setIndex((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <section className="flex flex-col items-center justify-between gap-10 bg-white px-4 py-16 md:flex-row md:px-20">
      <div className="max-w-lg text-center md:text-left">
        <h2 className="mb-4 text-2xl font-semibold text-purple-900 md:text-3xl">
          With you at every step of your study abroad journey
        </h2>
        <p className="mb-6 text-gray-600">
          Get personalised, friendly, honest guidance for free from the top
          consultancy in Nepal
        </p>
        <button className="mx-auto flex cursor-pointer items-center gap-2 rounded-full bg-purple-900 px-6 py-3 text-white transition hover:bg-purple-800 md:mx-0">
          Book a free consultation <ArrowRight size={16} />
        </button>
      </div>

      <div className="relative w-full max-w-xl">
        <div className="flex items-center justify-center gap-4">
          <button
            className="cursor-pointer rounded-full bg-white p-2 shadow transition hover:bg-gray-100"
            onClick={prev}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-4 overflow-hidden">
            {visible.map((f, i) => (
              <div
                key={i}
                className={`h-48 w-40 flex-shrink-0 rounded-xl p-4 ${f.bg} flex flex-col justify-between text-center shadow-sm`}
              >
                <div className="text-5xl">{f.icon}</div>
                <div>
                  <h4 className="text-sm font-semibold">{f.title}</h4>
                  <p className="text-xs text-gray-500">{f.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="rounded-full bg-white p-2 shadow transition hover:bg-gray-100"
            onClick={next}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: features.length - 2 }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === index ? "bg-purple-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
