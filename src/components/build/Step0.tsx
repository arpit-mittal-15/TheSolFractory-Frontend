import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "./Header";

interface Step0Props {
  step: number;
  nextStep: () => void;
}

const Step0: React.FC<Step0Props> = ({ step, nextStep }) => {
  return (
    <section className="px-[10%] py-[20%] sm:py-3 space-y-[3%] mt-[4%]">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1
          className="text-2xl sm:text-3xl font-semibold text-white"
          style={{ textShadow: "0 0 1px rgba(255,255,255,0.6)" }}
        >
          Create your cone exactly the way you{" "}
          <span className="text-blue-400">want it.</span>
        </h1>

        <p className="mx-auto max-w-md sm:max-w-lg text-sm sm:text-[15px] text-gray-300 leading-relaxed">
          Dive into a world of endless possibilities. Select the perfect paper
          for your custom cones and begin crafting your unique smoking
          experience.
        </p>
      </div>

      <Header step={step} />
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {[
          { src: "/build/0-1.png", label: "Select your cone paper" },
          { src: "/build/0-2.png", label: "Select your filter / tip" },
          { src: "/build/0-3.png", label: "Select your cone size" },
          { src: "/build/0-4.png", label: "Select your paper quantity" },
        ].map((card) => (
          <div
            key={card.src}
            className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl flex flex-col overflow-hidden shadow-[0_0_18px_rgba(59,130,246,0.15)]"
          >
            <div className="relative w-full h-28">
              <Image
                src={card.src}
                alt={card.label}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 240px"
                priority
              />
            </div>

            <div className="flex flex-col items-center text-center px-4 py-4 space-y-2">
              {/* Card heading */}
              <p className="text-sm font-semibold text-gray-100 max-w-[90%]">
                {card.label}
              </p>

              {/* Card description */}
              <p className="text-xs text-gray-400 max-w-[70%]">
                Personalized previews to guide each step.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-[5%]">
        <Button
          onClick={nextStep}
          className="btn-liquid w-full max-w-xs sm:max-w-sm px-8 py-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white rounded-full border border-blue-500 bg-blue-600/80 hover:bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.7)]"
        >
          START TO BUILD YOUR CONE
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default Step0;
