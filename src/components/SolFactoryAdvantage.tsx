"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function SolFactoryAdvantage() {
  return (
    <section className="w-full flex justify-center py-5 px-6">
      <div className="max-w-7xl w-full border-[1px] border-white/60 
      rounded-xl p-8 md:p-12 
      flex flex-col md:flex-row gap-12 
      shadow-[0_0_40px_20px_rgba(0,0,0,0.5)]
">
        
        {/* LEFT SIDE CONTENT */}
        <div className="flex-1">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-10">
            The SOL Factory Advantage
          </h2>

          <div className="flex flex-col gap-8">

            {/* CARD 1 */}
            <CardGlowWrapper>
              <h3 className="font-semibold text-lg mb-2 text-[#FFFF]">Premium Quality</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Machine-made cones crafted with food-grade materials and strict QC 
                for smooth packing and even burns.
              </p>
            </CardGlowWrapper>
            {/* CARD 2 */}
            <CardGlowWrapper>
              <h3 className="font-semibold text-lg mb-2 text-[#FFFF]">Built for Scale</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Fully compatible with top filling machines—perfect for 
                high-volume production.
              </p>
            </CardGlowWrapper>

            {/* CARD 3 */}
            <CardGlowWrapper>
              <h3 className="font-semibold text-lg mb-2 text-[#FFFF]">White-Label Experts</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Custom sizes, branded filters, and packaging tailored 
                to your product line.
              </p>
            </CardGlowWrapper>

            {/* CARD 4 */}
            <CardGlowWrapper>
              <h3 className="font-semibold text-lg mb-2 text-[#FFFF]">Full Support</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                From design to delivery, we handle every step for a seamless 
                manufacturing experience.
              </p>
            </CardGlowWrapper>

          </div>
        </div>

        {/* RIGHT SIDE VIDEO PLACEHOLDER */}
        <div className="flex-1 flex justify-center">
          <div className="rounded-2xl bg-[#f6cdd5] w-full aspect-[3/4] max-w-md flex items-center justify-center">
            <span className="text-white text-3xl md:text-4xl font-bold text-center">
              YOUR<br />VIDEO<br />HERE
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}


// ⭐ Reusable Glow Card Wrapper
// ⭐ Reusable 3D Glow Card Wrapper
const CardGlowWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        relative rounded-xl p-6 bg-white/5 max-w-md border border-white/10
        shadow-[0px_8px_20px_rgba(0,0,0,0.4)] 
        transition-all duration-300 
        hover:shadow-[0px_20px_40px_rgba(0,0,0,0.6)] 
        hover:-translate-y-2 
        hover:scale-[1.03]
        hover:border-white/20
        [perspective:1000px]
      "
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glow */}
      <GlowingEffect
        spread={60}
        glow={true}
        disabled={false}
        proximity={80}
        inactiveZone={0.01}
      />

      {/* Content Layer */}
      <div
        className="relative"
        style={{
          transform: "translateZ(35px)", // makes content pop forward
        }}
      >
        {children}
      </div>

      {/* Back Card Depth Layer */}
      <div
        className="absolute inset-0 rounded-xl bg-white/5"
        style={{
          transform: "translateZ(-20px)", // fake depth behind the card
          filter: "blur(8px)",
          opacity: 0.15,
        }}
      ></div>
    </div>
  );
};

