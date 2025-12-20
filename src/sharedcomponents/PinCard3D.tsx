"use client";

import React, { useState } from "react";
import Image from "next/image";

interface AnimatedPinCardProps {
  title: string;
  description?: string;
  image: string;
  forceHover?: boolean;
}

// Simple hover card used in "Why Brands Trust Our Cones"
// - Default: shows a clean image
// - Hover: image subtly blurs and a glass card appears, slightly wider than the image
// - Toggle behavior: When forceHover is active, mouse hover toggles to show image
export function AnimatedPinCard({ title, description, image, forceHover = false }: AnimatedPinCardProps) {
  const [isMouseHovered, setIsMouseHovered] = useState(false);

  // Toggle logic: if forceHover is active, mouse hover shows image (hides overlay)
  // If forceHover is false, normal hover behavior applies
  const shouldShowHover = forceHover 
    ? !isMouseHovered  // When forceHover is true, hover hides the overlay (shows image)
    : isMouseHovered;   // When forceHover is false, hover shows the overlay

  return (
    <div className="flex basis-full flex-col items-center tracking-tight text-slate-100/80 w-[20rem] h-88">
      <div 
        className="group relative inline-flex items-center justify-center"
        onMouseEnter={() => setIsMouseHovered(true)}
        onMouseLeave={() => setIsMouseHovered(false)}
      >
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className={`w-[20rem] h-84 object-cover transition duration-300 ease-out ${shouldShowHover ? 'blur-[3px]' : ''}`}
          />
        </div>

        {/* Glass overlay (appears on hover, slightly wider than the image) */}
        <div className={`pointer-events-none absolute transition duration-300 ease-out
                    backdrop-blur-xl bg-blue-950/80 border border-white shadow-[0_18px_60px_rgba(0,0,0,0.55)]
                    rounded-2xl px-8 py-6
                    w-92 max-w-none
                    ${shouldShowHover ? 'opacity-100' : 'opacity-0'}`}
        >
          <h3 className="text-lg font-semibold text-white drop-shadow-md text-center mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-white/80 drop-shadow-sm text-center leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
