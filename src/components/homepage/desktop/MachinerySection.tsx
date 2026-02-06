"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  IconRocket,
  IconDropletFilled,
  IconShieldCheck,
} from "@tabler/icons-react";

/* ================= DATA ================= */

const FEATURES = [
  { icon: IconRocket, label: "High speed output" },
  { icon: IconDropletFilled, label: "Consistent fill" },
  { icon: IconShieldCheck, label: "Industrial-grade reliability" },
] as const;

/* ================= SHINY FEATURE CARD ================= */

function ShinyGlassCard({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string; stroke?: number }>;
  label: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      setShine({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    },
    []
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={() => setShine({ x: 50, y: 50 })}
      className="group relative flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08))",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.35)",
        boxShadow:
          "0 10px 35px rgba(0,0,0,0.35), inset 0 2px 6px rgba(255,255,255,0.4)",
      }}
    >
      {/* blue cursor shine */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 90px at ${shine.x}% ${shine.y}%, rgba(59,130,246,0.45), transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10">
        <Icon className="h-6 w-6 text-white" stroke={1.5} />
      </div>

      <span className="relative z-10 text-xs uppercase tracking-wider text-white">
        {label}
      </span>
    </div>
  );
}

/* ================= MAIN SECTION ================= */

export default function MachinerySection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* page glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        // style={{
        //   background:
        //     "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.18), transparent 60%)",
        // }}
      />

      {/* ================= CENTER GLASS HERO (VIDEO INSIDE CARD) ================= */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto rounded-3xl overflow-hidden px-8 py-24 min-h-[420px]"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.35), rgba(19,33,53,0.45))",
          backdropFilter: "blur(46px) saturate(1.2)",
          WebkitBackdropFilter: "blur(46px) saturate(1.2)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: `
            0 45px 120px rgba(0,0,0,0.45),
            inset 0 2px 8px rgba(255,255,255,0.45),
            inset 0 -2px 6px rgba(0,0,0,0.35)
          `,
        }}
      >
        {/* 🎥 VIDEO BACKGROUND INSIDE CARD */}
        <video
          // src="/videos/alienrobo1.mp4"
          src="https://ja3zeotcy2kd52jg.public.blob.vercel-storage.com/alienrobo1.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* bg-blue-800/40 backdrop-grayscale-80  // bg-[#081427]/70 */}
        <div className="absolute inset-0 bg-blue-950/50 backdrop-blur-[2px]" /> 
          {/* glass highlight */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.35), transparent 45%)",
            }}
          />

        {/* ================= CENTER CONTENT ================= */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Cone Automation
          </h1>

          <p className="mt-6 max-w-xl text-white/90 leading-relaxed">
            Automate your pre-roll production with high-speed fill and seal technology.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <ShinyGlassCard key={f.label} {...f} />
            ))}
          </div>
      </div>
      </div>
    </section>
  );
}
