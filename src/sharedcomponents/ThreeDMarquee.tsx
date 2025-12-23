"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function Marquee3D() {
  // Generate paths: u1.jpeg → u11.jpeg
  const images = Array.from({ length: 20 }, (_, i) => {
    const index = i + 1; // start from 1
    return `/brochureimages/u${index}.jpeg`;
  });

  return (
    <div className="max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} width={1400} height={750} />
    </div>
  );
}
