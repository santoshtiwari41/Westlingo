"use client";

import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[40rem] overflow-hidden rounded-md bg-red-100 px-4 py-20"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="animate-slide-right absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-spin-slow absolute top-20 left-10 h-32 w-32 rounded-full border border-blue-500/30" />
        <div className="absolute top-40 right-20 h-24 w-24 rotate-45 animate-pulse border border-purple-500/30" />
        <div className="animate-float absolute bottom-32 left-1/4 h-16 w-16 rounded-lg bg-gradient-to-br from-pink-500/20 to-orange-500/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {/* Glowing Badge */}
          <div className="mb-8">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/25">
              <span className="mr-2 animate-pulse">✨</span>
              New iPad Pro
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
