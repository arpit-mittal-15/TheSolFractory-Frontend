'use client'
import React from 'react';
import MobileHeroSection from '../mobile/MobileHeroSection';
import { useIsMobile } from "@/hooks/use-mobile";
import FullPageLoader from "@/src/components/global/FullPageLoader";

const HeroSection: React.FC = () => {

  const isMobile = useIsMobile();

  if(isMobile === null) return <FullPageLoader />;

  if(isMobile) return <MobileHeroSection />

  return (
    <section className="hero-section text-white py-0 pb-22 pt-3 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-w-[400px] leading-[1.35] md:leading-[1.4]">
        <span>
          We Don’t Just <span className="text-[#98BFF5]">Make Cones</span>
        </span>
        <br />
        <span>
          We Make Your <span className="text-[#98BFF5]">Brand Possible</span>
        </span>
      </h1>
      <p
        className="text-lg md:text-[20px] text-gray-300 mb-8"
        style={{ textShadow: "0 0 1px rgba(255,255,255,0.6)" }}
      >
        Exceptional quality. Endless customization. True scalability.
      </p>

      {/* <div className="flex justify-center gap-4 flex-wrap">
        <Link
          href="/contact"
          className="btn-liquid w-60 px-6 py-2 font-bold uppercase tracking-widest text-[11px]
                    text-gray-300 hover:text-white
                    flex items-center justify-center active"
        >
          Start Your Custom Order
        </Link>

        <Link
          href="/get-quote"
          className="btn-liquid w-60 px-6 py-3 font-bold uppercase tracking-widest text-[11px]
                    text-gray-300 hover:text-white border-gray-500 rounded-3xl hover:bg-gray-800 transition border-2"
        >
          Request a Quote
        </Link>
      </div> */}
    </section>
  );
};

export default HeroSection;
