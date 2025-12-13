'use client'
import React from 'react';
import Link from 'next/link';
import MobileHeroSection from './MobileHeroSection';
import { useIsMobile } from "@/hooks/use-mobile";
import FullPageLoader from "@/src/components/FullPageLoader";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const HeroSection: React.FC = () => {

  const isMobile = useIsMobile();

  if(isMobile === null) return <FullPageLoader />;

  if(isMobile) return <MobileHeroSection />

  return (
    <section className="hero-section text-white py-20 px-6 text-center mt-28">
<h1 className="text-4xl md:text-5xl font-bold mb-4">
  <span>
    We Don’t Just{' '}
    <PointerHighlight containerClassName="inline-block">
      <span className="text-[#98BFF5]">Make Cones</span>
    </PointerHighlight>
  </span>
  <br />
  <span>
    We Make Your <span className="text-[#98BFF5]">Brand Possible</span>
  </span>
</h1>

      <p className="text-lg md:text-xl text-gray-300 mb-8">
        Exceptional quality. Endless customization. True scalability.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link
          href="/custom-order"
          className="px-6 py-3 w-[22vw] bg-[#132135] text-[#FFFFFF] rounded-3xl hover:bg-blue-700 transition border-[2px]
                     border-[#FFFFF] shadow-[0_0_15px_#3b82f6]
                     "
        >
          Start Your Custom Order
        </Link>
        <Link
          href="/get-quote"
          className="px-6 py-3 border border-gray-500 rounded-3xl hover:bg-gray-800 transition border-[2px]"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
