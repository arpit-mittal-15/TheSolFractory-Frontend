"use client";

import React from "react";
import Image from "next/image";
import { PinContainer } from "@/components/ui/3d-pin";

interface AnimatedPinCardProps {
  title: string;
  description: string;
  image: string;
}

export function AnimatedPinCard({ title, description, image }: AnimatedPinCardProps) {
  return (
    <PinContainer title={title} href="#">
      <div className="flex basis-full flex-col tracking-tight text-slate-100/80 w-[20rem] h-[22rem]">
        
        {/* Title */}
        {/* <h3 className="text-lg font-semibold text-white mb-2">{title}</h3> */}

        {/* Description */}
        {/* <p className="text-sm text-white/70 leading-relaxed mb-4">
          {description}
        </p> */}

        {/* Image */}
        <div className="flex-1 w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </PinContainer>
  );
}
