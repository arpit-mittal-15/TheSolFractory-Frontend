"use client";

import { useEffect, useState } from "react";

type SmokeOverlayTextProps = {
  heading: string;
  paragraph: string;
};

export default function SmokeOverlayText({
  heading,
  paragraph,
}: SmokeOverlayTextProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const h = window.innerHeight;
      const y = window.scrollY;

      /**
       * Matches SmokeSection timing:
       * Spacer before = 100vh
       * Full smoke hold = next ~200vh
       */
      const start = h * 1.1;
      const end = h * 2.8;

      setVisible(y > start && y < end);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 45, // slightly above smoke canvas
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          maxWidth: "720px",
          padding: "0 1.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            marginBottom: "1rem",
          }}
        >
          {heading}
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          {paragraph}
        </p>
      </div>
    </div>
  );
}
