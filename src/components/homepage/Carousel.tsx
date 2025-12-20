"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileCarousel from "./MobileCarousel";
import FullPageLoader from "@/src/components/FullPageLoader";

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

const total = cards.length;

// Circular index
const wrap = (index: number) => (index + total) % total;

export default function Carousel() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => wrap(prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  },);

  if(isMobile === null) return <FullPageLoader />;

  if (isMobile) {
    return <MobileCarousel />;
  }

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
                y:
                    offset === 0
                      ? 0
                      : Math.abs(offset) === 1
                      ? -70
                      : -120,
                scale: offset === 0 ? 1 : 0.88,
                opacity: 1,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{
                duration: 1,// Adjusted for smoother transition
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
            className={`h-2 w-2 rounded-full transition-all ${
              active === i ? "bg-white border-2 border-blue-400 shadow-[0_0_7px_rgba(255,255,255,0.8)]" : "bg-white/80"
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

function Card({ item, isActive }: { item: CardItem, isActive: boolean }) {
  return (
    <div
      className="relative w-[300px] h-100 rounded-xl overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        background: "rgba(19, 33, 53, 0.5)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "8px solid rgba(255, 255, 255, 0.12)",
        borderTop: "12px solid rgba(255, 255, 255, 0.35)",
        borderLeft: "10px solid rgba(255, 255, 255, 0.2)",
        borderBottom: "12px solid rgba(0, 0, 0, 0.4)",
        borderRight: "10px solid rgba(0, 0, 0, 0.25)",
        boxShadow: `
          0 25px 50px -12px rgba(0, 0, 0, 0.5),
          inset 0 4px 8px rgba(255, 255, 255, 0.5),
          inset 0 -8px 25px rgba(0, 0, 0, 0.4),
          0 0 0 2px rgba(255, 255, 255, 0.08)
        `,
      }}
    >
      {/* IMAGE */}
      <Image
        src={item.image}
        alt={item.label}
        fill
        sizes="(max-width: 768px) 90vw, 320px"
        className={`object-cover border rounded-xl ${isActive ? 'opacity-100' : 'opacity-55'}`}
      />

      {/* FULL IMAGE INNER BORDER (ALWAYS VISIBLE) */}
      <div
        className="absolute inset-0 rounded-xl
                   pointer-events-none z-10"
      />

      {/* LABEL */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2
                   bg-black/40 backdrop-blur-md
                   px-4 py-2 rounded-md border border-white/10
                   z-20"
      >
        <p className="text-white text-sm font-semibold">{item.label}</p>
      </div>
    </div>
  );
}