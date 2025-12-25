import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Palette } from "lucide-react";
import Header from "./Header";
import ConeViewer from "./ConeViewer";
import StepIndicator from "./StepIndicator";
import {
  LOT_SIZES,
  type CustomizationState,
  getLotSizeName,
  getQuantity,
} from "./types";

interface Step4Props {
  step: number;
  state: CustomizationState;
  updateState: (updates: Partial<CustomizationState>) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const Step4: React.FC<Step4Props> = ({
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
      <div className="mt-11 mb-10 flex justify-center items-center">
        <div className="flex flex-col items-start bg-blue-900/40 border-2 border-blue-400 rounded-4xl px-6 py-3 max-w-md w-[90%] shadow-2xl">
          <div className="flex items-center space-x-2 mb-1">
            <Palette className="text-white w-4.5 h-4.5" />
            <h3 className="text-white font-semibold text-lg">
              Select your Lot Size.
            </h3>
          </div>
          <p className="text-gray-300 text-[12px] w-full truncate whitespace-nowrap overflow-hidden">
            Choose ideal paper option for your perfect cone from the gallery below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-7 items-start">
        {/* Visual Preview - Full Cone */}
        <div className="space-y-4">
          <div className="relative">
            <StepIndicator currentStep={4} />
            <ConeViewer state={state} focusStep="lot" />
          </div>
        </div>

        {/* Lot Size Options & Your Selection */}
        <div className="grid grid-cols-2 gap-3 mt-2 w-xl lg:ml-auto">
          <div className="col-span-2  mb-0.5">
            <h4 className="text-sm text-gray-300 font-medium tracking-wide">
              Available Options
            </h4>
            <div className="h-px w-36 bg-gradient-to-r from-gray-400/40 to-transparent" />
          </div>
          {/* Lot Size Options */}
          {LOT_SIZES.map((lot) => {
            const isSelected = state.lotSize === lot.id;
            return (
              <button
                key={lot.id}
                onClick={() => updateState({ lotSize: lot.id })}
                className={`relative rounded-lg p-5 pl-10 border transition-all text-left bg-black/40 backdrop-blur-xl glass-panel ${
                  isSelected
                    ? "active border-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.45)]"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 tick-3d flex items-center justify-center">
                    <Check className="h-3 w-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-white font-semibold text-sm md:text-base">
                    {lot.name}
                  </h3>
                  <p className="text-gray-400 text-xs">{lot.quantity}</p>
                  <p className="text-gray-400 text-xs">{lot.leadTime}</p>
                  <p className="text-gray-300 text-xs font-medium">
                    {lot.price}
                  </p>
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

export default Step4;