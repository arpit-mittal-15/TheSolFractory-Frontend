import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Image from "next/image";

export function Mac3D() {
  return (
    <div className="w-full h-screen overflow-hidden dark:bg-[#0B0B0F] flex items-center justify-center">
      <div className="w-full mb-30 max-w-7xl flex items-center justify-center">
        <MacbookScroll
          title={<span />}
          badge={
            <a href='/build'>
              <img
                src="/solfranceimage.png"
                alt="My Logo"
                className="h-13 w-13 rounded-full"
                />
            </a>
          }
          src="/brochureimages/u7.jpeg"
          showGradient={false}
        />
      </div>
    </div>
  );
}

