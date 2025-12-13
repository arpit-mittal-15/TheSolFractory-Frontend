import React from "react";
import Link from "next/link";
import { SparkleText } from "@/src/sharedcomponents/SparkleText";

const MobileHeroSection: React.FC = () => {
  return (
    <section className="text-white pt-30 pb-16 px-6 text-center">

      {/* Heading */}

      {/* <h1 className="text-[30px] font-semibold leading-tight mb-6">
        <span className="block">
          We Don’t Just{" "}
          <SparkleText
            text="cones"
            className="text-[#98BFF5]"
            sparkleColor="#98BFF5"
          />
        </span>

        <span className="block mt-2">
          We Make Your Big Brand
        </span>

        <span className="block">
          <SparkleText
            text="Possible"
            className="text-[#98BFF5]"
            sparkleColor="#98BFF5"
          />
        </span>
      </h1> */}

      <h3 className="text-[28px] font-semibold leading-tight mb-6 text-center">
        {/* Short top line with sparkle */}
        <span className="block">
          More Than Just{" "}
          <SparkleText
            text="cones"
            className="text-[#98BFF5]"
            sparkleColor="#98BFF5"
          />
        </span>

        {/* Long middle line, visually largest */}
        <span className="block mt-2 text-[37px] font-semibold">
          We Build Your Brands
        </span>

        {/* Short bottom line with sparkle */}
        <span className="block mt-2">
          <SparkleText
            text="Possible"
            className="text-[#98BFF5]"
            sparkleColor="#98BFF5"
          />
        </span>
      </h3>

      {/* Subheading */}
      <p className="text-[15px] sm:text-base text-gray-300 mb-10 max-w-sm mx-auto leading-relaxed">
        <span className="block">
          Exceptional quality built for growing brands
        </span>
        <span className="block">
          with endless customization at scale.
        </span>
      </p>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-3">
        <Link
          href="/custom-order"
          className="
            w-[75%]
            max-w-[260px]
            py-2
            text-sm font-medium
            bg-[#132135] text-white
            rounded-full
            border border-blue-400/70
            shadow-[0_0_10px_rgba(59,130,246,0.5)]
            transition hover:bg-blue-700
            text-center
          "
        >
          Start Custom Order
        </Link>

        <Link
          href="/get-quote"
          className="
            w-[75%]
            max-w-[260px]
            py-2
            text-sm font-medium
            rounded-full
            border border-gray-500/70
            text-gray-200
            transition hover:bg-gray-800
            text-center
          "
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
};

export default MobileHeroSection;
