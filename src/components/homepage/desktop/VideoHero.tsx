"use client";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

import { motion } from "motion/react";

export default function VideoHero() {

  return (
    <div className="relative w-full h-screen z-0">
      <video
        className="fixed inset-0 h-full w-full object-cover"
        src="https://ja3zeotcy2kd52jg.public.blob.vercel-storage.com/solherovideo.mp4"
        // src="/videos/solhome-boomerange.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* overlay */}
      <div className="fixed inset-0 bg-blue-900/30 backdrop-grayscale-20 pointer-events-none" />

      <div className="relative z-0 flex h-full items-center justify-center px-6">
        <div className="max-w-5xl text-center flex items-center justify-center">
          <span
            className="
            text-[#07376e] text-3xl md:text-4xl font-semibold mb-6
            [ text-shadow:
              1px_0_0_#3E5B6A,
            -1px_0_0_#3E5B6A,
              0_1px_0_#3E5B6A,
              0_-1px_0_#3E5B6A
            ] text-nowrap"
          >
            <motion.span className=" flex flex-col items-center justify-center gap-0 text-center sm:mx-0 sm:mb-0 sm:flex-row">
              <span className="font-sans small-caps text-4xl md:text-5xl font-bold tracking-tight drop-shadow-lg dark:bg-neutral-900 dark:text-white dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10 drop-shadow-2xl drop-shadow-white">Machine Made</span>
              <LayoutTextFlip
                text=""
                words={["Cones", "Blunts", "Tubes"]}
                secondtext=""
              className="drop-shadow-2xl drop-shadow-black w-[180px]"
              />
              <span className="font-sans small-caps text-4xl md:text-5xl font-bold tracking-tight drop-shadow-lg dark:bg-neutral-900 dark:text-white dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10 drop-shadow-2xl drop-shadow-white">for</span>
              <LayoutTextFlip
                text=""
                words={["Even Quality", "Stable Shape", "Reliable Filling"]}
                secondtext=""
                className="text-center w-[330px] md:text-left drop-shadow-2xl drop-shadow-black"
              />
            </motion.span>
          </span>
        </div>
      </div>
    </div>
  );
}