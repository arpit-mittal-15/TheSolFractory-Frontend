import React from "react";
import { Button } from "@/components/ui/button";
import { IconTrafficCone } from "@tabler/icons-react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Header from "./Header";
import ConeViewer from "./ConeViewer";
import { CONE_SIZES, type CustomizationState } from "./types";

interface Step3Props {
  step: number;
  state: CustomizationState;
  updateState: (updates: Partial<CustomizationState>) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const Step3: React.FC<Step3Props> = ({
  step,
  state,
  updateState,
  prevStep,
  nextStep,
}) => {
  return (
    <div className="space-y-8">

      {/* Step indicator */}
      <Header step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-7 items-start">
        {/* Visual Preview - 3D Cone */}
        <div className="space-y-4">
          <ConeViewer state={state} focusStep="size" />
          <p className="text-xs md:text-sm text-gray-400 text-center max-w-md mx-auto">
            Sizes change the length and proportions of your cone. Rotate to see how each
            size feels with your current paper and filter choices.
          </p>
        </div>

        {/* Size Options */}
        <div className="grid grid-cols-2 gap-5 w-xl lg:ml-auto">
          {CONE_SIZES.map((size) => {
            const isSelected = state.coneSize === size.id;
            return (
              <button
                key={size.id}
                onClick={() => updateState({ coneSize: size.id })}
                className={`relative rounded-lg p-5 border transition-all text-left bg-black/40 backdrop-blur-xl glass-panel ${
                  isSelected
                    ? "active border-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.45)]"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 tick-3d flex items-center justify-center">
                    <Check className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                  </div>
                )}
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-2xl font-bold text-white">
                    <IconTrafficCone size={56} stroke={1.3} />
                  </div>
                  <div className="text-white font-semibold text-base">
                    {size.name}
                  </div>
                  <div className="text-gray-400 text-xs text-center leading-snug">
                    {size.description}
                  </div>
                </div>
              </button>
            );
          })}
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              className="btn-liquid px-6 ml-3 py-5 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white border-gray-700"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              BACK
            </Button>
            <Button
              onClick={nextStep}
              disabled={!state.coneSize}
              className="btn-liquid active ml-87 px-6 py-5 text-sm font-bold uppercase tracking-widest text-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              NEXT
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Step3;


