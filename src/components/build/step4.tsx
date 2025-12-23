import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Header from "./Header";
import ConeViewer from "./ConeViewer";
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
      <Header step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-7 items-start">
        {/* Visual Preview - Full Cone */}
        <div className="space-y-4">
          <ConeViewer state={state} focusStep="lot" />
          <p className="text-xs md:text-sm text-gray-400 text-center max-w-md mx-auto">
            Full cone preview with your paper, filter, and size choices. Lot size won’t
            change visuals, but you can still inspect the final product before checkout.
          </p>
        </div>

        {/* Lot Size Options & Your Selection */}
        <div className="grid grid-cols-2 gap-3 mt-2 w-xl lg:ml-auto">
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
              disabled={!state.lotSize}
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

export default Step4;


