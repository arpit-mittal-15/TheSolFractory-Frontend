"use client";

import React, { useRef, useEffect, useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";

interface SparkleTextProps {
  text: string;
  className?: string;
  sparkleColor?: string;
}

export function SparkleText({
  text,
  className = "",
  sparkleColor = "#FFFFFF",
}: SparkleTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  // Measure text width to set sparkle container width
  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [text]);

  return (
    <span className="relative inline-block">
      {/* Text */}
      <span
        ref={textRef}
        className={`relative z-10 font-bold ${className}`}
      >
        {text}
      </span>

      {/* Sparkle & line container */}
      <div
        className="absolute left-0 top-full mt-1"
        style={{ width: textWidth, height: '0.35em' }}
      >
        {/* Gradient lines */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute top-0 left-1/4 w-1/2 h-[3px] bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

        {/* Sparkles */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor={sparkleColor}
        />
      </div>
    </span>
  );
}
