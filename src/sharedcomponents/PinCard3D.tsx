"use client";

import React from "react";
import Image from "next/image";

interface AnimatedPinCardProps {
  title: string;
  description?: string;
  image: string;
}

// Simple hover card used in "Why Brands Trust Our Cones"
// - Default: shows a clean image
// - Hover: image subtly blurs and a glass card appears, slightly wider than the image
export function AnimatedPinCard({ title, description, image }: AnimatedPinCardProps) {
  return (
    <div className="flex basis-full flex-col items-center tracking-tight text-slate-100/80 w-[20rem] h-88">
      <div className="group relative inline-flex items-center justify-center">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className="w-[20rem] h-[21rem] object-cover transition duration-300 ease-out group-hover:blur-[3px]"
          />
        </div>

        {/* Glass overlay (appears on hover, slightly wider than the image) */}
        <div
          className="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition duration-300 ease-out
                     backdrop-blur-xl bg-white/8 border-2 border-white/20 shadow-[0_18px_60px_rgba(0,0,0,0.55)]
                     rounded-2xl px-8 py-6
                     w-[23rem] max-w-none"
        >
          <h3 className="text-lg font-semibold text-white text-center mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-white/75 text-center leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
