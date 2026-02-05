"use client";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

export default function VideoHero() {
  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://ja3zeotcy2kd52jg.public.blob.vercel-storage.com/solvideo-vmake.mp4"
        // src="/videos/solvideo.mov"
        // src="https://cdn.prod.website-files.com/669a4a15cba8630cdb7be146%2F67501efec65b03f2a154ff47_altM%20Final-transcode.mp4%22
        // poster="https://cdn.prod.website-files.com/669a4a15cba8630cdb7be146%2F67501efec65b03f2a154ff47_altM%20Final-transcode.mp4%22
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="relative z-20 flex h-full items-center justify-center px-6">
        <div className="max-w-5xl text-center flex items-center justify-center">
          {/* Line 2 */}
          {/* <svg
            className="absolute inset-0
      text-4xl md:text-6xl
      font-semibold pointer-events-none"
            viewBox="0 0 1200 160"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="300"
              y="120"
              textAnchor="start"
              fill="#E5E7EB"
              stroke="#3E5B6A"
              strokeWidth="3"
              paintOrder="stroke"
            >
              We Make Your Brand Possible
            </text>
          </svg> */}
          {/* <span className="
            text-[#07376e] text-4xl md:text-6xl font-semibold
            [ text-shadow:
              1px_0_0_#3E5B6A,
            -1px_0_0_#3E5B6A,
              0_1px_0_#3E5B6A,
              0_-1px_0_#3E5B6A
            ]">We Make Your Brand Possible</span> */}

          {/* Main headline with synced rotating words on both lines */}
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
