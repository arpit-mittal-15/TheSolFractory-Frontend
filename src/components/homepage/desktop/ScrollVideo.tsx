"use client";

import React, { useRef, useEffect, useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const ScrollVideo = ({ videoSrc }: { videoSrc: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [showOverlay, setShowOverlay] = useState(false);
  const overlayLockedRef = useRef(false); // 🔒 once shown, never hide

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!video || !canvas || !container) return;

    const ctx = canvas.getContext("2d")!;
    let currentTime = 0;

    const resize = () => {
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
    };

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      scrollProgressRef.current = progress;
    };

    const render = () => {
      if (video.duration) {
        const target = video.duration * scrollProgressRef.current;
        currentTime += (target - currentTime) * 0.12;

        if (Math.abs(video.currentTime - currentTime) > 0.02) {
          video.currentTime = currentTime;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 🎯 SHOW OVERLAY WHEN VIDEO ENDS
        if (
          !overlayLockedRef.current &&
        //   currentTime >= video.duration - 0.05
        currentTime >= video.duration * 0.05   // 8% into video

        ) {
          overlayLockedRef.current = true;
          setShowOverlay(true);
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    video.addEventListener("loadedmetadata", () => {
      resize();
      render();
    });

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 🎬 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* ✨ Overlay shown ONLY at video end */}
        {showOverlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <TextGenerateEffect
              words="Exceptional quality. Endless customization. True scalability."
              className="max-w-4xl text-center text-4xl md:text-5xl leading-snug"
            />
          </div>
        )}

        {/* Hidden video for decoding */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ScrollVideo;
