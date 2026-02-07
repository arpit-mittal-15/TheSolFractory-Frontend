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
    <div ref={containerRef} className="relative h-[270vh] bg-[rgb(0,20,52)] pt-15">
      <div className="sticky top-10 m-auto h-[90vh] w-[95vw] overflow-hidden rounded-2xl shadow-[0_5px_35px_rgba(255,255,255,0.25)] outline outline-offset-2 border-white/60">
        
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
                className=" text-center text-4xl md:text-6xl "
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
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// const ScrollVideo = ({ videoSrc }: { videoSrc: string }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const scrollProgressRef = useRef(0);
//   const rafRef = useRef<number | null>(null);
//   const overlayLockedRef = useRef(false);

//   // State
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showOverlay, setShowOverlay] = useState(false);

//   // 1. Load Video into Blob (Memory)
//   useEffect(() => {
//     let active = true;
//     const fetchVideo = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(videoSrc);
//         const blob = await response.blob();
//         const objectUrl = URL.createObjectURL(blob);
        
//         if (active) {
//           setVideoUrl(objectUrl);
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error("Failed to load video", error);
//         setIsLoading(false);
//       }
//     };

//     fetchVideo();

//     return () => {
//       active = false;
//       if (videoUrl) URL.revokeObjectURL(videoUrl);
//     };
//   }, [videoSrc]);

//   // 2. Canvas & Scroll Animation Loop
//   useEffect(() => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const container = containerRef.current;

//     if (!video || !canvas || !container || !videoUrl) return;

//     const ctx = canvas.getContext("2d", { alpha: false });
//     if (!ctx) return;

//     let currentSmoothTime = 0;

//     const resize = () => {
//         // We set the canvas to the WINDOW size because it is fixed to the viewport
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
        
//         // Redraw immediately on resize
//         if (video.readyState >= 2) {
//              const scale = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight);
//              const x = (canvas.width / 2) - (video.videoWidth / 2) * scale;
//              const y = (canvas.height / 2) - (video.videoHeight / 2) * scale;
//              ctx.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale);
//         }
//     };

//     const onScroll = () => {
//       const rect = container.getBoundingClientRect();
//       const windowHeight = window.innerHeight;
      
//       const totalDist = rect.height - windowHeight;
//       const rawProgress = -rect.top / totalDist;
      
//       const progress = Math.min(Math.max(rawProgress, 0), 1);
//       scrollProgressRef.current = progress;
//     };

//     const render = () => {
//       if (video.duration) {
//         const targetTime = video.duration * scrollProgressRef.current;
//         currentSmoothTime += (targetTime - currentSmoothTime) * 0.12;

//         if (Math.abs(video.currentTime - currentSmoothTime) > 0.01) {
//           video.currentTime = currentSmoothTime;
//         }

//         // DRAW LOGIC: "Cover" fit for Canvas
//         const scale = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight);
//         const x = (canvas.width / 2) - (video.videoWidth / 2) * scale;
//         const y = (canvas.height / 2) - (video.videoHeight / 2) * scale;
        
//         ctx.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale);

//         // Overlay Logic
//         if (!overlayLockedRef.current && currentSmoothTime >= video.duration * 0.4) {
//           overlayLockedRef.current = true;
//           setShowOverlay(true);
//         }
//       }

//       rafRef.current = requestAnimationFrame(render);
//     };

//     const handleMetadata = () => {
//       resize();
//       render(); 
//     };

//     video.addEventListener("loadedmetadata", handleMetadata);
//     window.addEventListener("resize", resize);
//     window.addEventListener("scroll", onScroll, { passive: true });

//     // Initial Trigger
//     resize();
//     render();

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", resize);
//       video.removeEventListener("loadedmetadata", handleMetadata);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [videoUrl]);

//   return (
//     <div ref={containerRef} className="relative h-[270vh] bg-[rgb(0,20,52)] pt-15">
      
//       {/* THE STICKY FRAME 
//          This element scrolls normally until it sticks.
//          We rely on 'clip-path' inside it to reveal the fixed video.
//       */}
//       <div className="sticky top-10 m-auto h-[90vh] w-[95vw] relative z-10">
        
//         {/* Shadow & Border Layer (Separate div so clip-path doesn't cut the shadow) */}
//         <div className="absolute inset-0 rounded-2xl shadow-[0_5px_35px_rgba(255,255,255,0.25)] border border-white/60 pointer-events-none z-20" />

//         {/* THE MASK 
//            This creates the "Window". The content inside is FIXED to the screen,
//            but this div hides anything outside the rounded corners.
//         */}
//         <div 
//             className="absolute inset-0 rounded-2xl overflow-hidden z-0 bg-black/10" 
//             style={{ clipPath: "inset(0 round 1rem)" }} // Ensures strict clipping of fixed children
//         >
//             {/* THE CANVAS (Fixed Video)
//                Position: Fixed -> Pins it to the viewport (Screen)
//                Width/Height: Screen -> Fills the viewport
//                Result: It looks like a fixed background image.
//             */}
//             <canvas
//                 ref={canvasRef}
//                 className="fixed top-0 left-0 w-screen h-screen object-cover -z-10"
//             />
            
//             {/* Hidden Source Video */}
//             {videoUrl && (
//                 <video
//                 ref={videoRef}
//                 src={videoUrl}
//                 muted
//                 playsInline
//                 preload="auto"
//                 className="hidden" // We only need the data, not the element
//                 />
//             )}
//         </div>

//         {/* CONTENT (Text/Overlays) - Sits inside the sticky frame */}
        
//         {/* Loading Spinner */}
//         {isLoading && (
//             <div className="absolute inset-0 flex items-center justify-center text-white z-50 font-bold tracking-wider">
//                 LOADING VIDEO...
//             </div>
//         )}

//         {/* Text Overlay */}
//         {showOverlay && (
//           <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none mix-blend-overlay">
//             <div className="">
//                 <TextGenerateEffect
//                 words="Exceptional Quality. Endless Customization. True Scalability."
//                 className="text-center text-4xl md:text-6xl text-white font-bold drop-shadow-lg"
//                 />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ScrollVideo;
