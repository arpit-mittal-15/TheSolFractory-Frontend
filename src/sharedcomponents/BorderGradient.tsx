"use client";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface Data {
  text: string;
}

export function BorderGradient({ text }: Data) {
  return (
    <div>
      <HoverBorderGradient
        containerClassName="rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_#3b82f6]"
        as="button"
        className="bg-[#040E1C] text-white flex items-center space-x-2 px-4 py-1"
      >
        <AceternityLogo />
        <span>{text}</span>
      </HoverBorderGradient>
    </div>
  );
}

const AceternityLogo = () => {
  return (
    <svg
      width="56"
      height="55"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};
