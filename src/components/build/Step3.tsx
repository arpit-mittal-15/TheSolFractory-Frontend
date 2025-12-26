import React from "react";
import { Button } from "@/components/ui/button";
import { IconTrafficCone } from "@tabler/icons-react";
import { ArrowLeft, ArrowRight, Check, Palette } from "lucide-react";
import Header from "./Header";
import OpenConfigViewer from "./OpenConfigViewer";
import { CONE_SIZES, CONE_DIMENSIONS, type CustomizationState } from "./types";
import StepIndicator from "./StepIndicator";
import BottomPreview from "./BottomPreview";

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
      {/* <Header step={step} /> */}
      <div className="mt-11 mb-14 flex justify-center items-center">
        <div className="flex flex-col items-start bg-blue-900/40 border-2 border-blue-400 rounded-4xl px-6 py-3 max-w-md w-[90%] shadow-2xl">
          <div className="flex items-center space-x-2 mb-1">
            <Palette className="text-white w-4.5 h-4.5" />
            <h3 className="text-white font-semibold text-lg">
              Select your Cone Size.
            </h3>
          </div>
          <p className="text-gray-300 text-[12px] w-full truncate whitespace-nowrap overflow-hidden">
            Choose ideal paper option for your perfect cone from the gallery below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-7 items-start">
        {/* Visual Preview - Open paper + filter (not formed into a cone yet) */}
        <div className="space-y-4">
          <div className="relative">
            <StepIndicator currentStep={3} />
            <OpenConfigViewer state={state} />
            {/* Bottom Preview Squares inside canvas */}
            <div className="absolute bottom-4 left-1/6 transform -translate-x-1/2 flex gap-3 items-center z-10">
              <BottomPreview state={state} type="paper" />
              <BottomPreview state={state} type="filter" />
            </div>
          </div>
        </div>

        {/* Size Options */}
        <div className="grid grid-cols-2 gap-5 w-xl lg:ml-auto">
          <div className="col-span-2  mb-0.5">
            <h4 className="text-sm text-gray-300 font-medium tracking-wide">
              Available Options
            </h4>
            <div className="h-px w-36 bg-gradient-to-r from-gray-400/40 to-transparent" />
          </div>
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
                <div className="flex flex-col h-24 items-center space-y-2">
                  <div className="text-2xl font-bold text-white">
                    {/* <IconTrafficCone size={56} stroke={1.3} /> */}
                  </div>
                  <div className="text-white font-semibold text-base">
                    {size.name}
                  </div>
                  <div className="text-gray-400 text-xs text-center leading-snug">
                    {size.description}
                  </div>
                  {CONE_DIMENSIONS[size.id] && (
                    <div className="text-gray-500 text-[10px] text-center mt-1 space-y-0.5">
                      <div>Top: {CONE_DIMENSIONS[size.id].topDiameter}mm</div>
                      <div>Bottom: {CONE_DIMENSIONS[size.id].bottomDiameter}mm</div>
                      <div>Height: {CONE_DIMENSIONS[size.id].height}mm</div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
          {/* Navigation */}
          <div className="flex justify-between items-center mt-3">
            <Button
              variant="outline"
              onClick={prevStep}
              className="btn-glass-panel ml-3 cursor-pointer w-30 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={!state.paperType}
              className="btn-glass-panel ml-75 cursor-pointer w-30 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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


