"use client";

import { useState, useRef, useEffect } from "react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import Image from "next/image";

export default function VideoHero() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    // Try forcing play (for some mobile browsers)
    video
      .play()
      .then(() => {
        setVideoReady(true);
      })
      .catch(() => {
        // Autoplay blocked
        setVideoReady(false);
      });
  }, []);

  return (
    <div className="relative w-full h-screen z-0 overflow-hidden">

      {/* Fallback Image */}
      {!videoReady && (
        <Image
          width={1920}
          height={1080}
          src="/homepage/hero-image.png" // <-- your image
          alt="Hero Background"
          className="fixed inset-0 h-full w-full object-cover"
        />
      )}

      {/* Video */}
      <video
        ref={videoRef}
        className={`fixed inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        // src="https://ja3zeotcy2kd52jg.public.blob.vercel-storage.com/solherovideo.mp4"
        src="https://ja3zeotcy2kd52jg.public.blob.vercel-storage.com/solvideo-vmake_compressed.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlayThrough={() => setVideoReady(true)}
        onError={() => setVideoReady(false)}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900/70 backdrop-grayscale-80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-0 flex h-full items-center justify-center px-6">
        <div className="max-w-5xl text-center flex items-center justify-center">
          <span
            className="
            text-[#07376e] text-3xl md:text-4xl font-semibold mb-6
            text-nowrap"
          >
            <motion.span className=" flex flex-col items-center justify-center gap-0 text-center sm:mx-0 sm:mb-0 sm:flex-row">
              <span className="font-sans small-caps text-4xl md:text-5xl tracking-tight drop-shadow-[220] dark:bg-neutral-900 dark:text-white dark:shadow-sm dark:ring-1 dark:shadow-white/10 font-[860] dark:ring-white/10 drop-shadow-white">Machine Made</span>
              <LayoutTextFlip
                text=""
                words={["Cones", "Blunts", "Tubes"]}
                secondtext=""
              className="drop-shadow-2xl drop-shadow-black w-[180px]"
              />
              <span className="font-sans small-caps text-4xl md:text-5xl font-bold tracking-tight drop-shadow-sm dark:bg-neutral-900 dark:text-white dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10 drop-shadow-2xl drop-shadow-white">for</span>
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