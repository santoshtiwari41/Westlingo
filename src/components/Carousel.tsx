"use client";

import { useEffect, useState } from "react";

const images = [
  {
    url: "/images/carousel1.png",
    title: "IELTS Preparation",
    description: "Expert-led IELTS training with proven results",
  },
  {
    url: "/images/carousel2.png",
    title: "PTE Academic",
    description: "Comprehensive PTE coaching for success",
  },
  {
    url: "/images/carousel3.png",
    title: "SAT Training",
    description: "Top-tier SAT preparation programs",
  },
];

export default function FullWidthCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
            i === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <img
            src={img.url}
            alt={img.title}
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/50 p-6 text-white md:p-20">
            <h2 className="mb-4 text-3xl font-bold drop-shadow-md md:text-5xl">
              {img.title}
            </h2>
            <p className="text-lg drop-shadow md:text-2xl">{img.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
