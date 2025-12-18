"use client";

import React from "react";
import { AnimatedPinCard } from "@/src/sharedcomponents/PinCard3D";
import MobileTrustCones from "./MobileTrustCones";
import { useIsMobile } from "@/hooks/use-mobile";
import FullPageLoader from "@/src/components/FullPageLoader";

const features = [
  {
    title: "Food-grade glue & materials",
    description: "Safe, clean, and tested for consistent performance.",
    image: "/homepage/conestack.png",
  },
  {
    title: "Cleanroom manufacturing",
    description:
      "Debris-free cones with consistent, uniform structure.",
    image: "/homepage/conestack.png",
  },
  {
    title: "Strict quality control",
    description:
      "Batch testing and precision checks ensure reliability at scale.",
    image: "/homepage/conestack.png",
  },
  {
    title: "Even, reliable burn",
    description:
      "Engineered for smooth airflow and predictable burn performance.",
    image: "/homepage/conestack.png",
  },
];

export default function TrustConesSection() {

  const isMobile = useIsMobile();

  if(isMobile === null) return <FullPageLoader />;

  if(isMobile) return <MobileTrustCones />

  return (
    <section className="w-full py-10 flex justify-center px-6">
      <div className="max-w-6xl w-full flex flex-col items-center">

        {/* Heading Box */}
        <div className="
            backdrop-blur-lg 
            px-10 py-8 text-center mb-10
        ">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3" style={{ textShadow: "0 0 8px rgba(255,255,255,0.6)" }}>
            Why Brands Trust Our Cones
          </h2>

          <p className="text-white/70 leading-relaxed">
            At SOL Factory, every cone is engineered with precision, safety, 
            and brand integrity in mind. We use food-grade materials, compliant 
            adhesives, and tightly controlled production methods to ensure your 
            products meet the highest industry standards—every single time.
          </p>
        </div>

        {/* ───────── ✦ First Row (larger spacing) ✦ ───────── */}
        <div className="
            grid grid-cols-1 md:grid-cols-2 
            gap-x-90 gap-y-20
            mb-30
        ">
          <AnimatedPinCard {...features[0]} />
          <AnimatedPinCard {...features[1]} />
        </div>

        {/* ───────── ✦ Second Row (smaller spacing) ✦ ───────── */}
        <div className="
            grid grid-cols-1 md:grid-cols-2 
            gap-x-24 gap-y-16 mb-10
        ">
          <AnimatedPinCard {...features[2]} />
          <AnimatedPinCard {...features[3]} />
        </div>

      </div>
    </section>
  );
}
