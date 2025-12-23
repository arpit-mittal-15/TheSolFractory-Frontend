"use client";

import React, {
  useState,
  useEffect,
  ElementType,
  ComponentPropsWithoutRef,
  ComponentType,
} from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

/**
 * Polymorphic props type
 */
type HoverBorderGradientProps<T extends ElementType = "button"> = {
  as?: T;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export function HoverBorderGradient<T extends ElementType = "button">({
  children,
  containerClassName,
  className,
  as,
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps<T>) {
  // Cast to a generic React component type so TypeScript allows children correctly
  const Tag = (as || "button") as ComponentType<any>;

  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (current: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const index = directions.indexOf(current);
    return clockwise
      ? directions[(index - 1 + directions.length) % directions.length]
      : directions[(index + 1) % directions.length];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, #fff 0%, rgba(255,255,255,0) 100%)",
    LEFT:
      "radial-gradient(16.6% 43.1% at 0% 50%, #fff 0%, rgba(255,255,255,0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, #fff 0%, rgba(255,255,255,0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.2% at 100% 50%, #fff 0%, rgba(255,255,255,0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181% at 50% 50%, #3275F8 0%, rgba(255,255,255,0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prev) => rotateDirection(prev));
      }, duration * 1000);

      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      {...(props as ComponentPropsWithoutRef<any>)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border bg-black/20 hover:bg-black/10 transition duration-500 items-center justify-center overflow-visible p-px w-fit",
        containerClassName
      )}
    >
      {/* Content */}
      <div
        className={cn(
          "relative z-10 bg-black text-white px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit]"
        style={{
          filter: "blur(5px)",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />

      {/* Inner background */}
      <div className="absolute inset-[2px] rounded-[inherit] bg-black z-[1]" />
    </Tag>
  );
}
