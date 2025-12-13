"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatedPinCard } from "@/src/sharedcomponents/PinCard3D";

const features = [
  {
    title: "Food-grade glue & materials",
    description: "Safe, clean, and tested for consistent performance.",
    image: "/homepage/conestack.png",
  },
  {
    title: "Cleanroom manufacturing",
    description: "Debris-free cones with consistent, uniform structure.",
    image: "/homepage/conestack.png",
  },
  {
    title: "Strict quality control",
    description: "Batch testing and precision checks ensure reliability at scale.",
    image: "/homepage/conestack.png",
  },
  {
    title: "Even, reliable burn",
    description: "Engineered for smooth airflow and predictable burn performance.",
    image: "/homepage/conestack.png",
  },
];

export default function TrustConesMobileCarousel() {
  return (
    <section className="w-full px-4 py-8 md:hidden">
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Why Brands Trust Our Cones
        </h2>
        <p className="text-white/70 text-sm">
          Precision-built cones using food-grade materials and controlled manufacturing.
        </p>
      </div>

      {/* Carousel */}
    <Carousel
    opts={{ align: "center", loop: true }}
    className="w-full max-w-sm mx-auto overflow-visible"
    >
    <CarouselContent className="overflow-visible">
        {features.map((feature, index) => (
        <CarouselItem
            key={index}
            className="min-h-[420px] px-2 overflow-visible"
        >
            <div className="py-6 overflow-visible">
            <AnimatedPinCard {...feature} />
            </div>
        </CarouselItem>
        ))}
    </CarouselContent>

    <CarouselPrevious className="left-1" />
    <CarouselNext className="right-1" />
    </Carousel>
    </section>
  );
}
