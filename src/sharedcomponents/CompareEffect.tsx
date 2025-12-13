import React from "react";
import { Compare } from "@/components/ui/compare";

interface data {
    firstImage: string,
    secondImage: string,
    width: number,
    height: number,
}

export function CompareEffect({ firstImage, secondImage, width = 1400, height = 800 }: data) {
  // Calculate aspect ratio to maintain rectangle shape
  const aspectRatio =( width + 350) / height;
  
  return (
    <div 
      className="w-full"
      style={{
        aspectRatio: `${aspectRatio}`,
      }}
    >
      <Compare
        firstImage={firstImage}
        secondImage={secondImage}
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="w-full h-full"
        slideMode="hover"
      />
    </div>
  );
}
