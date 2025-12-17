"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function SolFactoryAdvantageMobile() {
  return (
    <section className="w-full bg-[#0e1a2b] py-10 px-4">

      {/* TITLE */}
      <h2 className="text-white text-2xl font-bold text-center mb-6">
        The SOL Factory Advantage
      </h2>

      {/* VIDEO */}
      <div className="mb-8">
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <video
            controls
            className="w-full h-full object-cover"
            src="https://ja3zeotcy2kd52jg.public.blob.vercel-storage.com/SOL%20Video%28Compressed%29.mp4"
          />
        </div>
      </div>

      {/* STAGGERED CARDS */}
      <div className="grid grid-cols-2 gap-4">

        {/* FULL WIDTH */}
        <div className="col-span-2">
          <MobileCard title="Premium Quality">
            Machine-made cones crafted with food-grade materials and strict QC
            for smooth packing and even burns.
          </MobileCard>
        </div>

        {/* HALF */}
        <MobileCard title="White-Label Experts">
          Custom sizes, branded filters, and packaging tailored to your product line.
        </MobileCard>

        <MobileCard title="Built for Scale">
          Fully compatible with top filling machines—perfect for high-volume production.
        </MobileCard>

        {/* FULL WIDTH */}
        {/* <div className="col-span-2">
          <MobileCard title="Full Support">
            From design to delivery, we handle every step for a seamless experience.
          </MobileCard>
        </div> */}
      </div>
    </section>
  );
}

/* ⭐ Mobile Card */
const MobileCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative h-full rounded-xl p-5 bg-white/5 border border-white/10 bor-shadow">
      <GlowingEffect
        spread={40}
        glow={true}
        proximity={60}
        inactiveZone={0.2}
      />

      <div className="relative z-10">
        <h3 className="text-white text-sm font-semibold mb-1">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
};
