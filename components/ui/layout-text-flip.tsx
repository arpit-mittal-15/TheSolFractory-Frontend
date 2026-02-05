"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
 
export const LayoutTextFlip = ({
  text = "",
  secondtext = "",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
  className = ""
}: {
  text: string;
  secondtext: string;
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
 
    return () => clearInterval(interval);
  }, []);
 
  return (
    <>
      <motion.span
        layoutId="subtext"
        className="text-2xl font-bold tracking-tight drop-shadow-lg md:text-4xl"
      >
        {text}
      </motion.span>
 
      <motion.span
        layout
        //rounded-md border border-transparent ring
        className={`relative overflow-hidden min-w-35.5 px-4 py-2 font-sans text-4xl font-bold tracking-tight text-white ring-black/0  drop-shadow-lg md:text-5xl dark:bg-neutral-900 dark:text-white dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10 ${className}`}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(0px)" }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ y: 50, filter: "blur(0px)", opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            className={cn("inline-block whitespace-nowrap")}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
 
      <motion.span
        className="text-2xl font-bold tracking-tight drop-shadow-lg md:text-4xl"
      >
        {secondtext}
      </motion.span>
    </>
  );
};