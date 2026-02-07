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
          <div ref={containerRef} className="relative h-[270vh] bg-[rgba(0,20,52,0)] pt-15">
      <div className="sticky top-10 m-auto h-[90vh] w-[95vw] overflow-hidden rounded-2xl shadow-[0_5px_35px_rgba(255,255,255,0.25)] outline outline-offset-2 border-white/60">
      
      {/* 1. SCROLL CONTAINER 
        height: 500vh ensures a long scroll so the animation plays smoothly.
      */}
      <div ref={containerRef} className="relative h-1000vh]">
        
        {/* 2. STICKY VIEWPORT
          This stays fixed on screen while we scroll through the 500vh container.
        */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

          {/* The 3D Scene */}
          <div className="w-full h-full">
            <CarouselCanvas scrollProgress={scrollYProgress} />
          </div> </div> </div>
          
        </div>
      </div>
    </main>
  );
}