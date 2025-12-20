"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const [topRowIntersecting, setTopRowIntersecting] = useState(false);
  const [bottomRowIntersecting, setBottomRowIntersecting] = useState(false);
  const topRowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottomRowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compute which animation should be active (only one at a time)
  // Priority: if bottom row is visible, show it; otherwise show top row if visible
  const topRowVisible = topRowIntersecting && !bottomRowIntersecting;
  const bottomRowVisible = bottomRowIntersecting;

  useEffect(() => {
    if (isMobile) return;

    const topRowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Clear any existing timeout
          if (topRowTimeoutRef.current) {
            clearTimeout(topRowTimeoutRef.current);
            topRowTimeoutRef.current = null;
          }

          if (entry.isIntersecting) {
            // Wait 0.5 seconds after 100% visibility before activating
            topRowTimeoutRef.current = setTimeout(() => {
              setTopRowIntersecting(true);
            }, 50);
          } else {
            // Immediately hide when not intersecting
            setTopRowIntersecting(false);
          }
        });
      },
      {
        threshold: 0.7, // Trigger when 100% of the element is visible
        rootMargin: "0px",
      }
    );

    const bottomRowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Clear any existing timeout
          if (bottomRowTimeoutRef.current) {
            clearTimeout(bottomRowTimeoutRef.current);
            bottomRowTimeoutRef.current = null;
          }

          if (entry.isIntersecting) {
            // Wait 0.5 seconds after 100% visibility before activating
            bottomRowTimeoutRef.current = setTimeout(() => {
              setBottomRowIntersecting(true);
            }, 50);
          } else {
            // Immediately hide when not intersecting
            setBottomRowIntersecting(false);
          }
        });
      },
      {
        threshold: 0.7, // Trigger when 100% of the element is visible
        rootMargin: "0px",
      }
    );

    if (topRowRef.current) {
      topRowObserver.observe(topRowRef.current);
    }
    if (bottomRowRef.current) {
      bottomRowObserver.observe(bottomRowRef.current);
    }

    return () => {
      // Clear timeouts on cleanup
      if (topRowTimeoutRef.current) {
        clearTimeout(topRowTimeoutRef.current);
      }
      if (bottomRowTimeoutRef.current) {
        clearTimeout(bottomRowTimeoutRef.current);
      }
      if (topRowRef.current) {
        topRowObserver.unobserve(topRowRef.current);
      }
      if (bottomRowRef.current) {
        bottomRowObserver.unobserve(bottomRowRef.current);
      }
    };
  }, [isMobile]);

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
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3" style={{ textShadow: "0 0 3px rgba(255,255,255,0.6)" }}>
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
        <div 
          ref={topRowRef}
          className="
            grid grid-cols-1 md:grid-cols-2 
            gap-x-90 gap-y-20
            mb-30
        ">
          <AnimatedPinCard {...features[0]} forceHover={topRowVisible} />
          <AnimatedPinCard {...features[1]} forceHover={topRowVisible} />
        </div>

        {/* ───────── ✦ Second Row (smaller spacing) ✦ ───────── */}
        <div 
          ref={bottomRowRef}
          className="
            grid grid-cols-1 md:grid-cols-2 
            gap-x-24 gap-y-16 mb-10
        ">
          <AnimatedPinCard {...features[2]} forceHover={bottomRowVisible} />
          <AnimatedPinCard {...features[3]} forceHover={bottomRowVisible} />
        </div>

      </div>
    </section>
  );
}
