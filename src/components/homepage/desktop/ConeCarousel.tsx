// app/page.js
"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import CarouselCanvas from "../shared/CarouselScene";

export default function ConeCarousel() {
  const containerRef = useRef(null);
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className=" min-h-screen">
      
      {/* 1. SCROLL CONTAINER 
        height: 500vh ensures a long scroll so the animation plays smoothly.
      */}
      <div ref={containerRef} className="relative h-[500vh]">
        
        {/* 2. STICKY VIEWPORT
          This stays fixed on screen while we scroll through the 500vh container.
        */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

          {/* The 3D Scene */}
          <div className="w-full h-full mt-16">
            <CarouselCanvas scrollProgress={scrollYProgress} />
          </div>
          
        </div>
      </div>
    </main>
  );
}