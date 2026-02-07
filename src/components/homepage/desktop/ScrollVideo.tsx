"use client";

import React, { useRef, useEffect, useState } from 'react';
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const ScrollVideo = ({ videoSrc }: { videoSrc: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const overlayLockedRef = useRef(false);

  // State for Blob URL and UI
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  // 1. Load Video into Blob (Memory) to prevent network lag
  useEffect(() => {
    let active = true;
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(videoSrc);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        
        if (active) {
          setVideoUrl(objectUrl);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load video", error);
        setIsLoading(false);
      }
    };

    fetchVideo();

    return () => {
      active = false;
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoSrc]);

  // 2. Canvas & Scroll Animation Loop
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Wait until we have the videoUrl and elements
    if (!video || !canvas || !container || !videoUrl) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // alpha: false optimizes performance
    if (!ctx) return;

    let currentSmoothTime = 0;

    const resize = () => {
      // Set canvas size to match video resolution for sharpness
      if (video.videoWidth) {
         canvas.width = video.videoWidth;
         canvas.height = video.videoHeight;
      }
    };

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      // We subtract windowHeight to ensure we reach 1.0 when the bottom of container hits bottom of screen
      const totalDist = rect.height - windowHeight;
      // Invert rect.top because it goes negative as we scroll down
      const rawProgress = -rect.top / totalDist;
      
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      scrollProgressRef.current = progress;
    };

    const render = () => {
      if (video.duration) {
        // Calculate target time based on scroll
        const targetTime = video.duration * scrollProgressRef.current;
        
        // INTERPOLATION: Move current time towards target time smoothly (0.12 factor)
        // This creates the "weighted" feel
        currentSmoothTime += (targetTime - currentSmoothTime) * 0.12;

        // Only update video if difference is significant (performance optimization)
        if (Math.abs(video.currentTime - currentSmoothTime) > 0.01) {
          video.currentTime = currentSmoothTime;
        }

        // Draw the current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 🎯 OVERLAY LOGIC
        // Trigger when video is 90% done (change 0.9 to whatever percentage you want)
        // && !overlayLockedRef.current ensures we only trigger state update once
        if (!overlayLockedRef.current && currentSmoothTime >= video.duration * 0.4) {
          overlayLockedRef.current = true;
          setShowOverlay(true);
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    // Events
    const handleMetadata = () => {
      resize();
      // Initial draw
      render(); 
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Start loop
    render();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      video.removeEventListener("loadedmetadata", handleMetadata);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoUrl]); // Re-initialize when Blob URL is ready

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Loading State */}
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-white z-50">
                Loading High-Res Video...
            </div>
        )}

        {/* 🎬 Canvas (Visible) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-10"
        />

        {/* ✨ Overlay shown when scrolled enough */}
        {showOverlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="">
                <TextGenerateEffect
                words="Exceptional Quality. Endless Customization. True Scalability."
                className=" text-center text-[#00167a] text-4xl md:text-5xl leading-snug drop-shadow-lg"
                />
            </div>
          </div>
        )}

        {/* 🕵️ Hidden Source Video */}
        {videoUrl && (
            <video
            ref={videoRef}
            src={videoUrl}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
            />
        )}
      </div>
    </div>
  );
};

export default ScrollVideo;