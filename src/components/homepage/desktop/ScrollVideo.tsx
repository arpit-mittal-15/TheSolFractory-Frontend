// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// const ScrollVideo = ({ videoSrc }: { videoSrc: string }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const scrollProgressRef = useRef(0);
//   const rafRef = useRef<number | null>(null);

//   const [showOverlay, setShowOverlay] = useState(false);
//   const overlayLockedRef = useRef(false); // 🔒 once shown, never hide

//   useEffect(() => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!video || !canvas || !container) return;

//     const ctx = canvas.getContext("2d")!;
//     let currentTime = 0;

//     const resize = () => {
//       canvas.width = video.videoWidth || 1280;
//       canvas.height = video.videoHeight || 720;
//     };

//     const onScroll = () => {
//       const rect = container.getBoundingClientRect();
//       const total = rect.height - window.innerHeight;
//       const progress = Math.min(Math.max(-rect.top / total, 0), 1);
//       scrollProgressRef.current = progress;
//     };

//     const render = () => {
//       if (video.duration) {
//         const target = video.duration * scrollProgressRef.current;
//         currentTime += (target - currentTime) * 0.12;

//         if (Math.abs(video.currentTime - currentTime) > 0.02) {
//           video.currentTime = currentTime;
//         }

//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         // 🎯 SHOW OVERLAY WHEN VIDEO ENDS
//         if (
//           !overlayLockedRef.current &&
//         //   currentTime >= video.duration - 0.05
//         currentTime >= video.duration * 0.05   // 8% into video

//         ) {
//           overlayLockedRef.current = true;
//           setShowOverlay(true);
//         }
//       }

//       rafRef.current = requestAnimationFrame(render);
//     };

//     video.addEventListener("loadedmetadata", () => {
//       resize();
//       render();
//     });

//     window.addEventListener("resize", resize);
//     window.addEventListener("scroll", onScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", resize);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="relative h-[300vh] bg-black">
//       <div className="sticky top-0 h-screen w-full overflow-hidden">
//         {/* 🎬 Canvas */}
//         <canvas
//           ref={canvasRef}
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         />

//         {/* ✨ Overlay shown ONLY at video end */}
//         {showOverlay && (
//           <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
//             <TextGenerateEffect
//               words="Exceptional quality. Endless customization. True scalability."
//               className="max-w-4xl text-center text-4xl md:text-5xl leading-snug"
//             />
//           </div>
//         )}

//         {/* Hidden video for decoding */}
//         <video
//           ref={videoRef}
//           src={videoSrc}
//           muted
//           playsInline
//           preload="auto"
//         //   className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
//         className="opacity-1"
//         />
//       </div>
//     </div>
//   );
// };

// export default ScrollVideo;
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
        if (!overlayLockedRef.current && currentSmoothTime >= video.duration * 0.9) {
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
                words="Exceptional quality. Endless customization. True scalability."
                className="max-w-4xl text-center text-[#00167a] text-4xl md:text-5xl leading-snug drop-shadow-lg"
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
// "use client";

// import React, { useRef, useEffect, useState } from 'react';

// const ScrollVideo = ({ videoSrc }: { videoSrc: string }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // 1. Pre-fetch the video entirely so it lives in memory (RAM)
//   // This eliminates network lag during scroll scrubbing.
//   useEffect(() => {
//     const fetchVideo = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(videoSrc);
//         const blob = await response.blob();
//         const objectUrl = URL.createObjectURL(blob);
//         setVideoUrl(objectUrl);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Failed to load video", error);
//         setIsLoading(false);
//       }
//     };

//     fetchVideo();

//     // Cleanup memory when component unmounts
//     return () => {
//       if (videoUrl) URL.revokeObjectURL(videoUrl);
//     };
//   }, [videoSrc]);

//   // 2. The Scroll Logic (Same as before, but safer)
//   useEffect(() => {
//     const video = videoRef.current;
//     const container = containerRef.current;
//     if (!video || !container || !videoUrl) return;

//     // Wait for metadata to ensure duration is known
//     const onLoadedMetadata = () => {
//         // Optional: Force a render at frame 0
//         video.currentTime = 0; 
//     };
//     video.addEventListener('loadedmetadata', onLoadedMetadata);

//     const handleScroll = () => {
//       // Safety check: ensure video is ready
//       if (!video.duration || isNaN(video.duration)) return;

//       const rect = container.getBoundingClientRect();
//       const windowHeight = window.innerHeight;
//       const totalHeight = rect.height + windowHeight;
//       const progress = 1 - (rect.bottom / totalHeight);
      
//       const clampedProgress = Math.min(Math.max(progress, 0), 1);

//       requestAnimationFrame(() => {
//         // Fast seeking is now safe because the file is in memory
//         video.currentTime = video.duration * clampedProgress;
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//         window.removeEventListener('scroll', handleScroll);
//         video.removeEventListener('loadedmetadata', onLoadedMetadata);
//     };
//   }, [videoUrl]); // Re-run this effect when videoUrl is ready

//   return (
//     <div 
//       ref={containerRef} 
//       className="relative w-full h-[300vh] bg-black" 
//     >
//       <div className="sticky top-0 h-screen w-full overflow-hidden">
//         {isLoading && (
//             <div className="absolute inset-0 flex items-center justify-center text-white bg-black z-10">
//                 Loading...
//             </div>
//         )}
        
//         {videoUrl && (
//             <video
//               ref={videoRef}
//               src={videoUrl}
//               className="w-full h-full object-cover"
//               muted
//               playsInline
//               // removing preload="auto" because we manually fetched it
//             />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ScrollVideo;