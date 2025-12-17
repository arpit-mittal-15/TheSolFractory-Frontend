"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import MobileSolFactoryAdvantage from "./MobileSolFactoryAdvantage";
import { useIsMobile } from "@/hooks/use-mobile";
import FullPageLoader from "@/src/components/FullPageLoader";

export default function SolFactoryAdvantage() {

    const isMobile = useIsMobile();

    if(isMobile === null) return <FullPageLoader />;
  
    if(isMobile) return <MobileSolFactoryAdvantage />

  return (
    <section className="w-full py-14 px-6 flex flex-col items-center">

      {/* TITLE */}
      <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-10">
        The SOL Factory Advantage
      </h2>

      {/* VIDEO FULL WIDTH */}
      <div className="w-full max-w-7xl flex justify-center mb-14">
        <div className="w-full rounded-2xl aspect-22/5 flex items-center justify-center">
          <video
            controls
            className="w-full h-full rounded-2xl object-cover"
            src="https://ja3zeotcy2kd52jg.public.blob.vercel-storage.com/SOL%20Video%28Compressed%29.mp4"
          />
        </div>
      </div>


      {/* 4 CARDS GRID */}
      <div className="
        max-w-7xl 
        w-full 
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
        gap-8
      ">
        <CardGlowWrapper>
          <h3 className="font-semibold text-lg mb-2 text-white">Premium Quality</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            Machine-made cones crafted with food-grade materials and strict QC 
            for smooth packing and even burns.
          </p>
        </CardGlowWrapper>

        <CardGlowWrapper>
          <h3 className="font-semibold text-lg mb-2 text-white">White-Label Experts</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            Custom sizes, branded filters, and packaging tailored 
            to your product line.
          </p>
        </CardGlowWrapper>

        <CardGlowWrapper>
          <h3 className="font-semibold text-lg mb-2 text-white">Built for Scale</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            Fully compatible with top filling machines—perfect for 
            high-volume production.
          </p>
        </CardGlowWrapper>

        <CardGlowWrapper>
          <h3 className="font-semibold text-lg mb-2 text-white">Full Support</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            From design to delivery, we handle every step for a seamless 
            manufacturing experience.
          </p>
        </CardGlowWrapper>
      </div>
    </section>
  );
}


/* ⭐ Reusable Glow Wrapper */
const CardGlowWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        relative rounded-xl p-6 bg-white/5 border border-white/10
        shadow-[0_0_20px_rgba(0,0,0,0.4)]
        transition-all duration-300 
        hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]
        hover:-translate-y-2 
        hover:scale-[1.03]
        bor-shadow
      "
    >
      <GlowingEffect
        spread={60}
        glow={true}
        proximity={80}
        disabled={false}
        inactiveZone={0.01}
      />

      {/* content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
