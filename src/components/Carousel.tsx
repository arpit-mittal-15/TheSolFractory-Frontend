"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CardItem {
  image: string;
  label: string;
}

const cards: CardItem[] = [
  { image: "/homepage/conestack.png", label: "Natural Hemp" },
  { image: "/homepage/conestack.png", label: "Natural Hemp" },
  { image: "/homepage/conestack.png", label: "Premium Pink Pre-Rolls" },
  { image: "/homepage/conestack.png", label: "Hemp Cones" },
  { image: "/homepage/conestack.png", label: "Hemp Cones" },
];

export default function Carousel() {
  const [active, setActive] = useState(2);
  const total = cards.length;

  // Circular index
  const wrap = (index: number) => (index + total) % total;

  // 🔥 Auto Slide Every 3 Seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => wrap(prev + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col items-center py-10">
      <div className="relative w-full max-w-5xl h-112.5 flex justify-center items-center overflow-visible">
        {[0, 1, 2, 3, 4].map((pos) => {
          const index = wrap(active + (pos - 2));
          const offset = pos - 2;

          return (
            <motion.div
              key={index}
              className="absolute"
              animate={{
                x:
                  offset === 0
                    ? 0
                    : offset * 140 + (offset > 0 ? 60 : -60),
                scale: offset === 0 ? 1 : 0.88,
                opacity: 1,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <Card item={cards[index]} isActive={offset === 0} />
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-3 mt-6">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-3 w-3 rounded-full transition-all ${
              active === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/*───────────────────────────────────────────────
  CARD
───────────────────────────────────────────────*/

function Card({ item, isActive }: { item: CardItem; isActive: boolean }) {
  return (
    <div
      className={`
        w-[320px] h-105 rounded-xl overflow-hidden relative
        border border-white/15 backdrop-blur-lg
        shadow-[0_0_40px_20px_rgba(0,0,0,0.5)]
        transition-all duration-300
        ${isActive ? "scale-105 shadow-[0_0_55px_rgba(0,0,0,0.65)]" : ""}
      `}
      style={{
        background: "rgba(255,255,255,0.06)",
      }}
    >
      <Image
        src={item.image}
        alt={item.label}
        fill
        className="object-cover opacity-95"
      />
      <div
        className="
          absolute bottom-6 left-1/2 -translate-x-1/2 
          bg-black/40 backdrop-blur-md
          px-4 py-2 rounded-md border border-white/10
        "
      >
        <p className="text-white text-sm font-semibold">{item.label}</p>
      </div>
    </div>
  );
}
