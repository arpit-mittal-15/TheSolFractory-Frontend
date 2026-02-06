"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 1.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
//   const isInView = useInView(scope, {
//     margin: "-20% 0px -20% 0px", // triggers nicely on scroll
//   });
const isInView = useInView(scope, {
  amount: 0.6, // 🔥 starts when 70% is visible
});


  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: isInView ? 1 : 0,
        filter: filter
          ? isInView
            ? "blur(0px)"
            : "blur(10px)"
          : "none",
      },
      {
        duration,
        delay: stagger(0.20),
      }
    );
  }, [isInView]);

  return (
    <div className={cn("font-bold", className)}>
      <motion.div
        ref={scope}
        className="max-w-5xl text-[#00167a] text-4xl leading-snug tracking-wide"
      >
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="dark:text-white text-[#0a3e8c] opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
