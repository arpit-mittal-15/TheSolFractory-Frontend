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
    <div className="space-y-1 pt-8 pb-5">
      {/* Hero heading */}
      <div className="text-center">
        <h1
          className="text-3xl md:text-3xl font-semibold text-white mb-3 md:mb-3"
          style={{ textShadow: "0 0 1px rgba(255,255,255,0.6)" }}
        >
          Create your cone exactly the way you{" "}
          <span className="text-blue-400">want it.</span>
        </h1>
        <p className="text-gray-300 text-center mb-0 md:mb-0 max-w-[600px] mx-auto md:text-[15px] leading-relaxed">
          Dive into a world of endless possibilities. Select the perfect paper
          for your custom cones and begin crafting your unique smoking
          experience.
        </p>
      </div>

      {/* Step indicator row */}
      <Header step={step} mb={7} mt={6} />

      {/* Four step preview cards with supplied images */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-4 items-stretch">
        {[
          { src: "/build/0-1.png", label: "Select your cone paper" },
          { src: "/build/0-2.png", label: "Select your filter / tip" },
          { src: "/build/0-3.png", label: "Select your cone size" },
          { src: "/build/0-4.png", label: "Select your cone paper quantity" },
        ].map((card) => (
          <div
            key={card.src}
            className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl h-[80px] min-h-[210px] flex flex-col overflow-hidden shadow-[0_0_18px_rgba(59,130,246,0.15)]"
          >
            <div className="relative w-full h-28">
              <Image
                src={card.src}
                alt={card.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 220px"
                priority
              />
            </div>
            <p className="text-xs md:text-sm font-semibold text-gray-100 text-center px-4 pt-3 pb-2">
              {card.label}
            </p>
            <p className="text-[10px] md:text-xs text-gray-400 text-center px-4 pb-4">
              Personalized previews to guide each step.
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={nextStep}
          className="btn-liquid w-72 active px-10 py-5 text-xs md:text-[10px] font-bold uppercase tracking-[0.25em] text-white rounded-full border border-blue-500 bg-blue-600/80 hover:bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.7)]"
        >
          START TO BUILD YOUR CONE
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Step0;


