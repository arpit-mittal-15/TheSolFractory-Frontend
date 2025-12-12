"use client";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface Data {
  text: string;
  active?: boolean;
  icon?: React.ReactNode; // optional custom icon
}

export function BorderGradient({ text, active, icon }: Data) {
  return (
    <div
      className={`
        rounded-full transition-all duration-300
        ${active ? "shadow-[0_0_15px_#3b82f6]" : ""}
      `}
    >
      <HoverBorderGradient
        containerClassName={`
          rounded-full transition-all duration-300 ease-in-out
          ${!active ? "hover:shadow-[0_0_15px_#3b82f6]" : ""}
        `}
        as="button"
        className="bg-[#040E1C] text-white flex items-center space-x-2 px-4 py-1"
      >
        {/* Icon section — custom icon or default */}
        {icon ? (
          <span className="h-3 w-3 text-white flex items-center">{icon}</span>
        ) : ""}

        <span>{text}</span>
      </HoverBorderGradient>
    </div>
  );
}