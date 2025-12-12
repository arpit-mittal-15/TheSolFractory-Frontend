"use client";

import { useState } from "react";
import { Lens } from "@/components/ui/lens";
import Image from "next/image";

interface LensImageProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function LensImage({
  src,
  alt = "",
  className = "",
  width,
  height,
}: LensImageProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <Lens hovering={hovering} setHovering={setHovering}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </Lens>
  );
}
